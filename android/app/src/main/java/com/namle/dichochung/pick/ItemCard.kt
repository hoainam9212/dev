package com.namle.dichochung.pick

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.clickable
import androidx.compose.foundation.combinedClickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.catalog.Item
import com.namle.dichochung.ui.common.ItemImage
import com.namle.dichochung.ui.theme.AppColors

/**
 * Thẻ món trong lưới 3 cột: chưa chọn ghi "theo <đơn vị>", đã chọn có viền xanh + thanh [−] 10 quả [+].
 * Nhấn giữ = sửa / xoá món ([onLongPress]).
 */
@OptIn(ExperimentalFoundationApi::class)
@Composable
fun ItemCard(
    item: Item,
    qty: Int?,
    onTap: () -> Unit,
    onPlus: () -> Unit,
    onMinus: () -> Unit,
    modifier: Modifier = Modifier,
    onLongPress: () -> Unit = {},
) {
    val shape = RoundedCornerShape(18.dp)
    val selected = qty != null
    Column(
        modifier
            .shadow(if (selected) 4.dp else 1.dp, shape, ambientColor = Shadow, spotColor = if (selected) AppColors.Green else Shadow)
            .clip(shape)
            .background(AppColors.Surface)
            .border(2.dp, if (selected) AppColors.Green else Color.Transparent, shape)
            .combinedClickable(onLongClick = onLongPress, onClick = onTap)
            .testTag("item_card_${item.id}")
            .padding(start = 4.dp, end = 4.dp, top = 9.dp, bottom = 6.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        ItemImage(item, 54.dp)
        Text(
            item.name,
            style = MaterialTheme.typography.labelLarge.copy(fontSize = 12.5.sp, fontWeight = FontWeight.SemiBold),
            maxLines = 1,
            overflow = TextOverflow.Ellipsis,
            textAlign = TextAlign.Center,
            modifier = Modifier.fillMaxWidth().padding(top = 5.dp),
        )
        if (qty == null) {
            // Cao đúng bằng thanh stepper để thẻ chọn / chưa chọn cùng hàng cao bằng nhau như mẫu.
            Box(Modifier.padding(top = 6.dp).height(StepperHeight), contentAlignment = Alignment.Center) {
                Text(
                    PickLabels.perUnit(item.unit),
                    style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Medium),
                    color = AppColors.TextFaint,
                )
            }
        } else {
            Stepper(item.id, PickLabels.qty(qty, item.unit), onPlus, onMinus)
        }
    }
}

@Composable
private fun Stepper(itemId: String, label: String, onPlus: () -> Unit, onMinus: () -> Unit) {
    Row(
        Modifier
            .padding(top = 6.dp)
            .fillMaxWidth()
            .height(StepperHeight)
            .clip(CircleShape)
            .background(AppColors.Green)
            .padding(3.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        StepButton("−", onMinus, Modifier.testTag("stepper_minus_$itemId"))
        Text(
            label,
            color = Color.White,
            style = MaterialTheme.typography.labelSmall.copy(fontWeight = FontWeight.Bold),
            maxLines = 1,
            softWrap = false,
            overflow = TextOverflow.Clip,
            textAlign = TextAlign.Center,
            modifier = Modifier.weight(1f),
        )
        StepButton("+", onPlus, Modifier.testTag("stepper_plus_$itemId"))
    }
}

@Composable
private fun StepButton(symbol: String, onClick: () -> Unit, modifier: Modifier) {
    Box(
        modifier
            .size(20.dp)
            .clip(CircleShape)
            .background(Color.White.copy(alpha = 0.2f))
            .clickable(onClick = onClick),
        contentAlignment = Alignment.Center,
    ) {
        Text(symbol, color = Color.White, fontSize = 13.sp, fontWeight = FontWeight.Bold)
    }
}

private val Shadow = Color(0x1A14281E)
private val StepperHeight = 26.dp
