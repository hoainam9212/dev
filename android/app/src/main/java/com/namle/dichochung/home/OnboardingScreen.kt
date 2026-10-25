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
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
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
 * Màn đầu tiên khi máy chưa thuộc nhà nào: luôn hiện cả hai thẻ "Tạo nhà mới" và "Nhập mã mời".
 * [onJoin] nhận mã đã lọc chỉ còn chữ số (đủ 6 số mới bấm được).
 */
@Composable
fun OnboardingScreen(
    busy: Boolean,
    error: String?,
    onCreate: (Role) -> Unit,
    onJoin: (String) -> Unit,
    onScan: () -> Unit,
    modifier: Modifier = Modifier,
) {
    var code by rememberSaveable { mutableStateOf("") }
    val canJoin = !busy && code.length == InviteCode.LENGTH

    Column(modifier.fillMaxSize().background(AppColors.Background).verticalScroll(rememberScrollState())) {
        Column(
            Modifier
                .fillMaxWidth()
                .background(AppColors.HeaderGradient)
                .statusBarsPadding()
                .padding(start = 24.dp, end = 24.dp, top = 36.dp, bottom = 52.dp),
        ) {
            Text("🧺", fontSize = 40.sp)
            Text(
                "Đi Chợ Chung",
                style = MaterialTheme.typography.headlineSmall.copy(fontSize = 28.sp),
                color = Color.White,
                modifier = Modifier.padding(top = 6.dp),
            )
            Text(
                "Một danh sách đi chợ cho cả hai vợ chồng",
                style = MaterialTheme.typography.bodyLarge,
                color = Color.White.copy(alpha = 0.9f),
            )
        }
        RaisedBody {
            Column(Modifier.padding(horizontal = 14.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
                SectionCard(title = "Tạo nhà mới") {
                    Text(
                        "Máy đầu tiên tạo nhà, rồi mời người kia vào. Bạn là ai?",
                        style = MaterialTheme.typography.bodyMedium,
                        color = AppColors.TextMuted,
                    )
                    Row(
                        Modifier.fillMaxWidth().padding(top = 12.dp),
                        horizontalArrangement = Arrangement.spacedBy(10.dp),
                    ) {
                        RoleChoice(Role.VO, AppColors.PastelPink, busy, { onCreate(Role.VO) }, Modifier.weight(1f))
                        RoleChoice(Role.CHONG, AppColors.PastelBlue, busy, { onCreate(Role.CHONG) }, Modifier.weight(1f))
                    }
                }

                SectionCard(title = "Nhập mã mời") {
                    Text(
                        "Nhập 6 số đang hiện trên máy người kia, hoặc quét mã QR.",
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
                        keyboardActions = KeyboardActions(onGo = { if (canJoin) onJoin(code) }),
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
                            onClick = { onJoin(code) },
                            enabled = canJoin,
                            shape = RoundedCornerShape(14.dp),
                            colors = ButtonDefaults.buttonColors(containerColor = AppColors.Green),
                            modifier = Modifier.weight(1f).height(48.dp).testTag("join_button"),
                        ) {
                            Text("Vào nhà", style = MaterialTheme.typography.labelLarge)
                        }
                        OutlinedButton(
                            onClick = onScan,
                            enabled = !busy,
                            shape = RoundedCornerShape(14.dp),
                            modifier = Modifier.weight(1f).height(48.dp).testTag("scan_button"),
                        ) {
                            Text("📷  Quét QR", style = MaterialTheme.typography.labelLarge, color = AppColors.Green)
                        }
                    }
                }

                if (busy) {
                    Text(
                        "Đang kết nối…",
                        style = MaterialTheme.typography.bodyMedium,
                        color = AppColors.TextMuted,
                        textAlign = TextAlign.Center,
                        modifier = Modifier.fillMaxWidth(),
                    )
                }
            }
        }
    }
}

@Composable
private fun RoleChoice(role: Role, tint: Color, busy: Boolean, onClick: () -> Unit, modifier: Modifier) {
    Box(
        modifier
            .clip(RoundedCornerShape(16.dp))
            .background(tint)
            .clickable(enabled = !busy, onClick = onClick)
            .testTag("create_${role.key}")
            .padding(vertical = 14.dp),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(role.emoji, fontSize = 32.sp)
            Text("Tôi là ${role.vi}", style = MaterialTheme.typography.titleSmall, modifier = Modifier.padding(top = 4.dp))
        }
    }
}

private val CodeStyle: TextStyle
    @Composable get() = MaterialTheme.typography.headlineSmall.copy(
        fontSize = 26.sp,
        letterSpacing = 8.sp,
        textAlign = TextAlign.Center,
    )
