import { ProjectSectionData } from "../components/project.model";
import { getImageMetaFake } from "./getImageMetaFake";

export function extendWithImageMetaFake(
  projectSectionData: ProjectSectionData
) {
  if (projectSectionData.coverImage) {
    projectSectionData.coverImageMeta =
      getImageMetaFake([projectSectionData.coverImage])[0] ?? null;
  }

  if (projectSectionData.galleryImages) {
    projectSectionData.galleryImagesMeta =
      getImageMetaFake(projectSectionData.galleryImages) ?? null;
  }
}
