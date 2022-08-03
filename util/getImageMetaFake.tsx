import browserImageSize from "browser-image-size";

export function getImageMetaWeb(relativeUrls: string[]) {
  return Promise.all(
    relativeUrls.map(async (url) => {
      const s = (await browserImageSize(url)) ?? {};

      return { ...s, src: "/" + url };
    })
  );
}

export function getImageMetaFake(relativeUrls: string[]) {
  return relativeUrls.map((url) => ({ src: "/" + url }));
}
