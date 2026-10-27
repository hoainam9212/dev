package com.namle.dichochung.home

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import androidx.compose.ui.unit.dp
import com.github.takahirom.roborazzi.captureRoboImage
import com.namle.dichochung.ui.theme.AppColors
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
class PermissionsCardScreenshotTest {

    @get:Rule
    val compose = createComposeRule()

    private val calls = mutableListOf<String>()

    private fun show(state: PermissionsState) {
        compose.setContent {
            DiChoTheme {
                Box(Modifier.fillMaxSize().background(AppColors.Background).padding(14.dp)) {
                    PermissionsCard(
                        state = state,
                        onNotifications = { calls += "notifications" },
                        onLocation = { calls += "location" },
                        onBackgroundLocation = { calls += "background" },
                        onBattery = { calls += "battery" },
                    )
                }
            }
        }
    }

    @Test
    fun permissionsCard_snapshot() {
        // 2 ✅ (thông báo, vị trí khi dùng app), 2 ⚠️ (vị trí luôn cho phép, pin Samsung).
        show(PermissionsState(notifications = true, location = true, backgroundLocation = false, battery = false))
        compose.onNodeWithText("Quyền & pin").assertIsDisplayed()
        compose.onNodeWithText("Vị trí \"Luôn cho phép\"").assertIsDisplayed()
        compose.onNodeWithText("Ứng dụng không bao giờ ngủ", substring = true).assertIsDisplayed()
        compose.onNodeWithTag("perm_ok_notifications").assertIsDisplayed()
        compose.onNodeWithTag("perm_ok_location").assertIsDisplayed()
        compose.onNodeWithTag("perm_fix_background").assertIsDisplayed()
        compose.onNodeWithTag("perm_fix_battery").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/permissions.png")
    }

    @Test
    fun permissionsCard_buttonsOnlyForMissing() {
        show(PermissionsState(notifications = false, location = false, backgroundLocation = false, battery = true))
        compose.onNodeWithTag("perm_fix_notifications").performClick()
        compose.onNodeWithTag("perm_fix_location").performClick()
        compose.onNodeWithTag("perm_fix_background").performClick()
        compose.onNodeWithTag("perm_fix_battery").assertDoesNotExist()
        assertEquals(listOf("notifications", "location", "background"), calls)
    }

    @Test
    fun permissionsCard_allGood_showsSummary() {
        show(PermissionsState(notifications = true, location = true, backgroundLocation = true, battery = true))
        compose.onNodeWithText("Đã sẵn sàng báo khi tới siêu thị.", substring = true).assertIsDisplayed()
    }
}
