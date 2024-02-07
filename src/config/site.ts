import { env } from "@/env.js";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    email: string;
  };
};

const siteConfig: SiteConfig = {
  name: "WebTechSubs",
  description:
    "Embark on your digital transformation journey with WebTechSubs, where web development meets excellence! 🚀 Discover tailored websites that resonate with your brand and captivate your audience. Our affordable monthly plans, curated for small businesses, offer a spectrum of features to unleash your online potential.",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.webp`,
  links: {
    email: "mailto:webtechsubs@gmail",
  },
  mailSupport: "webtechsubs@gmail.com",
};

export default siteConfig;
