import { ProjectSectionData } from "../components/project.model";
import { getImageMetaWeb } from "./getImageMetaFake";

export async function extendWithImageMetaWeb(
  projectSectionData: ProjectSectionData
) {
  if (projectSectionData.coverImage) {
    projectSectionData.coverImageMeta =
      (await getImageMetaWeb([projectSectionData.coverImage]))[0] ?? null;
  }

  if (projectSectionData.galleryImages) {
    projectSectionData.galleryImagesMeta =
      (await getImageMetaWeb(projectSectionData.galleryImages)) ?? null;
  }
}
