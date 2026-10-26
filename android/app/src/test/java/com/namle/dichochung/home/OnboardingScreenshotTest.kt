package com.namle.dichochung.home

import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performScrollTo
import androidx.compose.ui.test.performTextInput
import com.github.takahirom.roborazzi.captureRoboImage
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
@Config(sdk = [34], qualifiers = "w360dp-h900dp-xxhdpi")
class OnboardingScreenshotTest {

    @get:Rule
    val compose = createComposeRule()

    private var created: Role? = null
    private var joined: Pair<String, Role>? = null

    private fun show(error: String? = null) {
        compose.setContent {
            DiChoTheme {
                OnboardingScreen(
                    busy = false,
                    error = error,
                    onCreate = { created = it },
                    onJoin = { code, role -> joined = code to role },
                    onScan = {},
                )
            }
        }
    }

    @Test
    fun onboarding_snapshot() {
        show()
        compose.onRoot().captureRoboImage("src/test/snapshots/onboarding.png")
    }

    @Test
    fun onboarding_error_snapshot() {
        show(error = "Mã đã hết hạn, nhờ người kia tạo mã mới")
        compose.onNodeWithTag("role_con").performClick()
        compose.onNodeWithTag("join_code_field").performTextInput("123456")
        compose.onRoot().captureRoboImage("src/test/snapshots/onboarding_error.png")
    }

    @Test
    fun onboarding_noRole_buttonsDisabled() {
        show()
        compose.onNodeWithTag("create_button").assertIsNotEnabled()
        compose.onNodeWithTag("join_code_field").performTextInput("123456")
        compose.onNodeWithTag("join_button").assertIsNotEnabled()
    }

    @Test
    fun onboarding_buttons_callBack() {
        show()
        compose.onNodeWithTag("role_chong").performClick()
        compose.onNodeWithTag("create_button").performClick()
        assertEquals(Role.CHONG, created)
        compose.onNodeWithTag("role_con").performClick()
        compose.onNodeWithTag("join_code_field").performScrollTo().performTextInput("12a3 4567")
        compose.onNodeWithTag("join_button").performScrollTo().performClick()
        assertEquals("123456" to Role.CON, joined)
    }
}
