import type { Schema, Attribute } from "@strapi/strapi";

export interface FaktaboksFaktaboks extends Schema.Component {
  collectionName: "components_faktaboks_faktaboks";
  info: {
    displayName: "faktaboks";
    icon: "quote";
    description: "";
  };
  attributes: {
    overskrift: Attribute.String & Attribute.Required;
    tekst: Attribute.RichText;
  };
}

export interface ResultatboksResultatboks extends Schema.Component {
  collectionName: "components_resultatboks_resultatboks";
  info: {
    displayName: "resultatboks";
    icon: "chartPie";
    description: "";
  };
  attributes: {
    overskrift: Attribute.String & Attribute.Required;
    ingress: Attribute.RichText;
    publisert: Attribute.DateTime;
    oppdatert: Attribute.DateTime;
    utvalg: Attribute.RichText;
    data: Attribute.String;
    kart: Attribute.String;
    resultat: Attribute.RichText;
  };
}

export interface TekstTekst extends Schema.Component {
  collectionName: "components_tekst_teksts";
  info: {
    displayName: "tekst";
    icon: "file";
    description: "";
  };
  attributes: {
    beskrivelse: Attribute.String;
    tekst: Attribute.RichText;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "faktaboks.faktaboks": FaktaboksFaktaboks;
      "resultatboks.resultatboks": ResultatboksResultatboks;
      "tekst.tekst": TekstTekst;
    }
  }
}
