import type { AppProps } from "next/app";
import "../styles/index.scss";

import "react-image-gallery/styles/scss/image-gallery.scss";

export default function Application({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
