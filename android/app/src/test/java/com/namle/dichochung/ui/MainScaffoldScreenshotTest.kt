package com.namle.dichochung.ui

import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import com.github.takahirom.roborazzi.captureRoboImage
import com.namle.dichochung.ui.common.GreenHeader
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
@Config(sdk = [34], qualifiers = "w360dp-h780dp-xxhdpi")
class MainScaffoldScreenshotTest {

    @get:Rule
    val compose = createComposeRule()

    private fun setScaffold(selected: Tab, badge: Int, onSelect: (Tab) -> Unit = {}) {
        compose.setContent {
            DiChoTheme {
                MainScaffold(selected = selected, onSelect = onSelect, listBadge = badge) { padding ->
                    Box(Modifier.fillMaxSize().padding(padding)) {
                        GreenHeader(
                            caption = "Đi Chợ Chung · Thứ Bảy",
                            title = "Hôm nay mua gì?",
                            roleLabel = "Vợ",
                            roleEmoji = "👩",
                        ) {
                            Text("Nội dung tab")
                        }
                    }
                }
            }
        }
    }

    @Test
    fun mainScaffold_pickSelected_snapshot() {
        setScaffold(Tab.PICK, badge = 0)
        compose.onRoot().captureRoboImage("src/test/snapshots/scaffold_pick.png")
    }

    @Test
    fun mainScaffold_listBadge_snapshot() {
        setScaffold(Tab.LIST, badge = 3)
        compose.onRoot().captureRoboImage("src/test/snapshots/scaffold_list_badge.png")
    }

    @Test
    fun mainScaffold_tabClick_callsOnSelect() {
        var picked: Tab? = null
        setScaffold(Tab.PICK, badge = 0) { picked = it }
        compose.onNodeWithTag("tab_home").performClick()
        assertEquals(Tab.HOME, picked)
    }
}
