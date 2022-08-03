import ReactMarkdown from "react-markdown";
import {
  ImgMeta,
  ProjectSectionData,
  ProjectSectionsData,
} from "./project.model";
import Head from "next/head";
import Image from "next/image";

import Application from "../pages/_app";
import { Parallax, parallaxFx } from "./parallax";
import ImgReel from "./img-reel";
import Modal from "./modal";

import ImageGallery from "react-image-gallery";
import { useState } from "react";

export function ProjectSection(s: ProjectSectionData) {
  const [detailImage, setDetailImage] = useState<number | null>(null);
  return (
    <div className="projectSection">
      <h2>{s.title}</h2>
      <ImgReel images={s.galleryImagesMeta}>
        <Parallax config={parallaxFx.topBottomCoverImg}>
          <div
            style={{
              backgroundImage: `url(${s.coverImage})`,
              backgroundPositionY: `var(--bgpos)`,
            }}
            className="coverImage"
          ></div>
        </Parallax>
        <div>
          <div className="body">
            <ReactMarkdown>{s.body}</ReactMarkdown>
          </div>
          <div className="gallery">
            {s.galleryImagesMeta.map((img, i) => (
              <Parallax key={img.src + i}>
                <a
                  className="galleryImage"
                  href={"#" + img.src}
                  onClick={(ev) => {
                    setDetailImage(i);
                    ev.preventDefault();
                  }}
                >
                  <Image
                    src={img.src}
                    width={img.width}
                    height={img.height}
                    style={{
                      opacity: "var(--opacity)",
                      willChange: "opacity",
                    }}
                  />
                </a>
              </Parallax>
            ))}
          </div>
        </div>
      </ImgReel>

      <Modal open={detailImage === null ? false : detailImage + 1}>
        <ImageGallery
          showPlayButton={false}
          showFullscreenButton={false}
          startIndex={detailImage}
          items={s.galleryImagesMeta.map((img) => ({
            original: img.src,
            thumbnail: img.src,
          }))}
        />
      </Modal>
    </div>
  );
}

export function ProjectSections({ projectSections }: ProjectSectionsData) {
  return (
    <div>
      {projectSections
        .map((s) => <ProjectSection key={s.title} {...s} />)
        .slice(0, 1)}
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
