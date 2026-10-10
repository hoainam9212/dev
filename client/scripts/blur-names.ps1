# Làm mờ thông tin tài khoản trên ảnh Word/Excel/PowerPoint thật: tên VNEXT JAPAN + ảnh đại diện ở thanh
# tiêu đề, và email OneDrive trên màn hình Save As. Chạy SAU khi có ảnh mới:
#
#   powershell -File client/scripts/blur-names.ps1
#
# Vị trí đổi theo độ rộng cửa sổ lúc chụp, nên mỗi ảnh có khung riêng (x, y, rộng, cao, tính bằng
# pixel ảnh gốc); một ảnh có thể có nhiều khung. Chụp lại ảnh nào thì xem lại khung của ảnh đó.
# Khung có thêm 'fill' thì tô phẳng bằng màu nền ngay trên khung, thay vì làm mờ: dùng cho vùng lớn
# (danh sách thư mục gần đây trên Save As có tên thư mục công việc), làm mờ từng điểm vùng đó quá chậm.
Add-Type -AssemblyName System.Drawing

$boxes = @(
  @('word-01-window.png',         658, 3, 110, 30),
  @('word-02-home.png',           922, 4, 110, 30),
  @('word-03-line-spacing.png',   655, 4, 112, 32),
  @('word-04-replace-dialog.png', 658, 4, 112, 32),
  @('word-05-insert.png',         655, 3, 112, 32),
  @('word-06-insert-table.png',   658, 3, 112, 32),
  @('word-07-picture-format.png', 655, 3, 112, 34),
  @('word-08-references.png',     655, 3, 112, 32),
  @('word-09-save-as.png',        618, 4, 114, 26),
  @('word-09-save-as.png',        230, 210, 156, 22),  # email dưới "OneDrive - Personal"
  # Excel/PowerPoint: toạ độ lấy từ UI Automation lúc chụp (nút tài khoản rộng 127 px).
  @('excel-01-window.png',        688, 2, 127, 32),
  @('excel-02-home.png',         1238, 2, 127, 32),
  @('excel-04-formulas.png',      938, 2, 127, 32),
  @('excel-06-data.png',          688, 2, 127, 32),
  @('excel-09-insert.png',        688, 2, 127, 32),
  @('excel-11-save-as.png',       648, 2, 135, 32),
  @('excel-11-save-as.png',       232, 212, 160, 22),  # email dưới "OneDrive - Personal"
  @('excel-11-save-as.png',       470, 182, 476, 452, 'fill'),  # thư mục gần đây
  @('excel-11-save-as.png',       926, 112, 20, 72, 'fill'),    # đầu thanh cuộn của danh sách đó
  @('ppt-01-window.png',          688, 2, 127, 32),
  @('ppt-04-insert.png',          688, 2, 127, 32),
  @('ppt-06-design.png',          688, 2, 127, 32),
  @('ppt-07-transitions.png',     688, 2, 127, 32),
  @('ppt-08-slideshow.png',       688, 2, 127, 32)
)

$dir = Join-Path $PSScriptRoot '..\public\images\real'
foreach ($box in $boxes) {
  $name, $x, $y, $w, $h, $mode = $box
  $path = Join-Path $dir $name
  if (-not (Test-Path $path)) { Write-Warning "Không có $name"; continue }

  # Đọc qua bộ nhớ để còn ghi đè đúng file đó.
  $bytes = [IO.File]::ReadAllBytes($path)
  $img = [Drawing.Bitmap]::new([IO.MemoryStream]::new($bytes))

  if ($mode -eq 'fill') {
    $g = [Drawing.Graphics]::FromImage($img)
    $g.FillRectangle([Drawing.SolidBrush]::new($img.GetPixel($x, $y - 3)), $x, $y, $w, $h)
    $g.Dispose()
    $img.Save($path, [Drawing.Imaging.ImageFormat]::Png)
    $img.Dispose()
    Write-Output "Đã tô nền $name ($x,$y ${w}x$h)"
    continue
  }

  # Làm mờ hộp bán kính 8, ba lượt ngang + dọc (gần như Gauss). Tự tính từng điểm vì thu nhỏ bằng
  # GDI+ không lấy trung bình đủ: chữ sáng trên nền trắng vẫn đọc được.
  $px = New-Object 'double[,,]' 3, $w, $h
  for ($i = 0; $i -lt $w; $i++) { for ($j = 0; $j -lt $h; $j++) {
    $c = $img.GetPixel($x + $i, $y + $j); $px[0, $i, $j] = $c.R; $px[1, $i, $j] = $c.G; $px[2, $i, $j] = $c.B
  } }
  $r = 8
  for ($pass = 0; $pass -lt 3; $pass++) {
    foreach ($axis in 0, 1) {
      $len = if ($axis -eq 0) { $w } else { $h }; $other = if ($axis -eq 0) { $h } else { $w }
      $out = New-Object 'double[,,]' 3, $w, $h
      for ($k = 0; $k -lt 3; $k++) { for ($o = 0; $o -lt $other; $o++) { for ($t = 0; $t -lt $len; $t++) {
        $sum = 0; $n = 0
        for ($d = [Math]::Max(0, $t - $r); $d -le [Math]::Min($len - 1, $t + $r); $d++) {
          $sum += if ($axis -eq 0) { $px[$k, $d, $o] } else { $px[$k, $o, $d] }; $n++
        }
        if ($axis -eq 0) { $out[$k, $t, $o] = $sum / $n } else { $out[$k, $o, $t] = $sum / $n }
      } } }
      $px = $out
    }
  }
  for ($i = 0; $i -lt $w; $i++) { for ($j = 0; $j -lt $h; $j++) {
    $cr = [int]$px[0, $i, $j]; $cg = [int]$px[1, $i, $j]; $cb = [int]$px[2, $i, $j]
    $img.SetPixel($x + $i, $y + $j, [Drawing.Color]::FromArgb($cr, $cg, $cb))
  } }

  $img.Save($path, [Drawing.Imaging.ImageFormat]::Png)
  $img.Dispose()
  Write-Output "Đã làm mờ $name ($x,$y ${w}x$h)"
}
