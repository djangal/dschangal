import Head from "next/head";

import { attributes, react as HomeContent } from "../content/home.md";

import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import * as fs from "fs";
import { GetStaticProps } from "next";
import {
  ProjectSectionData,
  ProjectSectionsData,
} from "../components/project.model";
import { ProjectSections } from "../components/project";

import { relative } from "path";
import { extendWithImageMeta } from "../util/extendWithImageMeta";

export default function Home({ projectSections }: ProjectSectionsData) {
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
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        <link rel="stylesheet" href="/public.css" />
      </Head>
      <main>
        <HomeContent />
        <ProjectSections projectSections={projectSections} />

        <script src="index.js"></script>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ProjectSectionsData> = async () => {
  // List of files in blgos folder =>
  const files = fs.readdirSync("./content/projects");
  // Get the front matter and slug (the filename without .md) of all files
  const markdownContents = await Promise.all(
    files.map(async (filename) => {
      const file = fs.readFileSync(`./content/projects/${filename}`, "utf8");
      const matterData = matter(file) as any as ProjectSectionData;
      await extendWithImageMeta(matterData.data);

      return {
        ...matterData.data,
        date: matterData.data.date.toString(),
        slug: filename.slice(0, filename.indexOf(".")),
        body: matterData.content,
      };
    })
  );

  return {
    props: {
      projectSections: markdownContents,
    },
  };
};
