/// <reference types="cypress"/>

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("/helseatlas");
  });

  it("should render the home page", () => {
    cy.get("h1").contains("Likeverdige helsetjenester – uansett hvor du bor?");
    cy.contains("a").click();
  });

  it("should visit static pages", () => {
    cy.visit("/helseatlas/statisk/kart");
    cy.get("strong").contains(
      "Vær derfor bevisst kartets retoriske muligheter."
    );
    cy.visit("/helseatlas/statisk/om");
    cy.get("a").contains("Om statistikkformidling ved hjelp av kart");
    cy.visit("/helseatlas/statisk/kontakt");
    cy.get("a").contains("skde.helseatlas@helse-nord.no");
    cy.visit("/helseatlas/en/static/map");
    cy.get("h1").contains("Communicating statistics by means of maps");
    cy.visit("/helseatlas/en/static/about");
    cy.get("a").contains("Communicating statistics by means of maps");
    cy.visit("/helseatlas/en/static/contact");
    cy.get("a").contains("skde.helseatlas@helse-nord.no");
  });
});

context("Classic atlases", () => {
  beforeEach(() => {
    cy.visit("/helseatlas");
  });

  it("should visit an atlas", () => {
    cy.visit("/helseatlas/v1/kvalitet");
    cy.get("h1").contains("Helseatlas for kvalitet");
    /* Go into the ToC */
    cy.get("nav").get("ol").get("li").get("a").contains("Brystkreft").click();
  });

  it("should visit an IA", () => {
    cy.visit("/helseatlas/v1/gyn/ia");
    cy.get("iframe");
    cy.visit("/helseatlas/ia/no/gyn/index.html")
      .get("button")
      .contains("Last ned data");
  });

  it("should visit an atlas without ToC", () => {
    cy.visit("/helseatlas/v1/psyk");
    cy.get("h1").contains("Helseatlas for psykisk helsevern og rusbehandling");
    cy.get("nav").get("ol").get("li");
  });

  it("should visit an English atlas", () => {
    cy.visit("/helseatlas/en/v1/kvalitet");
    cy.get("h1").contains("Healthcare Quality Atlas");
    /* Go into the ToC */
    cy.get("nav").get("ol").get("li").get("a").contains("Stroke");
  });
});

export {};
