# Làm mờ thông tin tài khoản trên ảnh Word thật: tên VNEXT JAPAN + ảnh đại diện ở thanh tiêu đề,
# và email OneDrive trên màn hình Save As. Chạy SAU real-shots.mjs, mỗi lần tách ảnh mới:
#
#   powershell -File client/scripts/blur-names.ps1
#
# Vị trí đổi theo độ rộng cửa sổ lúc chụp, nên mỗi ảnh có khung riêng (x, y, rộng, cao, tính bằng
# pixel ảnh gốc); một ảnh có thể có nhiều khung. Chụp lại ảnh nào thì xem lại khung của ảnh đó.
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
  @('word-09-save-as.png',        230, 210, 156, 22)   # email dưới "OneDrive - Personal"
)

$dir = Join-Path $PSScriptRoot '..\public\images\real'
foreach ($box in $boxes) {
  $name, $x, $y, $w, $h = $box
  $path = Join-Path $dir $name
  if (-not (Test-Path $path)) { Write-Warning "Không có $name"; continue }

  # Đọc qua bộ nhớ để còn ghi đè đúng file đó.
  $bytes = [IO.File]::ReadAllBytes($path)
  $img = [Drawing.Bitmap]::new([IO.MemoryStream]::new($bytes))

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
