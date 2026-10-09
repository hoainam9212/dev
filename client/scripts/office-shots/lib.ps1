# Bộ công cụ tự chụp ảnh Office thật (Windows, PowerShell 5.1). Dot-source rồi gọi từng hàm:
#
#   . client/scripts/office-shots/lib.ps1
#   $xl = New-Object -ComObject Excel.Application; $xl.Visible = $true; [void]$xl.Workbooks.Add()
#   $hwnd = $xl.Hwnd; $root = Root $hwnd; Use-Office (Get-Process EXCEL).Id $hwnd
#   [void](Place $hwnd 40 20 1000 650); ClickEl (Find $root 'Data'); Park
#   Raw (Get-Process EXCEL).Id 40 20 1000 650 'excel-data'      # → $env:TEMP\office-shots\raw-excel-data.png + .tsv
#
# Bài học rút ra khi chụp lần đầu (2026-10-10):
# - Mọi cú bấm/phím đi qua Guard: cửa sổ trên cùng không phải Office thì dừng, không bấm. App khác (Claude, VS Code)
#   có thể tự bật lên trước, nên chụp xong menu nào phải kiểm lại menu còn mở (SafeRaw).
# - Topmost giữ cửa sổ Office trên cùng trong lúc chụp; nhớ tắt khi xong.
# - Menu thả xuống và hộp thoại của Office là cửa sổ CON của cửa sổ chính, tìm trong cây UIA của nó.
# - Tên UIA có thể trùng (vd. "More Options" ở thanh công cụ nhanh và trong nút AutoSum): Find trong nhóm cha.
# - Ribbon của máy có thể đang thu gọn (bấm thẻ thì ribbon nổi đè lên lưới): mở ghim bằng
#   CommandBars.ExecuteMso('MinimizeRibbon') rồi trả lại khi xong.
Add-Type -AssemblyName UIAutomationClient, UIAutomationTypes, System.Drawing, System.Windows.Forms
if (-not ('OfficeShotW32' -as [type])) {
Add-Type @'
using System; using System.Runtime.InteropServices;
public class OfficeShotW32 {
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int L, T, R, B; }
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr h, out uint pid);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int c);
  [DllImport("user32.dll")] public static extern bool SetWindowPos(IntPtr h, IntPtr a, int x, int y, int w, int hh, uint f);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("dwmapi.dll")] public static extern int DwmGetWindowAttribute(IntPtr h, int a, out RECT r, int s);
  [DllImport("user32.dll")] public static extern bool SetCursorPos(int x, int y);
  [DllImport("user32.dll")] public static extern void mouse_event(uint f, int x, int y, uint d, IntPtr e);
  [DllImport("user32.dll")] public static extern void keybd_event(byte k, byte s, uint f, IntPtr e);
}
'@
}
$W32 = [OfficeShotW32]
$AE = [System.Windows.Automation.AutomationElement]
$TS = [System.Windows.Automation.TreeScope]
$script:OutDir = Join-Path $env:TEMP 'office-shots'
New-Item -ItemType Directory -Force $script:OutDir | Out-Null
$script:GuardPid = 0; $script:GuardHwnd = [IntPtr]::Zero

# Khai báo tiến trình Office đang chụp: Guard chỉ cho bấm khi nó ở trên cùng.
function Use-Office($procId, $hwnd) { $script:GuardPid = [int]$procId; $script:GuardHwnd = [IntPtr]$hwnd }

function Frame($hwnd) { $r = New-Object OfficeShotW32+RECT; [void]$W32::DwmGetWindowAttribute([IntPtr]$hwnd, 9, [ref]$r, 16); $r }

# Nhấn-nhả Shift để Windows cho đổi cửa sổ trước (Alt sẽ bật KeyTips của Office).
function Front($hwnd) {
  $W32::keybd_event(0x10, 0, 0, [IntPtr]::Zero); $W32::keybd_event(0x10, 0, 2, [IntPtr]::Zero)
  [void]$W32::SetForegroundWindow([IntPtr]$hwnd); Start-Sleep -Milliseconds 300
}

function Topmost($hwnd, [bool]$on) { [void]$W32::SetWindowPos([IntPtr]$hwnd, [IntPtr]($(if ($on) { -1 } else { -2 })), 0, 0, 0, 0, 0x13) }

# Đặt phần NHÌN THẤY của cửa sổ (không tính viền trong suốt) ở (x,y), cỡ w×h.
function Place($hwnd, $x, $y, $w, $h) {
  $h2 = [IntPtr]$hwnd
  [void]$W32::ShowWindow($h2, 9)
  $wr = New-Object OfficeShotW32+RECT; [void]$W32::GetWindowRect($h2, [ref]$wr); $fr = Frame $hwnd
  $dl = $fr.L - $wr.L; $dt = $fr.T - $wr.T; $dr = $wr.R - $fr.R; $db = $wr.B - $fr.B
  [void]$W32::SetWindowPos($h2, [IntPtr]::Zero, $x - $dl, $y - $dt, $w + $dl + $dr, $h + $dt + $db, 0x40)
  Start-Sleep -Milliseconds 700
  Front $hwnd
  Frame $hwnd
}

function Root($hwnd) { $AE::FromHandle([IntPtr]$hwnd) }
function Find($root, $name) { $root.FindFirst($TS::Descendants, (New-Object System.Windows.Automation.PropertyCondition($AE::NameProperty, $name))) }
function Rect($el) { $el.Current.BoundingRectangle }
# Tìm trong mọi cửa sổ cấp cao của tiến trình (menu lọc của Excel không nằm dưới cửa sổ chính).
function FindInProc($procId, $name) {
  $c = New-Object System.Windows.Automation.PropertyCondition($AE::ProcessIdProperty, [int]$procId)
  foreach ($t in $AE::RootElement.FindAll($TS::Children, $c)) { $e = Find $t $name; if ($e -and -not (Rect $e).IsEmpty) { return $e } }
}

function FgPid { $p = 0; [void]$W32::GetWindowThreadProcessId($W32::GetForegroundWindow(), [ref]$p); $p }
function Guard {
  if (-not $script:GuardPid) { throw 'Use-Office chưa được gọi - không bấm' }
  if ((FgPid) -eq $script:GuardPid) { return }
  Front $script:GuardHwnd
  if ((FgPid) -ne $script:GuardPid) { throw "FOCUS LOST: cửa sổ trên cùng thuộc pid $(FgPid), không phải Office - không bấm" }
}
function Click($x, $y) {
  Guard; [void]$W32::SetCursorPos([int]$x, [int]$y); Start-Sleep -Milliseconds 120; Guard
  $W32::mouse_event(2, 0, 0, 0, [IntPtr]::Zero); Start-Sleep -Milliseconds 60; $W32::mouse_event(4, 0, 0, 0, [IntPtr]::Zero)
}
# Không tìm thấy phần tử thì báo lỗi, KHÔNG bấm (Rect của $null là (0,0): từng bấm nhầm vào góc màn hình).
function ClickEl($el, [double]$fx = 0.5, [double]$fy = 0.5) {
  if (-not $el) { throw 'ClickEl: không thấy phần tử - không bấm' }
  $r = Rect $el
  if ($r.IsEmpty -or $r.Width -le 0) { throw "ClickEl: '$($el.Current.Name)' không có toạ độ - không bấm" }
  Click ($r.X + $r.Width * $fx) ($r.Y + $r.Height * $fy)
}
function Key([string]$keys) { Guard; [System.Windows.Forms.SendKeys]::SendWait($keys); Start-Sleep -Milliseconds 400 }
# Chuột sang màn hình phụ (ở trên màn hình chính) để không làm sáng nút nào; sửa toạ độ nếu máy khác.
function Park { [void]$W32::SetCursorPos(960, -540) }

function Shot($x, $y, $w, $h, $path) {
  $bmp = New-Object System.Drawing.Bitmap ([int]$w), ([int]$h)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.CopyFromScreen([int]$x, [int]$y, 0, 0, $bmp.Size)
  $g.Dispose(); $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
}

# Ghi tên + kiểu + toạ độ (gốc = góc trái trên vùng chụp) mọi phần tử có tên của mọi cửa sổ thuộc tiến trình.
function DumpProc($procId, $ox, $oy, $w, $h, $path) {
  $c = New-Object System.Windows.Automation.PropertyCondition($AE::ProcessIdProperty, [int]$procId)
  $rows = foreach ($top in $AE::RootElement.FindAll($TS::Children, $c)) {
    foreach ($e in @($top) + @($top.FindAll($TS::Descendants, [System.Windows.Automation.Condition]::TrueCondition))) {
      try { $n = $e.Current.Name; $r = $e.Current.BoundingRectangle; $t = $e.Current.ControlType.ProgrammaticName } catch { continue }
      if (-not $n -or $r.IsEmpty -or $r.Width -le 0) { continue }
      $x = [int]($r.X - $ox); $y = [int]($r.Y - $oy)
      if ($x -lt 0 -or $y -lt 0 -or $x -ge $w -or $y -ge $h) { continue }
      "{0}`t{1}`t{2}`t{3}`t{4}`t{5}" -f $n, ($t -replace 'ControlType\.', ''), $x, $y, [int]$r.Width, [int]$r.Height
    }
  }
  $rows | Set-Content -Encoding UTF8 $path
}

# Chụp nguyên vùng kèm toạ độ phần tử (raw-<name>.png/.tsv) để cắt sau bằng crop.ps1, khỏi chụp lại.
function Raw($procId, $x, $y, $w, $h, $name) {
  Shot $x $y $w $h (Join-Path $script:OutDir "raw-$name.png")
  DumpProc $procId $x $y $w $h (Join-Path $script:OutDir "raw-$name.tsv")
}

# Mở ($open) rồi chụp chỉ khi Office đang ở trên cùng và $check trả true (vd. menu còn mở); thử tối đa 3 lần.
function SafeRaw($procId, $x, $y, $w, $h, $name, [scriptblock]$open, [scriptblock]$check) {
  for ($i = 1; $i -le 3; $i++) {
    if ($open) { & $open }
    Park; Start-Sleep -Milliseconds 300
    if (((FgPid) -eq $procId) -and (-not $check -or (& $check))) {
      Raw $procId $x $y $w $h $name
      if ((FgPid) -eq $procId) { "captured $name (lần $i)"; return }
    }
    "thử lại $name (lần $i)"; Key '{ESC}'; Start-Sleep -Milliseconds 500
  }
  throw "không chụp được $name"
}
