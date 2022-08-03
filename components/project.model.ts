export interface ImgMeta {
  width?: number;
  height?: number;
  type?: string;
  mime?: string;
  wUnits?: string;
  hUnits?: string;
  src: string;
}

export interface ProjectSectionData {
  slug: string;
  title: string;
  body: string;
  coverImage?: string;
  coverImageMeta?: ImgMeta;
  galleryImages?: string[];
  galleryImagesMeta?: ImgMeta[];
  [key: string]: any;
}

export interface ProjectSectionsData {
  projectSections: Array<ProjectSectionData>;
}
