import { useEffect } from "react";
// import BlogPostPreview from '../previews/BlogPostPreview'

import netlifyIdentity from "netlify-identity-widget";
import { ProjectSectionsPreview } from "../components/project";
// import globalCss from "!!file-loader!/styles/index.scss";
import Head from "next/head";

const Admin = () => {
  useEffect(() => {
    (async () => {
      netlifyIdentity.init();
      const CMS = (await import("netlify-cms-app")).default;
      CMS.init();
      console.log("registerPreviewTemplate", ProjectSectionsPreview);
      console.log(CMS.getPreviewTemplate("projects"));
      // console.log("globalCssUrl");
      // console.log(globalCss);
      CMS.registerPreviewTemplate("projects", ProjectSectionsPreview);
      console.log(CMS.getPreviewTemplate("projects"));

      var i;
      i = setInterval(() => {
        const iframe = document.getElementById(
          "preview-pane"
        ) as HTMLIFrameElement;
        console.log(iframe);
        if (!iframe?.contentDocument?.head) {
          return;
        }
        const getAppStyle = () => {
          let style = "";
          let i = 0;
          for (let styleSheet of [].slice.call(document.styleSheets, 0, 2)) {
            style +=
              "\n /**** stylesheet NR " +
              i++ +
              " " +
              styleSheet?.title +
              "****/\n";
            try {
              if (styleSheet.cssRules) {
                for (let cssRule of styleSheet.cssRules) {
                  style += cssRule.cssText;
                }
              }
            } catch (e) {}
          }
          return style;
        };
        const style = getAppStyle();
        console.log(style);
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.href = "/public.css";
        iframe.contentDocument.head.appendChild(linkEl);

        const styleEl = iframe.contentDocument.createElement("style");
        styleEl.innerText = style;
        iframe.contentDocument.head.appendChild(styleEl);
        clearInterval(i);
      }, 100);
    })();
  }, []);

  return <div>{/* <Head  /> */}</div>;
};

export default Admin;
