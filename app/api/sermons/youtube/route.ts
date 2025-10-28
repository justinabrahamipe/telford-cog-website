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

    // Get video IDs to fetch details
    const videoIds = data.items.map((item) => item.snippet.resourceId.videoId).join(',');

    // Fetch video details to get duration and actual upload date
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${API_KEY}`;
    const detailsResponse = await fetch(detailsUrl);

    const videoDurations: { [key: string]: string } = {};
    const videoPublishDates: { [key: string]: string } = {};
    if (detailsResponse.ok) {
      const detailsData = await detailsResponse.json();
      detailsData.items.forEach((item: any) => {
        videoDurations[item.id] = item.contentDetails.duration;
        videoPublishDates[item.id] = item.snippet.publishedAt;
      });
    }

    // Helper function to parse ISO 8601 duration to seconds
    const parseDuration = (duration: string): number => {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
      if (!match) return 0;
      const hours = parseInt(match[1] || '0', 10);
      const minutes = parseInt(match[2] || '0', 10);
      const seconds = parseInt(match[3] || '0', 10);
      return hours * 3600 + minutes * 60 + seconds;
    };

    // Transform YouTube data to our format
    const allVideos: YouTubeVideo[] = data.items.map((item) => {
      const videoId = item.snippet.resourceId.videoId;
      const duration = videoDurations[videoId];
      const durationInSeconds = duration ? parseDuration(duration) : 0;

      // Check if it's a short by:
      // 1. Duration is 180 seconds (3 minutes) or less
      // 2. Title or description contains #shorts (case insensitive)
      const hasShortsHashtag =
        item.snippet.title.toLowerCase().includes('#shorts') ||
        item.snippet.title.toLowerCase().includes('#short') ||
        item.snippet.description.toLowerCase().includes('#shorts') ||
        item.snippet.description.toLowerCase().includes('#short');

      const isShort = (durationInSeconds > 0 && durationInSeconds <= 180) || hasShortsHashtag;

      return {
        id: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url,
        publishedAt: videoPublishDates[videoId] || item.snippet.publishedAt,
        videoId: videoId,
        duration: duration,
        isShort: isShort,
      };
    });

    // Deduplicate videos by ID (some videos might appear multiple times in playlists)
    const videosMap = new Map<string, YouTubeVideo>();
    allVideos.forEach((video) => {
      if (!videosMap.has(video.id)) {
        videosMap.set(video.id, video);
      }
    });
    const videos = Array.from(videosMap.values());

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
