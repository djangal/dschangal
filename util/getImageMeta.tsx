import path from "path";
import probe from "probe-image-size";
import * as fs from "fs";
import { ImgMeta } from "./content.model";

export async function getImageMeta(relativeUrls: string[]) {
  const result = new Array<ImgMeta>(relativeUrls.length);
  for (let i = 0; i < relativeUrls.length; i++) {
    const url = relativeUrls[i];
    const f = path.join(process.cwd(), "public", url);
    try {
      result[i] = await probe(fs.createReadStream(f));

      result[i].src = "/" + url;
    } catch (ex) {
      console.error(
        `Could not read ${f} (size: ${fs.statSync(f).size} bytes):`,
        ex
      );

      result[i] = { src: "/" + url };
    }
  }
  return result;
}
