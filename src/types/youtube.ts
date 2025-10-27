// YouTube API and Sermon types

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  videoId: string;
  duration?: string;
}

export interface YouTubePlaylistResponse {
  items: YouTubePlaylistItem[];
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  nextPageToken?: string;
}

export interface YouTubePlaylistItem {
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string; width: number; height: number };
      medium: { url: string; width: number; height: number };
      high: { url: string; width: number; height: number };
      standard?: { url: string; width: number; height: number };
      maxres?: { url: string; width: number; height: number };
    };
    resourceId: {
      videoId: string;
    };
  };
}

export interface SermonFilters {
  searchQuery: string;
  sortBy: 'newest' | 'oldest' | 'alphabetical';
}
