import { NextResponse } from 'next/server';
import type { YouTubeVideo, YouTubePlaylistResponse } from '@/src/types/youtube';

// Cache for YouTube API responses (5 minutes)
let cache: { data: YouTubeVideo[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    // Check cache first
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return NextResponse.json({ videos: cache.data, cached: true });
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;
    const PLAYLIST_ID = process.env.YOUTUBE_PLAYLIST_ID;

    if (!API_KEY || !PLAYLIST_ID) {
      return NextResponse.json(
        {
          error: 'YouTube API credentials not configured',
          message: 'Please add YOUTUBE_API_KEY and YOUTUBE_PLAYLIST_ID to environment variables'
        },
        { status: 500 }
      );
    }

    // Fetch playlist items from YouTube API
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;

    const response = await fetch(url);

    if (!response.ok) {
      const error = await response.json();
      console.error('YouTube API Error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch YouTube playlist', details: error },
        { status: response.status }
      );
    }

    const data: YouTubePlaylistResponse = await response.json();

    // Transform YouTube data to our format
    const videos: YouTubeVideo[] = data.items.map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      videoId: item.snippet.resourceId.videoId,
    }));

    // Update cache
    cache = {
      data: videos,
      timestamp: Date.now(),
    };

    return NextResponse.json({ videos, cached: false });
  } catch (error: any) {
    console.error('Error fetching YouTube playlist:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}
