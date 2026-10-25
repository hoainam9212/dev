package com.namle.dichochung

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Text
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import com.namle.dichochung.ui.MainScaffold
import com.namle.dichochung.ui.Tab
import com.namle.dichochung.ui.theme.DiChoTheme

class MainActivity : ComponentActivity() {

    private var requestedTab by mutableStateOf<Tab?>(null)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        requestedTab = tabFrom(intent)
        setContent {
            DiChoTheme {
                var tab by rememberSaveable { mutableStateOf(requestedTab ?: Tab.PICK) }
                requestedTab?.let { tab = it; requestedTab = null }
                MainScaffold(selected = tab, onSelect = { tab = it }, listBadge = 0) { padding ->
                    Box(Modifier.fillMaxSize().padding(padding), contentAlignment = Alignment.Center) {
                        Text(tab.label)
                    }
                }
            }
        }
    }

    override fun onNewIntent(intent: Intent) {
        super.onNewIntent(intent)
        requestedTab = tabFrom(intent)
    }

    companion object {
        const val EXTRA_OPEN_TAB = "open_tab"

        /** Thông báo (Task 09/10) mở thẳng tab Cần mua bằng extra `open_tab=list`. */
        fun tabFrom(intent: Intent?): Tab? = when (intent?.getStringExtra(EXTRA_OPEN_TAB)) {
            "list" -> Tab.LIST
            else -> null
        }
    }
}
