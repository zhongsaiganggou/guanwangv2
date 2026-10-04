// YouTube Playlist data — loaded from pre-build JSON (fetched via PowerShell)
import playlistData from './playlist-videos.json';

export interface PlaylistVideo {
  videoId: string;
  title: string;
  thumbnail: string;
  embedUrl: string;
}

export function getLatestPlaylistVideos(limit = 4): PlaylistVideo[] {
  return (playlistData as PlaylistVideo[]).slice(0, limit);
}

export function formatVideoDate(_iso: string, _lang: 'en' | 'zh'): string {
  return '';
}
