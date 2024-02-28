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
        "list.asset.at.finished": "The assets have finished loading.",
        "view-switch.list": "List View",
        "upload.modal.upload-list.sub-header.add-folder": "Add folder",
        "global.localeToggle.label": "Select interface language",
        "header.actions.add-assets": "Add new assets",
      },
      no: {
        "Auth.form.welcome.title": "Helseatlas CMS",
        "Auth.form.welcome.subtitle":
          "Logg inn for å administrere og publisere innhold",
        "atlas-editor.plugin.name": "Helseatlas",
        "list.asset.at.finished": "Ressursene er ferdig lastet.",
        "view-switch.list": "Listevisning",
        "upload.modal.upload-list.sub-header.add-folder": "Legg til mappe",
        "global.localeToggle.label": "Velg grensesnittspråk",
        "header.actions.add-assets": "Legg til nye ressurser",
      },
    },
    tutorials: false,
  },
  bootstrap: (app) => {
    console.log(app);
  },
};

export default config;
