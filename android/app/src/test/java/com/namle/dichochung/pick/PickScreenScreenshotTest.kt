package com.namle.dichochung.pick

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import com.github.takahirom.roborazzi.captureRoboImage
import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
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
class PickScreenScreenshotTest {

    @get:Rule
    val compose = createComposeRule()

    private val items = listOf(
        Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả", defaultQty = 10, emoji = "🥚", imageAsset = "catalog/icons/trung_ga.webp"),
        Item("sua_tuoi", "Sữa tươi", category = Category.TRUNG_SUA, unit = "hộp", emoji = "🥛", imageAsset = "catalog/icons/sua_tuoi.webp"),
        Item("ca_hoi", "Cá hồi", category = Category.THIT_CA, unit = "g", defaultQty = 300, step = 100, emoji = "🐟", imageAsset = "catalog/icons/ca_hoi.webp"),
        Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "g", defaultQty = 300, step = 100, emoji = "🥩", imageAsset = "catalog/icons/thit_bo.webp"),
        Item("ca_chua", "Cà chua", category = Category.RAU_CU, unit = "quả", defaultQty = 3, emoji = "🍅", imageAsset = "catalog/icons/ca_chua.webp"),
        Item("rau_muong", "Rau muống", category = Category.RAU_CU, unit = "bó", emoji = "🥬", imageAsset = "catalog/icons/rau_muong.webp"),
    )
    private val selected = linkedMapOf("trung_ga" to 10, "sua_tuoi" to 2, "thit_bo" to 300, "rau_muong" to 1)
    private val calls = mutableListOf<String>()

    private fun show(selection: Map<String, Int>, sendLabel: String = "Gửi cho Chồng 🚀") {
        compose.setContent {
            DiChoTheme {
                PickScreen(
                    state = PickUiState(query = "", category = null, items = items, selection = selection),
                    caption = "Đi Chợ Chung · Thứ Bảy",
                    sendLabel = sendLabel,
                    roleLabel = "Vợ",
                    roleEmoji = "👩",
                    onQuery = {},
                    onCategory = {},
                    onTap = { calls += "tap:$it" },
                    onPlus = { calls += "plus:$it" },
                    onMinus = { calls += "minus:$it" },
                    onSend = { calls += "send" },
                )
            }
        }
    }

    @Test
    fun pickScreen_snapshot() {
        show(selected)
        compose.onNodeWithText("Gửi cho Chồng 🚀").assertIsDisplayed()
        compose.onNodeWithText("4 món").assertIsDisplayed()
        compose.onNodeWithText("300 g").assertIsDisplayed()
        compose.onNodeWithText("theo gam").assertIsDisplayed()
        compose.onNodeWithTag("chip_gia_vi").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/pick.png")
    }

    @Test
    fun pickScreen_noSelection_hidesSendBar_snapshot() {
        show(emptyMap())
        compose.onNodeWithTag("send_button").assertDoesNotExist()
        compose.onRoot().captureRoboImage("src/test/snapshots/pick_empty.png")
    }

    @Test
    fun pickScreen_callbacks() {
        show(selected)
        compose.onNodeWithTag("item_card_ca_hoi").performClick()
        compose.onNodeWithTag("stepper_plus_thit_bo").performClick()
        compose.onNodeWithTag("stepper_minus_rau_muong").performClick()
        compose.onNodeWithTag("send_button").performClick()
        assertEquals(listOf("tap:ca_hoi", "plus:thit_bo", "minus:rau_muong", "send"), calls)
    }

    @Test
    fun pickScreen_family_snapshot() {
        show(selected, sendLabel = "Gửi cho cả nhà 🚀")
        compose.onNodeWithText("Gửi cho cả nhà 🚀").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/pick_family.png")
    }
}
