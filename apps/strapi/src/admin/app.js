import favicon from "./extensions/favicon.png";

const config = {
  config: {
    locales: ["en", "no"],
    head: {
      favicon: favicon,
    },
    translations: {
      en: {
        "Auth.form.welcome.title": "Helseatlas CMS",
        "Auth.form.welcome.subtitle": "Log in to manage and publish content",
      },
      no: {
        "Auth.form.welcome.title": "Helseatlas CMS",
        "Auth.form.welcome.subtitle":
          "Logg inn for å administrere og publisere innhold",
      },
    },
  },
  bootstrap: (app) => {
    console.log(app);
  },
};

export default config;
