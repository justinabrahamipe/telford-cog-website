// Page content and section types

export interface PageSection {
  id: string;
  title: string;
  content: string;
  order?: number;
}

export interface PageContent {
  slug: string;
  title: string;
  content: {
    sections?: PageSection[];
    [key: string]: any;
  };
}

export interface DynamicSectionProps {
  sectionId: string;
  pageSlug: string;
  title: string;
  content: string;
  onDelete?: () => void;
  isDeletable?: boolean;
}
