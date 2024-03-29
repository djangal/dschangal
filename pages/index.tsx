import Head from "next/head";

import matter from "gray-matter";
import * as fs from "fs";
import { GetStaticProps } from "next";
import {
  ProjectSectionData,
  ProjectSectionsData,
} from "../components/project.model";
import { ProjectSections } from "../components/project";

import { extendWithImageMeta } from "../util/extendWithImageMeta";
import HeaderMenu from "../components/header";
import DjungleEule from "../components/djungle";
import { ContentPageMarkdownData } from "../util/content.model";
import ReactMarkdown from "react-markdown";

interface HomeProps {
  projectSections: Array<ProjectSectionData>;
  home: ContentPageMarkdownData;
  about: ContentPageMarkdownData;
}

export default function Home({ projectSections, home, about }: HomeProps) {
  const menuItems = [
    { label: "Home", href: "#home" },
    { label: about.title, href: "#about" },
  ];

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
        <main id="home">
          <ReactMarkdown>{home.body}</ReactMarkdown>
          <DjungleEule />
          <ProjectSections projectSections={projectSections} />

          <h4 id="about">{about.title}</h4>
          <ReactMarkdown>{about.body}</ReactMarkdown>

          <script src="index.js"></script>
        </main>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ProjectSectionsData> = async ({
  locale,
}) => {
  const projects = await getContents("projects", locale);
  const home = await getContent(`index/home.${locale}.md`);
  const about = await getContent(`index/about.${locale}.md`);

  console.log("locale", locale);
  console.log(home);
  return {
    props: {
      projectSections: projects,
      home,
      about,
    },
  };
};

async function getContents(path: string, locale: string) {
  const langRegex = new RegExp(`.*\\.${locale}\\.md`);
  const files = fs
    .readdirSync("./content/" + path)
    .filter((filename) => langRegex.test(filename));

  // Get the front matter and slug (the filename without .md) of all files
  const markdownContents = await Promise.all(
    files.map(async (filename) => {
      return await getContent(path + "/" + filename);
    })
  );

  return markdownContents;
}

async function getContent(filename: string) {
  let path = `./content/${filename}`;
  if (!fs.existsSync(path)) {
    path = path.substring(0, path.length - ".en.md".length) + ".de.md";
  }
  const file = fs.readFileSync(path, "utf8");
  const matterData = matter(file) as any as ProjectSectionData;

  await extendWithImageMeta(matterData.data);
  return {
    ...matterData.data,
    date: matterData.data.date?.toString() ?? null,
    slug: filename.slice(0, filename.indexOf(".")),
    body: matterData.content,
  };
}
