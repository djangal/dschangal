import { browser } from "process";
import { ProjectSectionData } from "../components/project.model";
import { getImageMeta } from "./getImageMeta";

export async function extendWithImageMeta(
  projectSectionData: ProjectSectionData
) {
  if (projectSectionData.coverImage) {
    projectSectionData.coverImageMeta =
      (await getImageMeta([projectSectionData.coverImage]))[0] ?? null;
  }

  if (projectSectionData.galleryImages) {
    projectSectionData.galleryImagesMeta =
      (await getImageMeta(projectSectionData.galleryImages)) ?? null;
  }
}
