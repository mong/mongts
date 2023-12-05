import favicon from "./extensions/favicon.ico";

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
        "atlas-editor.plugin.name": "Helseatlas",
      },
      no: {
        "Auth.form.welcome.title": "Helseatlas CMS",
        "Auth.form.welcome.subtitle":
          "Logg inn for å administrere og publisere innhold",
        "atlas-editor.plugin.name": "Helseatlas",
      },
    },
    tutorials: false,
  },
  bootstrap: (app) => {
    console.log(app);
  },
};

export default config;
