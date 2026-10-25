package com.namle.dichochung.home

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.namle.dichochung.data.Home
import com.namle.dichochung.data.HomeException
import com.namle.dichochung.data.HomeRepository
import com.namle.dichochung.data.Invite
import com.namle.dichochung.data.Role
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.collectLatest
import kotlinx.coroutines.flow.distinctUntilChanged
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

class HomeViewModel(
    private val repo: HomeRepository,
    private val clock: () -> Long = System::currentTimeMillis,
) : ViewModel() {

    data class UiState(
        val busy: Boolean = false,
        val error: String? = null,
        val invite: Invite? = null,
    )

    private val _ui = MutableStateFlow(UiState())
    val ui: StateFlow<UiState> = _ui.asStateFlow()

    val homeId: StateFlow<String?> = repo.homeId
    val home: StateFlow<Home?> = repo.home
    val myUid: String? get() = repo.uid

    private val _now = MutableStateFlow(clock())

    /** Đồng hồ cho đếm ngược mã mời; chỉ chạy từng giây khi đang hiện mã. */
    val now: StateFlow<Long> = _now.asStateFlow()

    /** uid các thành viên lúc tạo mã: đổi đi nghĩa là người kia đã vào bằng mã này → đóng bảng mời. */
    private var membersAtInvite: Set<String>? = null

    init {
        viewModelScope.launch { runCatching { repo.ensureSignedIn() } }
        viewModelScope.launch {
            _ui.map { it.invite != null }.distinctUntilChanged().collectLatest { showing ->
                while (showing) {
                    _now.value = clock()
                    delay(1_000)
                }
            }
        }
        viewModelScope.launch {
            home.collect { home ->
                val before = membersAtInvite ?: return@collect
                if (home != null && home.members.map { it.uid }.toSet() != before) {
                    membersAtInvite = null
                    _ui.update { it.copy(invite = null) }
                }
            }
        }
    }

    fun create(role: Role) = work { repo.createHome(role) }

    fun join(code: String) {
        val clean = InviteCode.clean(code)
        if (clean.length != InviteCode.LENGTH) {
            _ui.update { it.copy(error = "Mã không đúng") }
            return
        }
        work { repo.join(clean).getOrThrow() }
    }

    /** Mời người còn thiếu ([replace] = false) hoặc mời lại người kia khi đổi máy ([replace] = true). */
    fun invite(replace: Boolean) {
        val uid = myUid ?: return
        val home = home.value ?: return
        val role = home.me(uid)?.role?.other ?: return
        _ui.value.invite?.let { repo.cancelInvite(it.code) }
        work {
            val invite = repo.createInvite(role, replace)
            membersAtInvite = home.members.map { it.uid }.toSet()
            _ui.update { it.copy(invite = invite) }
        }
    }

    fun closeInvite() {
        _ui.value.invite?.let { repo.cancelInvite(it.code) }
        membersAtInvite = null
        _ui.update { it.copy(invite = null) }
    }

    fun rename(name: String) {
        viewModelScope.launch { repo.renameMe(name) }
    }

    fun showError(message: String) {
        _ui.update { it.copy(error = message) }
    }

    private fun work(block: suspend () -> Unit) {
        if (_ui.value.busy) return
        _ui.update { it.copy(busy = true, error = null) }
        viewModelScope.launch {
            val error = try {
                block()
                null
            } catch (e: CancellationException) {
                throw e
            } catch (e: HomeException) {
                e.message
            } catch (e: Exception) {
                NETWORK_ERROR
            }
            _ui.update { it.copy(busy = false, error = error) }
        }
    }

    companion object {
        private const val NETWORK_ERROR = "Không kết nối được, kiểm tra mạng rồi thử lại"

        fun factory(repo: HomeRepository) = viewModelFactory {
            initializer { HomeViewModel(repo) }
        }
    }
}
