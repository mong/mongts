import { CmsCollection, CmsConfig, CmsField } from "netlify-cms-core";

const filename: CmsField = {
  label: "Filnavn",
  name: "filename",
  widget: "string",
};

const atlas = (lang: "no" | "en"): CmsCollection => {
  return {
    label: lang === "no" ? "Atlas" : "Engelske atlas",
    name: lang === "no" ? "atlas" : "atlas_eng",
    sortable_fields: ["date", "publisert", "mainTitle"],
    folder:
      lang === "no"
        ? "apps/skde/_posts/helseatlas/atlas"
        : "apps/skde/_posts/helseatlas/en/atlas",
    extension: "json",
    format: "json",
    create: true,
    delete: false,
    media_folder:
      lang === "no"
        ? "/apps/skde/public/helseatlas/img/no/{{filename}}"
        : "/apps/skde/public/helseatlas/img/en/{{filename}}",
    public_folder:
      lang === "no"
        ? "/helseatlas/img/no/{{filename}}"
        : "/helseatlas/img/en/{{filename}}",
    identifier_field: "shortTitle",
    editor: {
      preview: false,
    },
    fields: [
      filename,
      {
        label: "Publisert på forsiden",
        name: "publisert",
        widget: "boolean",
        default: false,
        hint: "Atlaset legges på forsiden av skde.no/helseatlas hvis «Publisert på forsiden» er huket av.",
      },
      {
        label: "Publiseringsdato",
        name: "date",
        widget: "datetime",
      },
      {
        label: "Tittel",
        name: "mainTitle",
        widget: "string",
      },
      {
        label: "Kort tittel",
        name: "shortTitle",
        widget: "string",
      },
      {
        label: "Forsidebilde",
        name: "image",
        widget: "file",
        required: true,
      },
      {
        label: "Forsidetekst",
        name: "frontpagetext",
        widget: "string",
        required: true,
      },
      {
        label: "Ingress",
        name: "ingress",
        widget: "markdown",
      },
      {
        label: "Språk",
        name: "lang",
        widget: "select",
        options: ["nb", "nn", "en"],
        default: lang === "no" ? "nb" : "en",
      },
      {
        label: "Kapittel",
        name: "kapittel",
        widget: "list",
        fields: [
          {
            label: "Overskrift",
            name: "overskrift",
            widget: "string",
            required: false,
          },
          {
            label: "Innhold",
            name: "innhold",
            widget: "list",
            hint: "Selve innholdet i atlaset",
            types: [
              {
                label: "Tekst",
                name: "tekst",
                widget: "object",
                summary: "{{fields.beskrivelse}}",
                fields: [
                  {
                    label: "Beskrivelse",
                    name: "beskrivelse",
                    widget: "string",
                    hint: "Kort beskrivelse, som kun vises som overskrift her (vil ikke vises på nettsiden).",
                    required: false,
                  },
                  {
                    label: "Tekst",
                    name: "tekst",
                    widget: "markdown",
                    hint: "Seksjon med tekst og eventuelle statiske figurer",
                  },
                ],
              },
              {
                label: "Faktaboks",
                name: "faktaboks",
                widget: "object",
                summary: "{{fields.overskrift}}",
                fields: [
                  {
                    label: "Overskrift",
                    name: "overskrift",
                    widget: "string",
                    hint: "Overskrift som vises på siden når resten av teksten er skjult",
                  },
                  {
                    label: "Tekst",
                    name: "tekst",
                    widget: "markdown",
                    hint: "Faktabokstekst som i utgangspunktet er skjult men kan trykkes frem av bruker.",
                  },
                ],
              },
              {
                label: "Resultatboks",
                name: "resultatboks",
                widget: "object",
                summary: "{{fields.overskrift}}",
                fields: [
                  {
                    label: "Overskrift",
                    name: "overskrift",
                    widget: "string",
                  },
                  {
                    label: "Ingress",
                    name: "ingress",
                    widget: "markdown",
                  },
                  {
                    label: "Publiseringsdato",
                    name: "publisert",
                    widget: "datetime",
                  },
                  {
                    label: "Sist oppdatert",
                    name: "oppdatert",
                    widget: "datetime",
                  },
                  {
                    label: "Karusell",
                    name: "data",
                    widget: "file",
                    media_folder:
                      "/apps/skde/public/helseatlas/data/{{filename}}",
                    public_folder: "",
                    hint: "Datafil, i json-format, som inneholder definisjon av karusell",
                  },
                  {
                    label: "Kartgrunnlag",
                    name: "kart",
                    widget: "file",
                    media_folder: "/apps/skde/public/helseatlas/data/kart",
                    public_folder: "",
                    hint: "Kartgrunnlag i geojson-format",
                    default: "kronikere.geojson",
                  },
                  {
                    label: "Utvalgsbeskrivelse",
                    name: "utvalg",
                    widget: "markdown",
                  },
                  {
                    label: "Resultatbeskrivelse",
                    name: "resultat",
                    widget: "markdown",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
};

const staticPages = (lang: "no" | "en"): CmsCollection => {
  return {
    label: lang === "no" ? "Statiske sider" : "Statiske engelske sider",
    name: lang === "no" ? "statiske_sider" : "statiske_sider_en",
    folder:
      lang === "no"
        ? "apps/skde/_posts/helseatlas/statisk"
        : "apps/skde/_posts/helseatlas/en/static",
    create: true,
    fields: [
      filename,
      {
        label: "Tittel",
        name: "title",
        widget: "string",
      },
      {
        label: "Hovedtekst",
        name: "body",
        widget: "markdown",
      },
      {
        label: "Språk",
        name: "lang",
        widget: "select",
        options: ["nb", "nn", "en"],
        default: lang === "no" ? "nb" : "en",
      },
    ],
  };
};

export const config: CmsConfig = {
  local_backend: true,
  backend: {
    name: "github",
    repo: "mong/mongts",
    branch: "main",
    base_url:
      process.env.NEXT_PUBLIC_API_HOST ?? "https://prod-mong-api.skde.org",
  },
  logo_url: "https://www.skde.no/helseatlas/img/logos/helseatlas.svg",
  media_folder: "/apps/skde/public/helseatlas/img",
  public_folder: "/helseatlas/img",
  site_url: "https://www.skde.no/helseatlas/",
  locale: "nb_no",
  collections: [atlas("no"), staticPages("no"), atlas("en"), staticPages("en")],
};
