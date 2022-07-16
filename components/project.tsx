import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { ProjectSectionData, ProjectSectionsData } from "./project.model";
import Head from "next/head";

import Application from "../pages/_app";
import { Router } from "next/router";

export function ProjectSection(s: ProjectSectionData) {
  return (
    <div className="projectSection">
      {" "}
      <img src={s.coverImage} className="coverImage" />
      <div className="body">
        <ReactMarkdown>{s.body}</ReactMarkdown>
      </div>
      <div className="gallery">
        {s.galleryImages.map((i) => (
          <img key={i} src={i} />
        ))}
      </div>
    </div>
  );
}

function ProjectSections({ projectSections }: ProjectSectionsData) {
  console.log("ProjectSections", projectSections);
  return (
    <div>
      {projectSections.map((s) => (
        <ProjectSection key={s.title} {...s} />
      ))}
    </div>
  );
}

export const Wrapper = ({ Component, pageProps }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Head>
        <title>Create Next App</title>
        {/* <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script> */}
      </Head>
      <main>
        <Component {...pageProps} />
        <script src="https://cdn.jsdelivr.net/gh/dixonandmoe/rellax@master/rellax.min.js"></script>
        <script src="index.js"></script>
      </main>
    </div>
  );
};

export const ProjectSectionsPreview = ({ entry, widgetFor }) => {
  console.log(
    "ProjectSectionPreview",
    entry.toObject(),
    entry.get("data").toObject()
  );
  return (
    <Application
      Component={Wrapper}
      pageProps={{
        Component: ProjectSection,
        pageProps: entry.get("data").toObject(),
      }}
      router={null}
    />
  );
};
