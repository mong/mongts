import { CmsConfig } from "netlify-cms-core";

export const config: CmsConfig = {
  local_backend: true,
  backend: {
    name: "github",
    repo: "mong/mongts",
    branch: "main",
    base_url: "https://qa-mong-api.skde.org",
  },
  media_folder: "public/img",
  site_url: "https://www.skde.no",
  public_folder: "img",
  collections: [
    {
      label: "Aktuelt",
      name: "aktuelt",
      folder: "apps/skde/_posts/aktuelt",
      create: true,
      fields: [
        { label: "Publiseringsdato", name: "date", widget: "datetime" },
        { label: "Tittel", name: "title", widget: "string" },
        { label: "Ingress", name: "ingress", widget: "text" },
        { label: "Hovedtekst", name: "body", widget: "markdown" },
        { label: "Artikkelbilde", name: "thumbnail", widget: "image" },
      ],
    },
    {
      label: "Innhold",
      name: "innhold",
      folder: "apps/skde/_posts/innhold",
      create: true,
      identifier_field: "filename",
      fields: [
        { label: "Filnavn", name: "filename", widget: "string" },
        { label: "Tittel", name: "title", widget: "string" },
        { label: "Ingress", name: "ingress", widget: "text" },
        { label: "Hovedtekst", name: "body", widget: "markdown" },
      ],
    },
  ],
};
