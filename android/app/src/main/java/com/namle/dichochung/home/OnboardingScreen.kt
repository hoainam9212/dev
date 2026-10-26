package com.namle.dichochung.home

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.selection.selectable
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
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
import androidx.compose.ui.semantics.Role as SemanticsRole
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.namle.dichochung.data.Role
import com.namle.dichochung.ui.common.RaisedBody
import com.namle.dichochung.ui.common.SectionCard
import com.namle.dichochung.ui.theme.AppColors

/**
 * Màn đầu tiên khi máy chưa thuộc nhà nào: chọn mình là ai (6 vai, dùng chung cho cả hai cách), rồi
 * "Tạo nhà mới" hoặc "Nhập mã mời". [onJoin] nhận mã đã lọc chỉ còn chữ số (đủ 6 số mới bấm được).
 */
@Composable
fun OnboardingScreen(
    busy: Boolean,
    error: String?,
    onCreate: (Role) -> Unit,
    onJoin: (String, Role) -> Unit,
    onScan: (Role) -> Unit,
    modifier: Modifier = Modifier,
) {
    var roleKey by rememberSaveable { mutableStateOf<String?>(null) }
    val role = Role.fromKey(roleKey)
    var code by rememberSaveable { mutableStateOf("") }
    val canAct = !busy && role != null
    val canJoin = canAct && code.length == InviteCode.LENGTH

    Column(modifier.fillMaxSize().background(AppColors.Background).verticalScroll(rememberScrollState())) {
        Column(
            Modifier
                .fillMaxWidth()
                .background(AppColors.HeaderGradient)
                .statusBarsPadding()
                .padding(start = 24.dp, end = 24.dp, top = 28.dp, bottom = 48.dp),
        ) {
            Text("🧺", fontSize = 36.sp)
            Text(
                "Đi Chợ Chung",
                style = MaterialTheme.typography.headlineSmall.copy(fontSize = 28.sp),
                color = Color.White,
                modifier = Modifier.padding(top = 4.dp),
            )
            Text(
                "Một danh sách đi chợ cho cả nhà",
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White.copy(alpha = 0.9f),
            )
        }
        RaisedBody {
            Column(Modifier.padding(horizontal = 14.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                SectionCard(title = "Bạn là ai trong nhà?") {
                    Role.entries.chunked(3).forEachIndexed { row, roles ->
                        Row(
                            Modifier.fillMaxWidth().padding(top = if (row > 0) 8.dp else 0.dp),
                            horizontalArrangement = Arrangement.spacedBy(8.dp),
                        ) {
                            roles.forEach { r ->
                                RoleChoice(r, selected = r == role, enabled = !busy, onClick = { roleKey = r.key }, modifier = Modifier.weight(1f))
                            }
                        }
                    }
                    if (role == null) {
                        Text(
                            "Chọn một vai để tạo nhà hoặc vào nhà.",
                            style = MaterialTheme.typography.bodySmall,
                            color = AppColors.TextMuted,
                            modifier = Modifier.padding(top = 10.dp),
                        )
                    }
                }

                SectionCard(title = "Tạo nhà mới") {
                    Text(
                        "Máy đầu tiên trong nhà tạo nhà, rồi mời mọi người vào (tối đa 6 người).",
                        style = MaterialTheme.typography.bodyMedium,
                        color = AppColors.TextMuted,
                    )
                    Button(
                        onClick = { role?.let(onCreate) },
                        enabled = canAct,
                        shape = RoundedCornerShape(14.dp),
                        colors = ButtonDefaults.buttonColors(containerColor = AppColors.Green),
                        modifier = Modifier.fillMaxWidth().padding(top = 12.dp).height(48.dp).testTag("create_button"),
                    ) {
                        Text("Tạo nhà mới", style = MaterialTheme.typography.labelLarge)
                    }
                }

                SectionCard(title = "Nhập mã mời") {
                    Text(
                        "Nhập 6 số đang hiện trên máy người trong nhà, hoặc quét mã QR.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = AppColors.TextMuted,
                    )
                    OutlinedTextField(
                        value = code,
                        onValueChange = { code = InviteCode.clean(it) },
                        singleLine = true,
                        enabled = !busy,
                        isError = error != null,
                        placeholder = {
                            Text(
                                "••••••",
                                style = CodeStyle.copy(color = AppColors.TextFaint),
                                modifier = Modifier.fillMaxWidth(),
                            )
                        },
                        textStyle = CodeStyle,
                        shape = RoundedCornerShape(14.dp),
                        colors = OutlinedTextFieldDefaults.colors(
                            focusedBorderColor = AppColors.Green,
                            unfocusedBorderColor = AppColors.Divider,
                        ),
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number, imeAction = ImeAction.Go),
                        keyboardActions = KeyboardActions(onGo = { if (canJoin && role != null) onJoin(code, role) }),
                        modifier = Modifier.fillMaxWidth().padding(top = 12.dp).testTag("join_code_field"),
                    )
                    if (error != null) {
                        Text(
                            error,
                            style = MaterialTheme.typography.bodySmall,
                            color = AppColors.Red,
                            modifier = Modifier.padding(top = 6.dp).testTag("join_error"),
                        )
                    }
                    Row(
                        Modifier.fillMaxWidth().padding(top = 12.dp),
                        horizontalArrangement = Arrangement.spacedBy(10.dp),
                    ) {
                        Button(
                            onClick = { role?.let { onJoin(code, it) } },
                            enabled = canJoin,
                            shape = RoundedCornerShape(14.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = AppColors.Green),
                            modifier = Modifier.weight(1f).height(48.dp).testTag("join_button"),
                        ) {
                            Text("Vào nhà", style = MaterialTheme.typography.labelLarge)
                        }
                        OutlinedButton(
                            onClick = { role?.let(onScan) },
                            enabled = canAct,
                            shape = RoundedCornerShape(14.dp),
                            modifier = Modifier.weight(1f).height(48.dp).testTag("scan_button"),
                        ) {
                            Text(
                                "📷  Quét QR",
                                style = MaterialTheme.typography.labelLarge,
                                color = if (canAct) AppColors.Green else AppColors.TextFaint,
                            )
                        }
                    }
                }

                if (busy) {
                    Text(
                        "Đang kết nối…",
                        style = MaterialTheme.typography.bodyMedium,
                        color = AppColors.TextMuted,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth().padding(bottom = 12.dp),
                    )
                }
            }
        }
    }
}

@Composable
private fun RoleChoice(role: Role, selected: Boolean, enabled: Boolean, onClick: () -> Unit, modifier: Modifier) {
    val shape = RoundedCornerShape(16.dp)
    Box(
        modifier
            .clip(shape)
            .background(role.tint)
            .border(2.dp, if (selected) AppColors.Green else Color.Transparent, shape)
            .selectable(selected = selected, enabled = enabled, role = SemanticsRole.RadioButton, onClick = onClick)
            .testTag("role_${role.key}")
            .padding(vertical = 10.dp),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(role.emoji, fontSize = 26.sp)
            Text(
                role.vi,
                style = MaterialTheme.typography.titleSmall,
                color = if (selected) AppColors.GreenDark else AppColors.Text,
                modifier = Modifier.padding(top = 2.dp),
            )
        }
    }
}

private val CodeStyle: TextStyle
    @Composable get() = MaterialTheme.typography.headlineSmall.copy(
        fontSize = 26.sp,
        letterSpacing = 8.sp,
        textAlign = TextAlign.Center,
    )
