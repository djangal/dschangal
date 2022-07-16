
export interface ProjectSectionData {    
    slug: string, 
    body: string, 
    coverImage?: string,
    galleryImages?: string[],
    [key: string]: any
}

export interface ProjectSectionsData {
    projectSections: Array<ProjectSectionData>
}

