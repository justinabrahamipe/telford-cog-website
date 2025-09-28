export interface RouteConfig {
  path?: string;
  exact?: boolean;
  component: React.ComponentType;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  image?: string;
  description?: string;
}

export interface SocialMediaIcon {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  address?: string;
  whatsapp?: string;
}

export interface ChurchInfo {
  name: string;
  tagline?: string;
  description?: string;
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: ContactInfo;
  socialMedia: SocialMediaIcon[];
}

export interface SermonVideo {
  id: string;
  title: string;
  description?: string;
  videoUrl: string;
  thumbnail?: string;
  date: string;
  speaker?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}