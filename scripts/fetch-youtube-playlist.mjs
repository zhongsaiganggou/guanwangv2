// Pre-build script: fetch YouTube playlist videos via PowerShell and save to JSON
// Usage: node scripts/fetch-youtube-playlist.mjs
import { execSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '..', 'src', 'data', 'playlist-videos.json');
const PLAYLIST_ID = 'PLFxcBbXO5kK4';

try {
  // Use PowerShell's Invoke-WebRequest which works on this machine
  const ps = `
$ErrorActionPreference = 'Stop'
$r = Invoke-WebRequest -Uri 'https://www.youtube.com/playlist?list=${PLAYLIST_ID}' -UseBasicParsing -TimeoutSec 15
$html = $r.Content
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
foreach ($vid in $vids | Select-Object -First 6) {
  $title = ''
  try {
    $o = Invoke-RestMethod -Uri "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$vid&format=json" -TimeoutSec 8
    $title = $o.title
  } catch {}
  $result += @{ videoId = $vid; title = $title }
}
$result | ConvertTo-Json -Compress
`;

  const json = execSync(`powershell -NoProfile -Command "${ps.replace(/"/g, '\\"')}"`, {
    timeout: 30000,
    encoding: 'utf8',
  });

  const videos = JSON.parse(json);
  const output = videos.map(v => ({
    videoId: v.videoId,
    title: v.title || 'ZhongSai Steel Shipment',
    thumbnail: `https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${v.videoId}?rel=0`,
  }));

  writeFileSync(OUTPUT, JSON.stringify(output, null, 2), 'utf8');
  console.log(`[fetch-playlist] Saved ${output.length} videos to playlist-videos.json`);
} catch (err) {
  console.warn('[fetch-playlist] Failed, keeping existing cache:', err.message);
  if (!existsSync(OUTPUT)) {
    writeFileSync(OUTPUT, '[]', 'utf8');
  }
}
