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
    private var invited: Boolean? = null

    private fun show(home: Home, invite: Invite?, now: Long = 0) {
        compose.setContent {
            DiChoTheme {
                HomeScreen(
                    home = home,
                    myUid = "a",
                    invite = invite,
                    now = now,
                    onInvite = { invited = it },
                    onCloseInvite = {},
                    onRename = {},
                )
            }
        }
    }

    @Test
    fun homeScreen_inviteShown_snapshot() {
        show(Home("h1", listOf(vo)), Invite("042917", Role.CHONG, expiresAt = InviteCode.TTL_MS - 1000), now = 0)
        compose.onNodeWithText("042917").assertIsDisplayed()
        compose.onNodeWithText("Hết hạn sau 14:59").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/home_invite.png")
    }

    @Test
    fun homeScreen_paired_snapshot() {
        show(Home("h1", listOf(vo, chong)), invite = null)
        compose.onNodeWithTag("reinvite_button").performClick()
        assertEquals(true, invited)
        compose.onRoot().captureRoboImage("src/test/snapshots/home_paired.png")
    }

    @Test
    fun homeScreen_missingMember_invitesWithoutReplace() {
        show(Home("h1", listOf(vo)), invite = null)
        compose.onNodeWithText("Mời Chồng").performClick()
        assertEquals(false, invited)
    }
}
