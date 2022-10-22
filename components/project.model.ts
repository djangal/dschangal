import { ContentPageMarkdownData, ImgMeta } from "../util/content.model";

export interface ProjectSectionData extends ContentPageMarkdownData {
  coverImage?: string;
  coverImageMeta?: ImgMeta;
  galleryImages?: string[];
  galleryImagesMeta?: ImgMeta[];
  [key: string]: any;
}

export interface ProjectSectionsData {
  projectSections: Array<ProjectSectionData>;
}
