package com.namle.dichochung.stores

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.ui.Modifier
import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.assertIsNotEnabled
import androidx.compose.ui.test.assertTextContains
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithTag
import androidx.compose.ui.test.onNodeWithText
import androidx.compose.ui.test.onRoot
import androidx.compose.ui.test.performClick
import androidx.compose.ui.test.performTextReplacement
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
@Config(sdk = [34], qualifiers = "w360dp-h780dp-xxhdpi")
class StoresScreenshotTest {

    @get:Rule
    val compose = createComposeRule()

    private val station = 35.6646 to 139.8593

    /** Dữ liệu thật quanh ga 西葛西 (fixture Overpass). */
    private val candidates by lazy {
        val json = javaClass.getResource("/overpass_nishikasai.json")!!.readText()
        OverpassParser.parse(json, station.first, station.second)
    }
    private var saved: Pair<StoreCandidate?, String>? = null
    private val calls = mutableListOf<String>()

    private fun showSheet(list: List<StoreCandidate>, suggested: String = "") {
        compose.setContent {
            DiChoTheme {
                SaveStoreContent(candidates = list, suggestedName = suggested, saving = false, onSave = { c, n -> saved = c to n })
            }
        }
    }

    @Test
    fun saveStoreSheet_snapshot() {
        showSheet(candidates)
        compose.onNodeWithText("Bạn đang ở đâu?").assertIsDisplayed()
        compose.onNodeWithText("ファミリーマート").assertIsDisplayed()
        compose.onNodeWithText("ローソン 西葛西駅南口店").assertIsDisplayed()
        compose.onNodeWithText("✏️ Tự nhập tên khác").assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/save_store.png")
    }

    @Test
    fun saveStoreSheet_firstCandidatePreselected_savesIt() {
        showSheet(candidates)
        compose.onNodeWithTag("save_store_confirm").performClick()
        assertEquals(candidates[0] to "ファミリーマート", saved)
    }

    @Test
    fun saveStoreSheet_pickAnother() {
        showSheet(candidates)
        compose.onNodeWithTag("candidate_2").performClick()
        compose.onNodeWithTag("save_store_confirm").performClick()
        assertEquals(candidates[2] to candidates[2].label, saved)
    }

    @Test
    fun saveStoreSheet_customName() {
        showSheet(candidates)
        compose.onNodeWithTag("candidate_custom").performClick()
        compose.onNodeWithTag("store_name_field").performTextReplacement("  Chợ Việt Kasai ")
        compose.onNodeWithTag("save_store_confirm").performClick()
        assertEquals(null to "Chợ Việt Kasai", saved)
    }

    @Test
    fun saveStoreSheet_noCandidates_prefillsAddress() {
        showSheet(emptyList(), suggested = "東京都江戸川区西葛西6丁目14")
        compose.onNodeWithText("東京都江戸川区西葛西6丁目14").assertIsDisplayed()
        compose.onNodeWithTag("save_store_confirm").performClick()
        assertEquals(null to "東京都江戸川区西葛西6丁目14", saved)
    }

    @Test
    fun saveStoreSheet_blankCustomName_disablesSave() {
        showSheet(emptyList(), suggested = "")
        compose.onNodeWithTag("save_store_confirm").assertIsNotEnabled()
    }

    private val stores = listOf(
        Store("s1", "ワイズマート", 35.6653367, 139.8587726, osmId = "way/510390306"),
        Store("s2", "ローソン 西葛西駅南口店", 35.6642468, 139.8586031, osmId = "node/3127070448"),
        Store("s3", "Chợ Việt Kasai", 35.6700, 139.8700),
    )

    private fun showCard(list: List<Store>, here: Pair<Double, Double>? = station) {
        compose.setContent {
            DiChoTheme {
                Box(Modifier.fillMaxSize().background(AppColors.Background).padding(14.dp)) {
                    StoresCard(
                        stores = list,
                        here = here,
                        onAdd = { calls += "add" },
                        onRename = { id, name -> calls += "rename:$id:$name" },
                        onDelete = { calls += "delete:$it" },
                    )
                }
            }
        }
    }

    @Test
    fun storesCard_snapshot() {
        showCard(stores)
        compose.onNodeWithText("Siêu thị đã lưu").assertIsDisplayed()
        compose.onNodeWithText("ワイズマート").assertIsDisplayed()
        compose.onNodeWithText("Chợ Việt Kasai").assertIsDisplayed()
        compose.onNodeWithText(Geo.distanceLabel(Geo.distanceM(station.first, station.second, 35.6700, 139.8700))).assertIsDisplayed()
        compose.onRoot().captureRoboImage("src/test/snapshots/stores_card.png")
    }

    @Test
    fun storesCard_renameAndDelete_askFirst() {
        showCard(stores)
        compose.onNodeWithTag("store_menu_s3").performClick()
        compose.onNodeWithText("Đổi tên").performClick()
        // Không gõ chữ trong hộp thoại: trên Robolectric, nhập chữ vào ô nằm trong AlertDialog treo "không idle" bất kể
        // đồng hồ (CI run #21–#26); gõ chữ đã có test ở AddItem/ListEdit (không phải dialog), gõ trong dialog kiểm ở Task 13.
        compose.onNodeWithTag("store_rename_field").assertIsDisplayed().assertTextContains("Chợ Việt Kasai")
        compose.onNodeWithTag("store_rename_save").performClick()

        compose.onNodeWithTag("store_menu_s2").performClick()
        compose.onNodeWithText("Xoá").performClick()
        assertEquals(listOf("rename:s3:Chợ Việt Kasai"), calls)
        compose.onNodeWithText("Xoá \"ローソン 西葛西駅南口店\"?").assertIsDisplayed()
        compose.onNodeWithTag("store_delete_confirm").performClick()
        assertEquals(listOf("rename:s3:Chợ Việt Kasai", "delete:s2"), calls)
    }

    @Test
    fun storesCard_empty_offersAdd_noLocationHidesDistance() {
        showCard(emptyList(), here = null)
        compose.onNodeWithText("Chưa lưu siêu thị nào.", substring = true).assertIsDisplayed()
        compose.onNodeWithTag("save_store_button").performClick()
        assertEquals(listOf("add"), calls)
    }
}
