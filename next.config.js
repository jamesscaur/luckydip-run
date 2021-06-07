module.exports = {
  publicRuntimeConfig: {
    siteMetaData: {
      name: "LuckyDip.run",
      url:
        process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/",
      title: "Welcome to LuckyDip.run",
      description: "Online lucky dips, powered by bitcoin.",
      // twitterHandle: "earvinpiamonte",
      // socialPreview: "/images/preview.png",
    },
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  future: {
    webpack5: true,
  },
};
