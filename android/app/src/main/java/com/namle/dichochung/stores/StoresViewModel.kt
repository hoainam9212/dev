package com.namle.dichochung.stores

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.lifecycle.viewmodel.initializer
import androidx.lifecycle.viewmodel.viewModelFactory
import kotlinx.coroutines.Job
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

/** Bảng lưu siêu thị: [Locating] = đang lấy vị trí + tìm trên bản đồ; [Choosing] = chọn chỗ / tự nhập tên. */
sealed interface SaveStoreState {
    data object Idle : SaveStoreState
    data object Locating : SaveStoreState
    data class Choosing(
        val lat: Double,
        val lng: Double,
        val candidates: List<StoreCandidate>,
    ) : SaveStoreState
}

class StoresViewModel(
    private val repo: StoreRepository,
    private val location: LocationProvider,
    private val finder: StoreFinder,
) : ViewModel() {

    val stores: StateFlow<List<Store>> = repo.stores

    private val _save = MutableStateFlow<SaveStoreState>(SaveStoreState.Idle)
    val save: StateFlow<SaveStoreState> = _save.asStateFlow()

    private val _here = MutableStateFlow<Pair<Double, Double>?>(null)

    /** Vị trí gần nhất đã biết, để thẻ "Siêu thị đã lưu" ghi "cách N m". */
    val here: StateFlow<Pair<Double, Double>?> = _here.asStateFlow()

    private val _messages = MutableSharedFlow<String>(extraBufferCapacity = 1)
    val messages: SharedFlow<String> = _messages.asSharedFlow()

    private var locating: Job? = null

    fun hasPermission() = location.hasPermission()

    /** Gọi sau khi đã có quyền vị trí: lấy vị trí, tìm siêu thị quanh đó; không thấy thì để người dùng tự nhập tên. */
    fun locate() {
        locating?.cancel()
        _save.value = SaveStoreState.Locating
        locating = viewModelScope.launch {
            val loc = location.current()
            if (loc == null) {
                _save.value = SaveStoreState.Idle
                _messages.emit("Không lấy được vị trí, bật GPS rồi thử lại")
                return@launch
            }
            _here.value = loc.latitude to loc.longitude
            _save.value = SaveStoreState.Choosing(loc.latitude, loc.longitude, finder.nearby(loc.latitude, loc.longitude))
        }
    }

    fun permissionDenied() {
        _messages.tryEmit("Cần quyền vị trí để lưu siêu thị")
    }

    fun save(candidate: StoreCandidate?, name: String) {
        val choosing = _save.value as? SaveStoreState.Choosing ?: return
        val message = try {
            repo.add(candidate, name, choosing.lat, choosing.lng)
            "Đã lưu ${name.trim()}"
        } catch (e: Exception) {
            "Chưa lưu được, thử lại"
        }
        _save.value = SaveStoreState.Idle
        _messages.tryEmit(message)
    }

    fun dismiss() {
        locating?.cancel()
        _save.value = SaveStoreState.Idle
    }

    fun rename(id: String, name: String) = guard { repo.rename(id, name) }

    fun delete(id: String) = guard { repo.delete(id) }

    /** Cập nhật "cách N m" khi mở tab Nhà mình; chưa có quyền thì thôi (không hỏi quyền chỉ để hiện khoảng cách). */
    fun refreshHere() {
        if (!location.hasPermission()) return
        viewModelScope.launch {
            location.current()?.let { _here.value = it.latitude to it.longitude }
        }
    }

    private fun guard(block: () -> Unit) {
        try {
            block()
        } catch (e: Exception) {
            _messages.tryEmit("Chưa lưu được, thử lại")
        }
    }

    companion object {
        fun factory(repo: StoreRepository, location: LocationProvider, finder: StoreFinder) = viewModelFactory {
            initializer { StoresViewModel(repo, location, finder) }
        }
    }
}
