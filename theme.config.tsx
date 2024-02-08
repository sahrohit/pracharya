const config = {
  logo: <span>My Nextra Documentation</span>,
  project: {
    link: "https://github.com/sahrohit/pracharya",
  },
  docsRepositoryBase: "https://github.com/sahrohit/pracharya/tree/main",
  sidebar: {
    toggleButton: true,
  },
  footer: {
    text: (
      <div className="flex w-full justify-between gap-4 text-sm">
        <span>Copyright © {new Date().getFullYear()} </span>
        <a href="https://www.sahrohit.com.np/">
          Proudly made with love ❤️ by Rohit Sah
        </a>
      </div>
    ),
  },
};

export default config;
