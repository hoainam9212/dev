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
import com.namle.dichochung.catalog.SearchResult
import com.namle.dichochung.data.CatalogRepository
import com.namle.dichochung.data.ItemWriter
import com.namle.dichochung.data.ListRepository
import kotlinx.coroutines.CancellationException
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class PickViewModel(
    private val catalog: CatalogRepository,
    private val list: ListRepository,
    private val writer: ItemWriter,
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
        val result = results(items, q, category)
        PickUiState(query = q, category = category, items = result.matches, suggestions = result.suggestions, selection = sel)
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), PickUiState())

    private val _editor = MutableStateFlow<ItemEditor?>(null)
    val editor: StateFlow<ItemEditor?> = _editor

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

    /** Dòng "+ Thêm "<chữ đã gõ>"" → bảng thêm món, nhóm + đơn vị đoán sẵn. */
    fun startAdd(query: String) {
        _editor.value = ItemEditor(ItemDraft.forNew(query, catalog.items.value))
    }

    /** Nhấn giữ thẻ món → bảng sửa món. */
    fun startEdit(itemId: String) {
        val item = catalog.items.value.firstOrNull { it.id == itemId } ?: return
        _editor.value = ItemEditor(ItemDraft.forEdit(item))
    }

    fun updateDraft(draft: ItemDraft) {
        _editor.update { it?.let { e -> ItemEditor(draft, e.photo, e.duplicate, e.busy) } }
    }

    /** [load] đọc + cắt ảnh (camera / thư viện), chạy ngoài luồng giao diện. */
    fun loadPhoto(load: () -> ByteArray) {
        viewModelScope.launch {
            val bytes = try {
                withContext(Dispatchers.Default) { load() }
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _messages.emit("Không đọc được ảnh, thử ảnh khác")
                return@launch
            }
            _editor.update { it?.let { e -> ItemEditor(e.draft, bytes, e.duplicate, e.busy) } }
        }
    }

    /** Lưu món. Món mới gần giống món đã có thì hỏi trước, trừ khi [force] ("Vẫn thêm mới"). */
    fun save(force: Boolean = false) {
        val editor = _editor.value ?: return
        val draft = editor.draft
        if (!draft.isValid || editor.busy) return
        if (draft.isNew && !force) {
            ItemSearch(catalog.items.value).findDuplicate(draft.name)?.let { existing ->
                _editor.value = ItemEditor(draft, editor.photo, duplicate = existing)
                return
            }
        }
        _editor.value = ItemEditor(draft, editor.photo, busy = true)
        viewModelScope.launch {
            val message = try {
                val item = writer.upsert(draft.toItem(ItemDraft.newId()), editor.photo)
                if (draft.isNew) {
                    // Thêm xong là chọn luôn; kho món có món mới ngay khi Firestore ghi vào cache.
                    updateSelection(selection.value + (item.id to item.defaultQty))
                    setQuery("")
                }
                _editor.value = null
                if (draft.isNew) "Đã thêm \"${item.name}\"" else "Đã lưu \"${item.name}\""
            } catch (e: CancellationException) {
                throw e
            } catch (e: Exception) {
                _editor.update { it?.let { e2 -> ItemEditor(e2.draft, e2.photo) } }
                "Chưa lưu được, thử lại"
            }
            _messages.emit(message)
        }
    }

    /** "Dùng món có sẵn": chọn món đã có thay vì thêm món trùng. */
    fun useExisting() {
        val existing = _editor.value?.duplicate ?: return
        if (existing.id !in selection.value) updateSelection(selection.value + (existing.id to existing.defaultQty))
        setQuery("")
        _editor.value = null
    }

    /** Quay lại form từ hộp thoại món trùng. */
    fun dismissDuplicate() {
        _editor.update { it?.let { e -> ItemEditor(e.draft, e.photo) } }
    }

    fun deleteEdited() {
        val item = _editor.value?.draft?.base ?: return
        val message = try {
            writer.delete(item)
            updateSelection(selection.value - item.id)
            "Đã xoá \"${item.name}\""
        } catch (e: Exception) {
            "Chưa xoá được, thử lại"
        }
        _editor.value = null
        _messages.tryEmit(message)
    }

    fun closeEditor() {
        _editor.value = null
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

        /**
         * Có chữ tìm → món khớp + "Có phải bạn tìm" (gợi ý gần đúng), bỏ qua nhóm;
         * không thì "Hay mua" (mọi món, hay gửi nhất lên đầu) hoặc lọc theo nhóm.
         */
        fun results(items: List<Item>, query: String, category: Category?): SearchResult {
            val search = ItemSearch(items)
            if (query.isNotBlank()) return search.search(query, limit = Int.MAX_VALUE)
            val popular = search.search("", limit = Int.MAX_VALUE).matches
            return SearchResult(if (category == null) popular else popular.filter { it.category == category }, emptyList())
        }

        fun factory(catalog: CatalogRepository, list: ListRepository, writer: ItemWriter) = viewModelFactory {
            initializer { PickViewModel(catalog, list, writer, createSavedStateHandle()) }
        }
    }
}
