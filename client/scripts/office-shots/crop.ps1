# Cắt một ảnh từ ảnh thô do lib.ps1 chụp ($env:TEMP\office-shots\raw-<raw>.png).
#
#   powershell -File client/scripts/office-shots/crop.ps1 excel-data 0 0 1000 160 client/public/images/real/excel-06-data.png
#
# Ảnh trong bài hiện rộng ~970–1030 px: cắt ~1000 px là nét; hẹp quá thì bị phóng to và mờ.
param($raw, [int]$x, [int]$y, [int]$w, [int]$h, $out)
Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile((Join-Path $env:TEMP "office-shots\raw-$raw.png"))
$bmp = New-Object System.Drawing.Bitmap $w, $h
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.DrawImage($src, (New-Object System.Drawing.Rectangle 0, 0, $w, $h), (New-Object System.Drawing.Rectangle $x, $y, $w, $h), [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose(); $src.Dispose()
$bmp.Save([IO.Path]::GetFullPath($out), [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
"$out ${w}x$h (từ raw-$raw tại $x,$y)"
