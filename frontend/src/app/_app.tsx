import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// 👇 энд appWithTranslation-ээр wrap-лана
export default appWithTranslation(MyApp);
