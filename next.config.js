module.exports = {
  publicRuntimeConfig: {
    siteMetaData: {
      name: "LuckyDip.run - BSV Lucky Dip",
      url:
        process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/",
      title: "Welcome to LuckyDip.run!",
      description: "Lucky dips with a modern spin!",
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
