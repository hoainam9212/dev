package com.namle.dichochung.home

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.AlertDialog
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.data.Home
import com.namle.dichochung.data.Invite
import com.namle.dichochung.data.Member
import com.namle.dichochung.stores.Store
import com.namle.dichochung.stores.StoresCard
import com.namle.dichochung.ui.common.GreenHeader
import com.namle.dichochung.ui.common.RaisedBody
import com.namle.dichochung.ui.common.SectionCard
import com.namle.dichochung.ui.theme.AppColors

/**
 * Tab Nhà mình — phần thành viên của nhóm gia đình (tối đa [Home.MAX_MEMBERS] người). [onInvite] nhận
 * null = mời thêm người, hoặc một thành viên = mời lại người đó khi họ đổi máy.
 * Thẻ "Siêu thị đã lưu" (Task 08) có [here] = vị trí hiện tại để ghi "cách N m"; "Quyền & pin" (Task 09) thêm sau.
 */
@Composable
fun HomeScreen(
    home: Home,
    myUid: String,
    invite: Invite?,
    now: Long,
    onInvite: (Member?) -> Unit,
    onCloseInvite: () -> Unit,
    onRename: (String) -> Unit,
    modifier: Modifier = Modifier,
    stores: List<Store> = emptyList(),
    here: Pair<Double, Double>? = null,
    onAddStore: () -> Unit = {},
    onRenameStore: (String, String) -> Unit = { _, _ -> },
    onDeleteStore: (String) -> Unit = {},
) {
    val me = home.me(myUid)
    val members = listOfNotNull(me) + home.others(myUid)
    var renaming by rememberSaveable { mutableStateOf(false) }

    Column(modifier.fillMaxSize().background(AppColors.Background).verticalScroll(rememberScrollState())) {
        GreenHeader(
            caption = "Đi Chợ Chung",
            title = "Nhà mình",
            roleLabel = me?.name ?: "",
            roleEmoji = me?.role?.emoji ?: "🏠",
        )
        RaisedBody {
            Column(
                Modifier.padding(start = 14.dp, end = 14.dp, bottom = 16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                SectionCard(title = "Thành viên (${home.members.size}/${Home.MAX_MEMBERS})") {
                    members.forEachIndexed { index, member ->
                        if (index > 0) HorizontalDivider(color = AppColors.Divider, modifier = Modifier.padding(vertical = 8.dp))
                        val isMe = member.uid == myUid
                        MemberRow(
                            member = member,
                            isMe = isMe,
                            onEdit = { renaming = true },
                            onReplace = { onInvite(member) },
                        )
                    }

                    if (invite == null) {
                        if (members.size > 1) {
                            Text(
                                "Bấm \"Đổi máy\" khi người đó cài lại app hoặc đổi điện thoại; danh sách vẫn giữ nguyên.",
                                style = MaterialTheme.typography.bodySmall,
                                color = AppColors.TextMuted,
                                modifier = Modifier.padding(top = 10.dp),
                            )
                        }
                        if (home.isFull) {
                            Text(
                                "Nhà đã đủ ${Home.MAX_MEMBERS} người.",
                                style = MaterialTheme.typography.labelMedium,
                                color = AppColors.TextMuted,
                                modifier = Modifier.padding(top = 10.dp),
                            )
                        } else {
                            Button(
                                onClick = { onInvite(null) },
                                shape = RoundedCornerShape(14.dp),
                                colors = ButtonDefaults.buttonColors(containerColor = AppColors.Green),
                                modifier = Modifier.fillMaxWidth().padding(top = 14.dp).height(48.dp).testTag("invite_button"),
                            ) {
                                Text("Mời thêm người", style = MaterialTheme.typography.labelLarge)
                            }
                        }
                    }
                }

                if (invite != null) {
                    InviteCard(invite, now, onClose = onCloseInvite)
                }

                StoresCard(stores, here, onAdd = onAddStore, onRename = onRenameStore, onDelete = onDeleteStore)
            }
        }
    }

    if (renaming && me != null) {
        RenameDialog(
            current = me.name,
            onDismiss = { renaming = false },
            onSave = {
                onRename(it)
                renaming = false
            },
        )
    }
}

@Composable
private fun MemberRow(member: Member, isMe: Boolean, onEdit: () -> Unit, onReplace: () -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        Box(
            Modifier
                .size(44.dp)
                .clip(CircleShape)
                .background(member.role.tint),
            contentAlignment = Alignment.Center,
        ) {
            Text(member.role.emoji, fontSize = 24.sp)
        }
        Column(Modifier.weight(1f).padding(start = 12.dp)) {
            Text(
                member.name,
                style = MaterialTheme.typography.titleSmall,
                maxLines = 1,
                overflow = TextOverflow.Ellipsis,
            )
            Text(
                if (isMe) "${member.role.vi} · máy này" else member.role.vi,
                style = MaterialTheme.typography.bodySmall,
                color = AppColors.TextMuted,
            )
        }
        if (isMe) {
            Box(
                Modifier
                    .size(40.dp)
                    .clip(CircleShape)
                    .clickable(onClick = onEdit)
                    .testTag("rename_button"),
                contentAlignment = Alignment.Center,
            ) {
                Text("✏️", fontSize = 18.sp)
            }
        } else {
            TextButton(onClick = onReplace, modifier = Modifier.testTag("reinvite_${member.uid}")) {
                Text("Đổi máy", style = MaterialTheme.typography.labelMedium, color = AppColors.Green)
            }
        }
    }
}

@Composable
private fun InviteCard(invite: Invite, now: Long, onClose: () -> Unit) {
    val expired = InviteCode.isExpired(invite.expiresAt, now)
    SectionCard(
        title = invite.replacing?.let { "Mời lại ${it.name} (máy mới)" } ?: "Mời người vào nhà",
        modifier = Modifier.testTag("invite_card"),
    ) {
        Column(Modifier.fillMaxWidth(), horizontalAlignment = Alignment.CenterHorizontally) {
            QrImage(invite.code, Modifier.padding(top = 2.dp))
            Text(
                invite.code,
                style = MaterialTheme.typography.headlineSmall.copy(fontSize = 38.sp, letterSpacing = 6.sp),
                color = if (expired) AppColors.TextFaint else AppColors.Text,
                maxLines = 1,
                modifier = Modifier.padding(top = 10.dp).testTag("invite_code"),
            )
            Text(
                if (expired) "Mã đã hết hạn" else "Hết hạn sau ${InviteCode.remainingLabel(invite.expiresAt, now)}",
                style = MaterialTheme.typography.labelMedium,
                color = if (expired) AppColors.Red else AppColors.OrangeDeep,
            )
            Text(
                "Trên máy mới: mở app → chọn mình là ai → nhập 6 số này, hoặc bấm Quét QR.",
                style = MaterialTheme.typography.bodySmall,
                color = AppColors.TextMuted,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(top = 8.dp),
            )
            TextButton(onClick = onClose, modifier = Modifier.testTag("close_invite")) {
                Text("Đóng", style = MaterialTheme.typography.labelLarge, color = AppColors.Green)
            }
        }
    }
}

@Composable
private fun RenameDialog(current: String, onDismiss: () -> Unit, onSave: (String) -> Unit) {
    var name by rememberSaveable { mutableStateOf(current) }
    AlertDialog(
        onDismissRequest = onDismiss,
        containerColor = AppColors.Surface,
        title = { Text("Tên hiển thị", style = MaterialTheme.typography.titleMedium) },
        text = {
            OutlinedTextField(
                value = name,
                onValueChange = { name = it.take(Member.MAX_NAME) },
                singleLine = true,
                supportingText = { Text("${name.length}/${Member.MAX_NAME}") },
                keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                modifier = Modifier.testTag("rename_field"),
            )
        },
        confirmButton = {
            TextButton(onClick = { onSave(name) }, enabled = name.isNotBlank()) {
                Text("Lưu", color = AppColors.Green)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) { Text("Huỷ", color = Color(0xFF56615B)) }
        },
    )
}
