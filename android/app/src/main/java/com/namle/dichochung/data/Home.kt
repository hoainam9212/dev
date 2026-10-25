package com.namle.dichochung.data

data class Member(val uid: String, val role: Role, val name: String, val fcmToken: String?) {
    companion object {
        /** Tên hiển thị tối đa 20 ký tự; mặc định là tên vai ("Vợ"/"Chồng"). */
        const val MAX_NAME = 20
    }
}

/** Một nhà có tối đa 2 thành viên, mỗi vai một người. */
data class Home(val id: String, val members: List<Member>) {
    fun me(uid: String): Member? = members.firstOrNull { it.uid == uid }

    fun partner(uid: String): Member? = members.firstOrNull { it.uid != uid }

    fun holderOf(role: Role): Member? = members.firstOrNull { it.role == role }

    val isPaired: Boolean get() = members.size >= 2
}

/** Mã mời đang hiện trên máy người mời; [role] là vai của người được mời. */
data class Invite(val code: String, val role: Role, val expiresAt: Long)
