import Head from "next/head";

import { attributes, react as HomeContent } from '../content/home.md';

import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import * as fs from 'fs';
import { GetStaticProps } from "next";
import { ProjectSectionsData } from "../components/project.model";


export default function Home({projectSections}: ProjectSectionsData) {
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
        {projectSections.map(s => <div key={s.title} className="box"><ReactMarkdown>{s.body}</ReactMarkdown></div>)}

        <script src="https://cdn.jsdelivr.net/gh/dixonandmoe/rellax@master/rellax.min.js"></script>
        <script src="index.js"></script>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ProjectSectionsData> = async () => {
  // List of files in blgos folder =>
  const files = fs.readdirSync('./content/projects')
console.log('getStaticProps')
  // Get the front matter and slug (the filename without .md) of all files
  const markdownContents = files.map(filename => {
    const file = fs.readFileSync(`./content/projects/${filename}`, 'utf8')
    const matterData = matter(file)
    console.log('SALI', matterData)
    return {
      ...matterData.data,
      date: matterData.data.date.toString(),
      slug: filename.slice(0, filename.indexOf('.')),
      body: matterData.content,
    }
  })

  return {
    props: {
      projectSections: markdownContents
    }
  }

}