# Vẽ thử khung đỏ + số lên BẢN SAO ảnh để soi trước khi gắn vào bài (không đụng ảnh trong public/).
#
#   powershell -File client/scripts/office-shots/draw.ps1 marks.json client/public/images/real
#
# marks.json: { "lessons": { "<id>": [ { "image": "excel-06-data", "marks": [ { "x": .., "y": .., "w": .., "h": .. } ] } ] } }
# Ra $env:TEMP\office-shots\prev-<id>-<n>.png. Số đặt trên giữa khung như RealShot; khung sát nhau thì số hay đè chữ.
param($json, $imgDir)
Add-Type -AssemblyName System.Drawing
$out = Join-Path $env:TEMP 'office-shots'; New-Item -ItemType Directory -Force $out | Out-Null
$spec = Get-Content -Raw -Encoding UTF8 $json | ConvertFrom-Json
$pen = New-Object Drawing.Pen ([Drawing.Color]::FromArgb(220, 38, 38)), 2
$font = New-Object Drawing.Font 'Arial', 8, ([Drawing.FontStyle]::Bold)
foreach ($p in $spec.lessons.PSObject.Properties) {
  $n = 0
  foreach ($shot in $p.Value) {
    $n++
    $img = [Drawing.Bitmap]::new([IO.MemoryStream]::new([IO.File]::ReadAllBytes((Join-Path $imgDir "$($shot.image).png"))))
    $g = [Drawing.Graphics]::FromImage($img); $g.SmoothingMode = 'AntiAlias'
    $i = 0
    foreach ($m in $shot.marks) {
      $i++
      $x = $m.x / 100 * $img.Width; $y = $m.y / 100 * $img.Height; $w = $m.w / 100 * $img.Width; $h = $m.h / 100 * $img.Height
      $g.DrawRectangle($pen, [float]$x, [float]$y, [float]$w, [float]$h)
      $cx = $x + $w / 2 - 8; $cy = $y - 18
      $g.FillEllipse([Drawing.Brushes]::Red, [float]$cx, [float]$cy, 16, 16)
      $g.DrawString("$i", $font, [Drawing.Brushes]::White, [float]($cx + 4), [float]($cy + 2))
    }
    $g.Dispose(); $img.Save((Join-Path $out "prev-$($p.Name)-$n.png")); $img.Dispose()
  }
}
"đã vẽ vào $out"
