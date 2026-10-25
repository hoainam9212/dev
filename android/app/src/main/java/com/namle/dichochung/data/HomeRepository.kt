package com.namle.dichochung.data

import android.content.Context
import com.google.firebase.Timestamp
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.google.firebase.firestore.FirebaseFirestoreException
import com.google.firebase.firestore.Source
import com.namle.dichochung.home.InviteCode
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.channels.awaitClose
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.callbackFlow
import kotlinx.coroutines.flow.emitAll
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.retryWhen
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.tasks.await
import java.util.Date

interface HomeRepository {
    val uid: String?

    /** Nhà máy này đang thuộc về (lưu trong SharedPreferences "home"), có ngay cả khi chưa tải được nhà. */
    val homeId: StateFlow<String?>
    val home: StateFlow<Home?>

    suspend fun ensureSignedIn(): String
    suspend fun createHome(role: Role): String

    /** [role] là vai của người được mời; [replace] = mời người thay máy cũ đang giữ vai đó. */
    suspend fun createInvite(role: Role, replace: Boolean): Invite

    /** Vai lấy từ invite. Lỗi mang thông điệp tiếng Việt để hiện thẳng cho người dùng. */
    suspend fun join(code: String): Result<Unit>

    /** Đổi tên hiển thị của chính mình (≤ 20 ký tự). */
    suspend fun renameMe(name: String)

    /** Huỷ mã mời chưa dùng (đóng bảng mời hoặc tạo mã khác). */
    fun cancelInvite(code: String)
}

/** Lỗi có thông điệp tiếng Việt, hiện thẳng cho người dùng. */
class HomeException(message: String) : Exception(message)

@OptIn(ExperimentalCoroutinesApi::class)
class FirestoreHomeRepository(
    context: Context,
    private val auth: FirebaseAuth,
    private val db: FirebaseFirestore,
    scope: CoroutineScope,
    private val clock: () -> Long = System::currentTimeMillis,
) : HomeRepository {

    private val prefs = context.getSharedPreferences("home", Context.MODE_PRIVATE)
    private val _homeId = MutableStateFlow(prefs.getString(KEY_HOME_ID, null))

    override val uid: String? get() = auth.currentUser?.uid
    override val homeId: StateFlow<String?> = _homeId.asStateFlow()

    override val home: StateFlow<Home?> = _homeId
        .flatMapLatest { id -> if (id == null) flowOf(null) else watchHome(id) }
        .stateIn(scope, SharingStarted.Eagerly, null)

    override suspend fun ensureSignedIn(): String =
        auth.currentUser?.uid ?: auth.signInAnonymously().await().user!!.uid

    override suspend fun createHome(role: Role): String {
        val me = ensureSignedIn()
        val ref = db.collection(HOMES).document()
        // Chỉ ghi nhà: luật invite dùng get() thấy trạng thái trước batch, nên không gộp invite vào đây.
        ref.set(
            mapOf(
                "members" to mapOf(me to memberData(role)),
                "createdAt" to FieldValue.serverTimestamp(),
            ),
        ).await()
        setHomeId(ref.id)
        return ref.id
    }

    override suspend fun createInvite(role: Role, replace: Boolean): Invite {
        val me = ensureSignedIn()
        val homeId = _homeId.value ?: throw HomeException("Chưa có nhà")
        // Người lạ không đọc được nhà, nên người mời ghi sẵn uid cần gỡ để máy mới xoá đúng members.<uid>.
        val replaceUid = if (replace) home.value?.holderOf(role)?.uid?.takeIf { it != me } else null
        repeat(MAX_CODE_TRIES) {
            val code = InviteCode.generate()
            val ref = db.collection(INVITES).document(code)
            if (ref.get(Source.SERVER).await().exists()) return@repeat
            val expiresAt = clock() + InviteCode.TTL_MS
            val data = buildMap<String, Any> {
                put("homeId", homeId)
                put("role", role.key)
                put("replace", replace)
                replaceUid?.let { put("replaceUid", it) }
                put("expiresAt", Timestamp(Date(expiresAt)))
                put("used", false)
                put("createdBy", me)
                put("createdAt", FieldValue.serverTimestamp())
            }
            ref.set(data).await()
            return Invite(code, role, expiresAt)
        }
        throw HomeException("Không tạo được mã mời, thử lại")
    }

    override suspend fun join(code: String): Result<Unit> = runCatching {
        val me = try {
            ensureSignedIn()
        } catch (e: Exception) {
            throw HomeException(NETWORK_ERROR)
        }
        val invite = try {
            db.collection(INVITES).document(code).get(Source.SERVER).await()
        } catch (e: FirebaseFirestoreException) {
            throw HomeException(if (e.code == FirebaseFirestoreException.Code.UNAVAILABLE) NETWORK_ERROR else WRONG_CODE)
        }
        val expiresAt = invite.getTimestamp("expiresAt")?.toDate()?.time ?: 0L
        InviteCode.joinError(invite.exists(), invite.getBoolean("used") == true, expiresAt, clock())
            ?.let { throw HomeException(it) }
        val homeId = invite.getString("homeId") ?: throw HomeException(WRONG_CODE)
        val role = Role.fromKey(invite.getString("role")) ?: throw HomeException(WRONG_CODE)

        // Một batch: thêm mình vào nhà + đốt mã (luật Task 03 kiểm cả hai cùng lúc).
        val homeUpdate = mutableMapOf<String, Any>(
            "members.$me" to memberData(role),
            "joinCode" to code,
        )
        val replaceUid = invite.getString("replaceUid")
        if (invite.getBoolean("replace") == true && replaceUid != null && replaceUid != me) {
            homeUpdate["members.$replaceUid"] = FieldValue.delete()
        }
        try {
            db.batch()
                .update(db.collection(HOMES).document(homeId), homeUpdate)
                .update(invite.reference, "used", true)
                .commit()
                .await()
        } catch (e: FirebaseFirestoreException) {
            throw HomeException(if (e.code == FirebaseFirestoreException.Code.UNAVAILABLE) NETWORK_ERROR else JOIN_DENIED)
        }
        setHomeId(homeId)
    }.recoverCatching { e ->
        throw if (e is HomeException) e else HomeException(NETWORK_ERROR)
    }

    override suspend fun renameMe(name: String) {
        val me = uid ?: return
        val id = _homeId.value ?: return
        val clean = name.trim().take(Member.MAX_NAME).ifEmpty { return }
        // Không chờ server: offline vẫn đổi ngay trong cache, có mạng thì tự đẩy lên.
        db.collection(HOMES).document(id).update("members.$me.name", clean)
    }

    override fun cancelInvite(code: String) {
        db.collection(INVITES).document(code).delete()
    }

    private fun watchHome(id: String): Flow<Home> = flow {
        ensureSignedIn()
        emitAll(
            callbackFlow<Home> {
                val registration = db.collection(HOMES).document(id).addSnapshotListener { snap, error ->
                    when {
                        // Bị gỡ khỏi nhà thì không còn quyền đọc nữa.
                        error?.code == FirebaseFirestoreException.Code.PERMISSION_DENIED -> leaveHome(id)
                        snap == null -> Unit
                        // Cache trống lúc offline không có nghĩa là nhà đã bị xoá.
                        snap.metadata.isFromCache && !snap.exists() -> Unit
                        else -> {
                            val home = parseHome(snap)
                            val me = uid
                            if (home == null || me == null || home.me(me) == null) leaveHome(id) else trySend(home)
                        }
                    }
                }
                awaitClose { registration.remove() }
            },
        )
    }.retryWhen { _, _ ->
        // Chưa đăng nhập được (mở app lần đầu lúc mất mạng): thử lại thay vì làm sập luồng.
        delay(RETRY_MS)
        true
    }

    private fun leaveHome(id: String) {
        if (_homeId.value == id) setHomeId(null)
    }

    private fun setHomeId(id: String?) {
        prefs.edit().putString(KEY_HOME_ID, id).apply()
        _homeId.value = id
    }

    private fun memberData(role: Role) = mapOf("role" to role.key, "name" to role.vi)

    companion object {
        private const val HOMES = "homes"
        private const val INVITES = "invites"
        private const val KEY_HOME_ID = "homeId"
        private const val MAX_CODE_TRIES = 5
        private const val RETRY_MS = 5_000L

        private const val NETWORK_ERROR = "Không kết nối được, kiểm tra mạng rồi thử lại"
        private const val WRONG_CODE = "Mã không đúng"
        private const val JOIN_DENIED = "Không vào được nhà này, nhờ người kia tạo mã mới"

        fun parseHome(snap: DocumentSnapshot): Home? {
            if (!snap.exists()) return null
            val raw = snap.get("members") as? Map<*, *> ?: return null
            val members = raw.mapNotNull { (key, value) ->
                val uid = key as? String ?: return@mapNotNull null
                val m = value as? Map<*, *> ?: return@mapNotNull null
                val role = Role.fromKey(m["role"] as? String) ?: return@mapNotNull null
                Member(uid, role, (m["name"] as? String)?.ifBlank { null } ?: role.vi, m["fcmToken"] as? String)
            }.sortedBy { it.role.ordinal }
            return Home(snap.id, members)
        }
    }
}
