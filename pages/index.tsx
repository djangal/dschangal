import Head from "next/head";

import {
  attributes as homeAttrs,
  react as HomeContent,
} from "../content/home.md";
import {
  attributes as aboutAttrs,
  react as AboutContent,
} from "../content/about.md";

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
import HeaderMenu from "../components/header";
import DjungleEule from "../components/djungle";

const menuItems = [{ label: aboutAttrs["title"] as string, href: "#about" }];

export default function Home({ projectSections }: ProjectSectionsData) {
  return (
    <div>
      <HeaderMenu menuItems={menuItems} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Head>
          <title>Dschangal</title>
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
          <link rel="stylesheet" href="/public.css" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <main>
          <HomeContent />
          <DjungleEule />
          <ProjectSections projectSections={projectSections} />

          <h4 id="about">{aboutAttrs["title"] as string}</h4>
          <AboutContent />

          <script src="index.js"></script>
        </main>
      </div>
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
