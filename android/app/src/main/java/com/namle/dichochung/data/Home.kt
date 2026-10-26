package com.namle.dichochung.data

data class Member(val uid: String, val role: Role, val name: String, val fcmToken: String?) {
    companion object {
        /** Tên hiển thị tối đa 20 ký tự; mặc định là [Role.defaultName]. */
        const val MAX_NAME = 20
    }
}

/** Một nhà là cả gia đình, tối đa [MAX_MEMBERS] người (luật Firestore kiểm lại khi có người vào). */
data class Home(val id: String, val members: List<Member>) {
    fun me(uid: String): Member? = members.firstOrNull { it.uid == uid }

    fun others(uid: String): List<Member> = members.filter { it.uid != uid }

    val isFull: Boolean get() = members.size >= MAX_MEMBERS

    companion object {
        const val MAX_MEMBERS = 6
    }
}

/** Mã mời đang hiện trên máy người mời; [replacing] khác null = mời lại người đó khi họ đổi máy. */
data class Invite(val code: String, val expiresAt: Long, val replacing: Member? = null)
