import { ImgMeta } from "../components/project.model";
import path from "path";
import probe from "probe-image-size";
import * as fs from "fs";

export async function getImageMeta(relativeUrls: string[]) {
  const result = new Array<ImgMeta>(relativeUrls.length);
  for (let i = 0; i < relativeUrls.length; i++) {
    const url = relativeUrls[i];
    result[i] = await probe(
      fs.createReadStream(path.join(process.cwd(), "public", url))
    );

    result[i].src = "/" + url;
  }
  return result;
}
