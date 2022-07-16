import { useEffect } from "react";
// import BlogPostPreview from '../previews/BlogPostPreview'

import netlifyIdentity from "netlify-identity-widget";
import { ProjectSectionsPreview } from "../components/project";

const Admin = () => {
  useEffect(() => {
    (async () => {
      netlifyIdentity.init();
      const CMS = (await import("netlify-cms-app")).default;
      CMS.init();
      console.log("registerPreviewTemplate", ProjectSectionsPreview);
      console.log(CMS.getPreviewTemplate("projects"));
      CMS.registerPreviewStyle("/public.css");
      CMS.registerPreviewTemplate("projects", ProjectSectionsPreview);
      console.log(CMS.getPreviewTemplate("projects"));
    })();
  }, []);

  return <div></div>;
};

export default Admin;
