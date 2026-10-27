package com.namle.dichochung.list

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextReplacement
import androidx.compose.ui.test.performTouchInput
import androidx.compose.ui.test.swipeLeft
import com.github.takahirom.roborazzi.captureRoboImage
import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.data.EntryState
import com.namle.dichochung.data.ListEntry
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
class ListScreenScreenshotTest {

    @get:Rule
    val compose = createComposeRule()

    private val items = listOf(
        Item("rau_muong", "Rau muống", category = Category.RAU_CU, unit = "bó", emoji = "🥬", imageAsset = "catalog/icons/rau_muong.webp"),
        Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "khay", emoji = "🥩", imageAsset = "catalog/icons/thit_bo.webp"),
        Item("sua_tuoi", "Sữa tươi", category = Category.TRUNG_SUA, unit = "hộp", emoji = "🥛", imageAsset = "catalog/icons/sua_tuoi.webp"),
        Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả", defaultQty = 10, emoji = "🥚", imageAsset = "catalog/icons/trung_ga.webp"),
    ).associateBy { it.id }

    // Như mẫu: 1 dòng đã nhặt, 1 dòng hết hàng ở AEON, 2 dòng cần mua (một dòng có ghi chú).
    private val entries = listOf(
        ListEntry("e1", "rau_muong", 1, "bó", note = "Lấy bó non", addedBy = "vo", addedAt = 1, updatedAt = 1),
        ListEntry("e2", "thit_bo", 1, "khay", addedBy = "vo", addedAt = 2, state = EntryState.OUT_OF_STOCK, outOfStockStore = "AEON", updatedAt = 2),
        ListEntry("e3", "sua_tuoi", 2, "hộp", addedBy = "vo", addedAt = 3, updatedAt = 3),
        ListEntry("e4", "trung_ga", 10, "quả", addedBy = "vo", addedAt = 4, state = EntryState.PICKED, pickedBy = "chong", updatedAt = 4),
    )
    private val calls = mutableListOf<String>()

    private fun show(list: List<ListEntry>) {
        val (picked, total) = ListSections.progress(list)
        compose.setContent {
            DiChoTheme {
                ListScreen(
                    state = ListUiState(ListSections.build(list, items), items, picked, total),
                    caption = "Vợ gửi lúc 17:46",
                    roleLabel = "Chồng",
                    roleEmoji = "👨",
                    onTick = { calls += "tick:$it" },
                    onSwipe = { calls += "swipe:$it" },
                    onEdit = { calls += "edit:$it" },
                    onFinish = { calls += "finish" },
                )
            }
        }
    }

    @Test
    fun listScreen_snapshot() {
        show(entries)
        compose.onNodeWithText("Cần mua").assertIsDisplayed()
        compose.onNodeWithText("1/4").assertIsDisplayed()
        compose.onNodeWithText("Đã nhặt 1 món").assertIsDisplayed()
        compose.onNodeWithText("Lấy bó non").assertIsDisplayed()
        compose.onNodeWithText("Hết ở AEON").assertIsDisplayed()
        compose.onNodeWithText("10 quả").assertIsDisplayed()
        compose.onNodeWithTag("finish_button").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/list.png")
    }

    @Test
    fun listScreen_empty_snapshot() {
        show(emptyList())
        compose.onNodeWithText("Chưa có gì cần mua").assertIsDisplayed()
        compose.onNodeWithTag("finish_button").assertDoesNotExist()
        compose.onRoot().captureRoboImage("src/test/snapshots/list_empty.png")
    }

    @Test
    fun listScreen_noPicked_hidesFinish() {
        show(entries.filter { it.state != EntryState.PICKED })
        compose.onNodeWithTag("finish_button").assertDoesNotExist()
    }

    @Test
    fun listScreen_callbacks() {
        show(entries)
        compose.onNodeWithTag("tick_e3").performClick()
        compose.onNodeWithTag("tick_e4").performClick()
        compose.onNodeWithTag("entry_name_e1").performClick()
        compose.onNodeWithTag("entry_e3").performTouchInput { swipeLeft() }
        compose.onNodeWithTag("finish_button").performClick()
        assertEquals(listOf("tick:e3", "tick:e4", "edit:e1", "swipe:e3", "finish"), calls)
    }

    @Test
    fun entryEdit_snapshot_andSave() {
        var saved: Pair<Int, String>? = null
        compose.setContent {
            DiChoTheme {
                EntryEditContent(item = items.getValue("rau_muong"), entry = entries[0], onSave = { q, n -> saved = q to n })
            }
        }
        compose.onNodeWithText("Rau muống").assertIsDisplayed()
        compose.onNodeWithTag("edit_plus").performClick()
        compose.onNodeWithTag("edit_note").performTextReplacement("lấy bó to")
        compose.onRoot().captureRoboImage("src/test/snapshots/list_edit.png")
        compose.onNodeWithTag("edit_save").performClick()
        assertEquals(2 to "lấy bó to", saved)
    }
}
