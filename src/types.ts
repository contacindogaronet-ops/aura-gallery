export interface AndroidFile {
  path: string;
  name: string;
  language: 'kotlin' | 'groovy' | 'xml' | 'toml' | 'properties';
  category: 'build' | 'manifest' | 'ui' | 'domain' | 'data' | 'theme';
  content: string;
  description: string;
  highlightLines?: number[];
}

export interface MediaPhoto {
  id: string;
  uri: string;
  title: string;
  dateAdded: string;
  size: string;
  resolution: string;
  isVideo?: boolean;
  duration?: string;
  isFavorite?: boolean;
  album: string;
}
