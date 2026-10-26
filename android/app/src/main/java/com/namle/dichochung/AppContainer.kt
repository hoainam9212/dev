package com.namle.dichochung

import android.content.Context
import com.namle.dichochung.data.CatalogRepository
import com.namle.dichochung.data.FirebaseModule
import com.namle.dichochung.data.FirestoreHomeRepository
import com.namle.dichochung.data.HomeRepository
import com.namle.dichochung.data.ListRepository
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob

/** DI thủ công: các task sau thêm repository vào đây. Firebase chỉ khởi tạo khi cần lần đầu. */
class AppContainer(private val context: Context) {
    private val appScope = CoroutineScope(SupervisorJob() + Dispatchers.Main.immediate)

    val homeRepository: HomeRepository by lazy {
        FirestoreHomeRepository(context, FirebaseModule.auth, FirebaseModule.db, appScope)
    }

    val catalogRepository: CatalogRepository by lazy {
        CatalogRepository(context, FirebaseModule.db, homeRepository, appScope)
    }

    val listRepository: ListRepository by lazy {
        ListRepository(FirebaseModule.db, homeRepository, appScope)
    }
}
