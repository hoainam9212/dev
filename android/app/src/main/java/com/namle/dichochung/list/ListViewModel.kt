package com.namle.dichochung.list

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import com.namle.dichochung.data.CatalogRepository
import com.namle.dichochung.data.EntryState
import com.namle.dichochung.data.ListRepository
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.stateIn

class ListViewModel(
    private val list: ListRepository,
    catalog: CatalogRepository,
    /** Tên siêu thị đang đứng cho nhãn "Hết ở …" (Task 09); chưa có thì null → "Hết hàng". */
    private val currentStore: () -> String? = { null },
) : ViewModel() {

    val state: StateFlow<ListUiState> = combine(list.entries, catalog.items) { entries, items ->
        val byId = items.associateBy { it.id }
        val (picked, total) = ListSections.progress(entries)
        ListUiState(ListSections.build(entries, byId), byId, picked, total, entries)
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), ListUiState())

    private val _editing = MutableStateFlow<String?>(null)

    /** Id dòng đang mở bảng sửa số lượng / ghi chú. */
    val editing: StateFlow<String?> = _editing.asStateFlow()

    private val _messages = MutableSharedFlow<String>(extraBufferCapacity = 1)
    val messages: SharedFlow<String> = _messages.asSharedFlow()

    /** Ô tick: đã nhặt ↔ cần mua; tick dòng hết hàng = nhặt được ở chỗ khác. */
    fun toggleTick(entryId: String) = act {
        if (entry(entryId)?.state == EntryState.PICKED) list.untick(entryId) else list.tick(entryId)
    }

    /** Vuốt trái: hết hàng; vuốt lại dòng đang hết hàng thì về "cần mua". */
    fun swipe(entryId: String) = act {
        if (entry(entryId)?.state == EntryState.OUT_OF_STOCK) list.untick(entryId) else list.markOutOfStock(entryId, currentStore())
    }

    fun startEdit(entryId: String) {
        _editing.value = entryId
    }

    fun closeEdit() {
        _editing.value = null
    }

    /** Chỉ gửi trường thật sự đổi để không đè số / ghi chú người kia vừa sửa. */
    fun saveEdit(qty: Int, note: String) {
        val entry = _editing.value?.let(::entry)
        _editing.value = null
        if (entry == null) return
        val newQty = qty.takeIf { it != entry.qty }
        val newNote = note.trim().takeIf { it != entry.note }
        if (newQty == null && newNote == null) return
        act { list.edit(entry.id, newQty, newNote) }
    }

    fun finish() = act {
        val result = list.finish()
        if (result.picked > 0) _messages.tryEmit(ListLabels.finished(result.picked, result.total))
    }

    private fun entry(id: String) = list.entries.value.firstOrNull { it.id == id }

    private fun act(block: () -> Unit) {
        try {
            block()
        } catch (e: Exception) {
            _messages.tryEmit("Chưa lưu được, thử lại")
        }
    }

    companion object {
        fun factory(list: ListRepository, catalog: CatalogRepository) = viewModelFactory {
            initializer { ListViewModel(list, catalog) }
        }
    }
}
