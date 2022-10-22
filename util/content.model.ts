export interface ImgMeta {
  width?: number;
  height?: number;
  type?: string;
  mime?: string;
  wUnits?: string;
  hUnits?: string;
  src: string;
}

export interface ContentPageMarkdownData {
  slug: string;
  title: string;
  body: string;
  [key: string]: any;
}
