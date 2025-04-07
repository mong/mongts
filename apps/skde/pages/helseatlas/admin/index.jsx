"use client";

import React from "react";
import Script from "next/script";

const atlas = (lang) => {
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
    identifier_field: "filename",
    editor: {
      preview: false,
    },
    fields: [
      { label: "Filnavn", name: "filename", widget: "string" },
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
        label: "Forfatter",
        name: "forfatter",
        widget: "select",
        options: ["SKDE", "Helse Førde"],
      },
      {
        label: "Forsidebilde",
        name: "image",
        widget: "file",
        required: true,
        hint: "Må ha oppløsning på 609x406 pixler. Ikke bilde av stor størrelse.",
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
                    media_folder: "/apps/skde/public/helseatlas/kart",
                    public_folder: "",
                    hint: "Kartgrunnlag i geojson-format",
                    default: "kart_2024.geojson",
                    required: false,
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

const staticPages = (lang) => {
  return {
    label: lang === "no" ? "Statiske sider" : "Statiske engelske sider",
    name: lang === "no" ? "statiske_sider" : "statiske_sider_en",
    folder:
      lang === "no"
        ? "apps/skde/_posts/helseatlas/statisk"
        : "apps/skde/_posts/helseatlas/en/static",
    create: true,
    fields: [
      { label: "Filnavn", name: "filename", widget: "string" },
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

const config = {
  local_backend: true,
  backend: {
    name: "github",
    repo: "mong/mongts",
    branch: "main",
  },
  logo_url: "https://apps.skde.no/helseatlas/img/logos/helseatlas.svg",
  media_folder: "/apps/skde/public/helseatlas/img",
  public_folder: "/helseatlas/img",
  site_url: "https://apps.skde.no/helseatlas/",
  base_url: process.env.NEXT_PUBLIC_API_HOST ?? "https://prod-api.skde.org",
  locale: "nb_no",
  collections: [atlas("no"), staticPages("no"), atlas("en"), staticPages("en")],
};

export function CMS() {
  React.useEffect(() => {
    window.CMS_MANUAL_INIT = true;
  }, []);

  return (
    <>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        onLoad={() => {
          window.initCMS({ config });
        }}
      />
    </>
  );
}

export default CMS;
