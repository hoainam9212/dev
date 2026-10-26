package com.namle.dichochung.pick

import androidx.lifecycle.SavedStateHandle
import androidx.lifecycle.ViewModel
import androidx.lifecycle.createSavedStateHandle
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.namle.dichochung.catalog.Category
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.catalog.ItemSearch
import com.namle.dichochung.data.CatalogRepository
import com.namle.dichochung.data.ListRepository
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class PickViewModel(
    private val catalog: CatalogRepository,
    private val list: ListRepository,
    private val saved: SavedStateHandle,
) : ViewModel() {

    private val query = saved.getStateFlow(KEY_QUERY, "")
    private val categoryKey = saved.getStateFlow<String?>(KEY_CATEGORY, null)

    /** Lựa chọn chỉ nằm trên máy này (không đồng bộ), giữ qua xoay màn / app bị hệ thống dọn. */
    private val selection = MutableStateFlow(restoreSelection())

    private val _messages = MutableSharedFlow<String>(extraBufferCapacity = 1)
    val messages: SharedFlow<String> = _messages.asSharedFlow()

    val state: StateFlow<PickUiState> = combine(catalog.items, query, categoryKey, selection) { items, q, key, sel ->
        val category = Category.entries.firstOrNull { it.key == key }
        PickUiState(query = q, category = category, items = visible(items, q, category), selection = sel)
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), PickUiState())

    fun setQuery(value: String) {
        saved[KEY_QUERY] = value
    }

    fun setCategory(category: Category?) {
        saved[KEY_CATEGORY] = category?.key
    }

    fun tap(itemId: String) = change(itemId, PickSelection::tap)

    fun plus(itemId: String) = change(itemId, PickSelection::plus)

    fun minus(itemId: String) = change(itemId, PickSelection::minus)

    /** [recipients] = tên hiển thị những người khác trong nhà, để báo "Đã gửi N món cho Chồng" / "cho cả nhà". */
    fun send(recipients: List<String>) {
        val chosen = selection.value
        if (chosen.isEmpty()) return
        viewModelScope.launch {
            val message = try {
                list.send(chosen, catalog.items.value)
                updateSelection(emptyMap())
                PickLabels.sentMessage(chosen.size, recipients)
            } catch (e: Exception) {
                "Chưa gửi được, thử lại"
            }
            _messages.emit(message)
        }
    }

    private fun change(itemId: String, op: (Map<String, Int>, Item) -> Map<String, Int>) {
        val item = catalog.items.value.firstOrNull { it.id == itemId } ?: return
        updateSelection(op(selection.value, item))
    }

    private fun updateSelection(value: Map<String, Int>) {
        selection.value = value
        saved[KEY_SEL_IDS] = ArrayList(value.keys)
        saved[KEY_SEL_QTY] = value.values.toIntArray()
    }

    private fun restoreSelection(): Map<String, Int> {
        val ids = saved.get<ArrayList<String>>(KEY_SEL_IDS) ?: return emptyMap()
        val qty = saved.get<IntArray>(KEY_SEL_QTY) ?: return emptyMap()
        return ids.zip(qty.toList()).toMap(LinkedHashMap<String, Int>())
    }

    companion object {
        private const val KEY_QUERY = "query"
        private const val KEY_CATEGORY = "category"
        private const val KEY_SEL_IDS = "selection_ids"
        private const val KEY_SEL_QTY = "selection_qty"

        /** Có chữ tìm → kết quả tìm (khớp rồi gợi ý gần đúng), bỏ qua nhóm; không thì "Hay mua" hoặc lọc theo nhóm. */
        fun visible(items: List<Item>, query: String, category: Category?): List<Item> {
            val search = ItemSearch(items)
            if (query.isNotBlank()) {
                val result = search.search(query, limit = Int.MAX_VALUE)
                return result.matches + result.suggestions
            }
            val popular = search.search("", limit = Int.MAX_VALUE).matches
            return if (category == null) popular else popular.filter { it.category == category }
        }

        fun factory(catalog: CatalogRepository, list: ListRepository) = viewModelFactory {
            initializer { PickViewModel(catalog, list, createSavedStateHandle()) }
        }
    }
}
