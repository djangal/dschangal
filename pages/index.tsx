import Head from "next/head";

import { attributes, react as HomeContent } from '../content/home.md';

import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import * as fs from 'fs';
import { GetStaticProps } from "next";

export default function Home({projectSections}: ProjectSecionsData) {
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
      </Head>
      <main>
        <HomeContent />
        {projectSections.map(s => <div className="box"><ReactMarkdown>{s.markdownContent}</ReactMarkdown></div>)}

        <script src="https://cdn.jsdelivr.net/gh/dixonandmoe/rellax@master/rellax.min.js"></script>
        <script src="index.js"></script>
      </main>
    </div>
  );
}

export interface ProjectSecionsData {
  projectSections: Array<{slug: string, markdownContent: string, [key: string]: any}>
}

export const getStaticProps: GetStaticProps<ProjectSecionsData> = async () => {
  // List of files in blgos folder =>
  const files = fs.readdirSync('./content/projects')

  // Get the front matter and slug (the filename without .md) of all files
  const markdownContents = files.map(filename => {
    const file = fs.readFileSync(`./content/projects/${filename}`, 'utf8')
    const matterData = matter(file)

    return {
      // ...matterData.data, // matterData.data contains front matter
      slug: filename.slice(0, filename.indexOf('.')),
      markdownContent: matterData.content
    }
  })

  return {
    props: {
      projectSections: markdownContents
    }
  }

}