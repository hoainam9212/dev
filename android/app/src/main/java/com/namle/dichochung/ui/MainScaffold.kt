package com.namle.dichochung.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.alpha
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.ui.theme.AppColors

enum class Tab(val label: String, val icon: String, val tag: String) {
    PICK("Chọn đồ", "🧺", "tab_pick"),
    LIST("Cần mua", "📋", "tab_list"),
    HOME("Nhà mình", "🏠", "tab_home"),
}

@Composable
fun MainScaffold(
    selected: Tab,
    onSelect: (Tab) -> Unit,
    listBadge: Int,
    content: @Composable (PaddingValues) -> Unit,
) {
    Scaffold(
        containerColor = AppColors.Background,
        bottomBar = { BottomTabs(selected, onSelect, listBadge) },
        content = content,
    )
}

@Composable
private fun BottomTabs(selected: Tab, onSelect: (Tab) -> Unit, listBadge: Int) {
    Column(Modifier.background(AppColors.Surface).navigationBarsPadding()) {
        HorizontalDivider(color = AppColors.Divider)
        Row(Modifier.fillMaxWidth().height(70.dp)) {
            Tab.entries.forEach { tab ->
                TabItem(
                    tab = tab,
                    selected = tab == selected,
                    badge = if (tab == Tab.LIST) listBadge else 0,
                    onClick = { onSelect(tab) },
                    modifier = Modifier.weight(1f),
                )
            }
        }
    }
}

@Composable
private fun TabItem(tab: Tab, selected: Boolean, badge: Int, onClick: () -> Unit, modifier: Modifier) {
    val color = if (selected) AppColors.Green else AppColors.TextFaint
    Box(
        modifier.fillMaxHeight().testTag(tab.tag).clickable(onClick = onClick),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Box {
                Text(tab.icon, fontSize = 20.sp, modifier = Modifier.alpha(if (selected) 1f else 0.55f))
                if (badge > 0) {
                    Text(
                        badge.toString(),
                        color = Color.White,
                        style = MaterialTheme.typography.labelSmall.copy(fontSize = 10.sp),
                        modifier = Modifier
                            .align(Alignment.TopEnd)
                            .offset(x = 12.dp, y = (-4).dp)
                            .clip(CircleShape)
                            .background(AppColors.Red)
                            .padding(horizontal = 6.dp, vertical = 1.dp),
                    )
                }
            }
            Text(tab.label, style = MaterialTheme.typography.labelSmall, color = color)
        }
    }
}
