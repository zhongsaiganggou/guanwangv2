$ErrorActionPreference = 'Stop'
$outFile = 'D:\zhongsai-website-v2\src\data\playlist-videos.json'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

try {
  $r = Invoke-WebRequest -Uri 'https://www.youtube.com/playlist?list=PLFxcBbXO5kK4' -UseBasicParsing -TimeoutSec 15
  $html = [System.Text.Encoding]::UTF8.GetString($r.RawContentStream.ToArray())
  $re = [regex]'"videoId":"([a-zA-Z0-9_-]{11})"'
  $seen = @{}
  $vids = @()
  foreach ($m in $re.Matches($html)) {
    if (-not $seen.ContainsKey($m.Groups[1].Value)) {
      $seen[$m.Groups[1].Value] = $true
      $vids += $m.Groups[1].Value
    }
  }
  $result = @()
  foreach ($vid in ($vids | Select-Object -First 6)) {
    $title = 'ZhongSai Steel Shipment'
    try {
      $o = Invoke-WebRequest -Uri "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$vid&format=json" -UseBasicParsing -TimeoutSec 8
      $oJson = [System.Text.Encoding]::UTF8.GetString($o.RawContentStream.ToArray()) | ConvertFrom-Json
      $title = $oJson.title
    } catch {}
    $result += [PSCustomObject]@{
      videoId   = $vid
      title     = $title
      thumbnail = "https://i.ytimg.com/vi/$vid/hqdefault.jpg"
      embedUrl  = "https://www.youtube-nocookie.com/embed/$vid`?rel=0"
    }
  }
  # Write as UTF8 without BOM
  $json = $result | ConvertTo-Json -Depth 3
  [System.IO.File]::WriteAllText($outFile, $json, (New-Object System.Text.UTF8Encoding $false))
  Write-Host "Saved $($result.Count) videos"
} catch {
  Write-Host "ERROR: $_"
}
