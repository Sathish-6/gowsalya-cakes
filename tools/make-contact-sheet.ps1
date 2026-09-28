Add-Type -AssemblyName System.Drawing
$ErrorActionPreference = 'Stop'
$ids = @(
 '1578985545062-69928b1d9587','1464349095431-e9a21285b5f3','1551024506-0bccd828d307',
 '1519915028121-7d3463d20b13','1607478900766-efe13248b125','1486427944299-d1955d23e34d',
 '1563729784474-d77dbb933a9e','1499636136210-6f4ee915583e','1587241321921-91a834d6d191',
 '1621303837174-89787a7d4729','1612203985729-70726954388c','1565958011703-44f9829ba187',
 '1542826438-bd32f43d626f','1558961363-fa8fdf82db35','1550617931-e17a7b70dce2',
 '1587668178277-295251f900ce','1556484687-30636164638b','1602351447937-745cb720612f',
 '1590080875515-8a3a8dc5735e','1541783245831-57d6fb0926d3','1519671482749-fd09be7ccebf'
)
$dir = Join-Path $env:TEMP 'cakesheet'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$cell = 220; $cols = 5
$rows = [Math]::Ceiling($ids.Count / $cols)
$sheet = New-Object System.Drawing.Bitmap ($cols * $cell), ($rows * $cell + 30)
$g = [System.Drawing.Graphics]::FromImage($sheet)
$g.Clear([System.Drawing.Color]::White)
$font = New-Object System.Drawing.Font('Arial', 22, [System.Drawing.FontStyle]::Bold)
$brush = [System.Drawing.Brushes]::Yellow
$i = 0
foreach ($id in $ids) {
  $url = "https://images.unsplash.com/photo-$id`?w=$cell&h=$cell&fit=crop&q=70"
  $file = Join-Path $dir "$i.jpg"
  try {
    Invoke-WebRequest -Uri $url -OutFile $file -TimeoutSec 25 -UseBasicParsing
    $img = [System.Drawing.Image]::FromFile($file)
    $x = ($i % $cols) * $cell; $y = [Math]::Floor($i / $cols) * $cell
    $g.DrawImage($img, $x, $y, $cell, $cell)
    $g.FillRectangle([System.Drawing.Brushes]::Black, $x, $y, 40, 34)
    $g.DrawString("$i", $font, $brush, ($x + 8), ($y + 2))
    $img.Dispose()
  } catch { Write-Host "fail $i $id" }
  $i++
}
$g.DrawString('index maps to the ordered id list', $font, [System.Drawing.Brushes]::Black, 10, ($rows * $cell))
$g.Dispose()
$out = Join-Path $dir 'sheet.png'
$sheet.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$sheet.Dispose()
Write-Host "SHEET: $out"
$ids | ForEach-Object -Begin {$n=0} -Process { Write-Host "$n = $_"; $n++ }
