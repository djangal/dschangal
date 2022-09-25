import ReactMarkdown from "react-markdown";
import {
  ImgMeta,
  ProjectSectionData,
  ProjectSectionsData,
} from "./project.model";
import Head from "next/head";
import Image from "next/future/image";

import Application from "../pages/_app";
import { Parallax, parallaxFx } from "./parallax";
import ImgReel from "./img-reel";
import Modal from "./modal";

import ImageGallery from "react-image-gallery";
import { useEffect, useState } from "react";
import { extendWithImageMetaWeb } from "../util/extendWithImageMetaWeb";
import { extendWithImageMetaFake } from "../util/extendWithImageMetaFake";

export function ProjectSection(s: ProjectSectionData) {
  const [detailImage, setDetailImage] = useState<number | null>(null);
  return (
    <div className="projectSection">
      <h2>{s.title}</h2>
      <ImgReel images={s.galleryImagesMeta}>
        <Parallax config={parallaxFx.topBottomCoverImg}>
          <a
            style={{
              backgroundImage: `url(${s.coverImage})`,
              backgroundPositionY: `var(--bgpos)`,
            }}
            href={"#" + s.coverImage}
            className="coverImage"
            onClick={(ev) => {
              setDetailImage(0);
              ev.preventDefault();
            }}
          ></a>
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
                    setDetailImage(i + 1);
                    ev.preventDefault();
                  }}
                >
                  {img.width && img.height && (
                    <Image
                      src={img.src}
                      width={img.width}
                      height={img.height}
                      style={{
                        opacity: "var(--opacity)",
                        willChange: "opacity",
                      }}
                    />
                  )}
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
          items={[
            {
              original: s.coverImage,
              thumbnail: s.coverImage,
            },
            ...s.galleryImagesMeta.map((img) => ({
              original: img.src,
              thumbnail: img.src,
            })),
          ]}
        />
      </Modal>
    </div>
  );
}

export function ProjectSections({ projectSections }: ProjectSectionsData) {
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
  const inputData = entry.get("data").toObject();
  const [extendedData, setExtData] = useState<any>({});

  extendWithImageMetaFake(inputData);
  useEffect(() => {
    const extData = { ...inputData };
    extendWithImageMetaWeb(extData).then(() => {
      setExtData(extData);
    });
  }, [entry]);
  console.log(
    "ProjectSectionPreview",
    entry.toObject(),
    inputData,
    extendedData
  );
  return (
    <Application
      Component={Wrapper}
      pageProps={{
        Component: ProjectSection,
        pageProps: { ...inputData, ...extendedData },
      }}
      router={null}
    />
  );
};
