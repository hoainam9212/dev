package com.namle.dichochung.pick

import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.longClick
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextReplacement
import androidx.compose.ui.test.performTouchInput
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
class AddItemScreenshotTest {

    @get:Rule
    val compose = createComposeRule()

    private val catalog = listOf(
        Item("trung_ga", "Trứng gà", category = Category.TRUNG_SUA, unit = "quả", defaultQty = 10, emoji = "🥚", imageAsset = "catalog/icons/trung_ga.webp"),
        Item("khoai_lang", "Khoai lang", category = Category.RAU_CU, unit = "củ", emoji = "🍠", imageAsset = "catalog/icons/khoai_lang.webp"),
        Item("thit_bo", "Thịt bò", category = Category.THIT_CA, unit = "khay", emoji = "🥩", imageAsset = "catalog/icons/thit_bo.webp"),
    )
    private val calls = mutableListOf<String>()
    private var draft: ItemDraft? = null

    private fun showForm(start: ItemDraft, isNew: Boolean) {
        compose.setContent {
            DiChoTheme {
                ItemSheetContent(
                    draft = start,
                    photo = null,
                    isNew = isNew,
                    saving = false,
                    onDraft = { draft = it; calls += "draft:${it.name}|${it.category.key}|${it.unit}" },
                    onCamera = { calls += "camera" },
                    onGallery = { calls += "gallery" },
                    onSave = { calls += "save" },
                    onDelete = { calls += "delete" },
                )
            }
        }
    }

    @Test
    fun addItemSheet_snapshot() {
        val start = ItemDraft.forNew("khoai mỡ", catalog)
        assertEquals(Category.RAU_CU, start.category)
        showForm(start, isNew = true)
        compose.onNodeWithText("Thêm món mới").assertIsDisplayed()
        compose.onNodeWithTag("photo_camera").assertIsDisplayed()
        compose.onNodeWithTag("photo_gallery").assertIsDisplayed()
        compose.onNodeWithTag("form_cat_rau_cu").assertIsDisplayed()
        compose.onNodeWithTag("item_save").assertIsDisplayed()
        compose.onNodeWithTag("delete_item").assertDoesNotExist()
        compose.onRoot().captureRoboImage("src/test/snapshots/add_item.png")
    }

    @Test
    fun addItemSheet_callbacks() {
        showForm(ItemDraft.forNew("khoai mỡ", catalog), isNew = true)
        compose.onNodeWithTag("photo_camera").performClick()
        compose.onNodeWithTag("photo_gallery").performClick()
        compose.onNodeWithTag("form_cat_gia_vi").performClick()
        compose.onNodeWithTag("item_save").performClick()
        assertEquals(listOf("camera", "gallery", "draft:Khoai mỡ|gia_vi|gói", "save"), calls)
    }

    @Test
    fun addItemSheet_blankName_disablesSave() {
        showForm(ItemDraft.forNew("khoai mỡ", catalog).copy(name = ""), isNew = true)
        compose.onNodeWithTag("item_save").assertIsNotEnabled()
    }

    @Test
    fun addItemSheet_typingName_updatesDraft() {
        showForm(ItemDraft.forNew("khoai mỡ", catalog), isNew = true)
        compose.onNodeWithTag("item_name_field").performTextReplacement("Khoai mỡ tím")
        assertEquals("Khoai mỡ tím", draft?.name)
    }

    @Test
    fun editItemSheet_snapshot_andDeleteAsksFirst() {
        showForm(ItemDraft.forEdit(catalog[2]), isNew = false)
        compose.onNodeWithText("Sửa món").assertIsDisplayed()
        compose.onNodeWithTag("delete_item").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/edit_item.png")

        compose.onNodeWithTag("delete_item").performClick()
        assertEquals(emptyList<String>(), calls)
        compose.onNodeWithText("Xoá \"Thịt bò\"?").assertIsDisplayed()
        compose.onNodeWithTag("delete_confirm").performClick()
        assertEquals(listOf("delete"), calls)
    }

    @Test
    fun duplicateDialog_offersExistingItem() {
        compose.setContent {
            DiChoTheme {
                DuplicateDialog(
                    existing = catalog[0],
                    onUseExisting = { calls += "use" },
                    onAddAnyway = { calls += "add" },
                )
            }
        }
        compose.onNodeWithText("Đã có Trứng gà rồi, dùng món này nhé?").assertIsDisplayed()
        compose.onNodeWithText("Dùng món có sẵn").performClick()
        compose.onNodeWithText("Vẫn thêm mới").performClick()
        assertEquals(listOf("use", "add"), calls)
    }

    private fun showSearch(query: String) {
        val results = PickViewModel.results(catalog, query, category = null)
        compose.setContent {
            DiChoTheme {
                PickScreen(
                    state = PickUiState(query = query, items = results.matches, suggestions = results.suggestions),
                    caption = "Đi Chợ Chung · Thứ Bảy",
                    sendLabel = "Gửi cho Chồng 🚀",
                    roleLabel = "Vợ",
                    roleEmoji = "👩",
                    onQuery = {},
                    onCategory = {},
                    onTap = { calls += "tap:$it" },
                    onPlus = {},
                    onMinus = {},
                    onSend = {},
                    onAdd = { calls += "add:$it" },
                    onEdit = { calls += "edit:$it" },
                )
            }
        }
    }

    @Test
    fun searchResults_withSuggestion_snapshot() {
        // "chứng gà" không khớp hẳn món nào (bỏ dấu: "chung ga"), cách "trứng gà" 1 ký tự → gợi ý.
        showSearch("chứng gà")
        compose.onNodeWithText("Có phải bạn tìm:").assertIsDisplayed()
        compose.onNodeWithTag("item_card_trung_ga").assertIsDisplayed()
        compose.onNodeWithText("+ Thêm \"chứng gà\"").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/search_suggest.png")

        compose.onNodeWithTag("add_item_row").performClick()
        assertEquals(listOf("add:chứng gà"), calls)
    }

    @Test
    fun searchResults_matchesOnly_noSuggestHeader_addRowLast() {
        showSearch("khoai")
        compose.onNodeWithTag("item_card_khoai_lang").assertIsDisplayed()
        compose.onNodeWithText("Có phải bạn tìm:").assertDoesNotExist()
        compose.onNodeWithTag("add_item_row").assertIsDisplayed()
    }

    @Test
    fun searchResults_nothing_stillOffersAdd() {
        showSearch("pin AA")
        compose.onNodeWithText("+ Thêm \"pin AA\"").assertIsDisplayed()
    }

    @Test
    fun longPressCard_opensEdit() {
        showSearch("khoai")
        compose.onNodeWithTag("item_card_khoai_lang").performTouchInput { longClick() }
        assertEquals(listOf("edit:khoai_lang"), calls)
    }
}
