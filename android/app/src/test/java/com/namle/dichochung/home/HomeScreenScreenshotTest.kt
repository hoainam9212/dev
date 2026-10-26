package com.namle.dichochung.home

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import com.github.takahirom.roborazzi.captureRoboImage
import com.namle.dichochung.data.Home
import com.namle.dichochung.data.Invite
import com.namle.dichochung.data.Member
import com.namle.dichochung.data.Role
import com.namle.dichochung.ui.theme.DiChoTheme
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config
import org.robolectric.annotation.GraphicsMode

@RunWith(RobolectricTestRunner::class)
@GraphicsMode(GraphicsMode.Mode.NATIVE)
@Config(sdk = [34], qualifiers = "w360dp-h1000dp-xxhdpi")
class HomeScreenScreenshotTest {

    @get:Rule
    val compose = createComposeRule()

    private val vo = Member("a", Role.VO, "Vợ", null)
    private val chong = Member("b", Role.CHONG, "Anh Bình", null)
    private val con = Member("c", Role.CON, "Bé Na", null)
    private var invited: Member? = null
    private var inviteCalls = 0

    private fun show(home: Home, invite: Invite?, now: Long = 0) {
        compose.setContent {
            DiChoTheme {
                HomeScreen(
                    home = home,
                    myUid = "a",
                    invite = invite,
                    now = now,
                    onInvite = { invited = it; inviteCalls++ },
                    onCloseInvite = {},
                    onRename = {},
                )
            }
        }
    }

    @Test
    fun homeScreen_inviteShown_snapshot() {
        show(Home("h1", listOf(vo)), Invite("042917", expiresAt = InviteCode.TTL_MS - 1000), now = 0)
        compose.onNodeWithText("042917").assertIsDisplayed()
        compose.onNodeWithText("Hết hạn sau 14:59").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/home_invite.png")
    }

    @Test
    fun homeScreen_family_snapshot() {
        show(Home("h1", listOf(vo, chong, con)), invite = null)
        compose.onNodeWithText("Thành viên (3/6)").assertIsDisplayed()
        compose.onNodeWithTag("reinvite_c").performClick()
        assertEquals(con, invited)
        compose.onRoot().captureRoboImage("src/test/snapshots/home_family.png")
    }

    @Test
    fun homeScreen_inviteMore_invitesWithoutReplace() {
        show(Home("h1", listOf(vo, chong)), invite = null)
        compose.onNodeWithText("Mời thêm người").performClick()
        assertEquals(1, inviteCalls)
        assertNull(invited)
    }

    @Test
    fun homeScreen_full_hidesInviteButton() {
        val six = listOf(vo, chong, con) + List(3) { Member("x$it", Role.CON, "Con $it", null) }
        show(Home("h1", six), invite = null)
        compose.onNodeWithTag("invite_button").assertDoesNotExist()
    }
}
