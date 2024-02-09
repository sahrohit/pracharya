import type { Metadata } from "next";

const config: Metadata = {
  title: "Al Hamma Street Food & Coffee",
  description: "Al Hamma Street Food & Coffee",
  applicationName: "Al Hamma",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://alhamma.pt"),
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://alhamma.pt",
    siteName: "Al Hamma",
  },
};

export default config;
