import type { AppProps } from "next/app";
import '../styles/index.scss'

export default function Application({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
