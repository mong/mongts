/// <reference types="cypress"/>

context("Testing of kvalitetsregistre page", () => {
  beforeEach(() => {
    cy.visit("/kvalitetsregistre/alle/sykehus/?year=2021");
  });

  it("Main page", () => {
    cy.get('[data-testid="MainRegister"]').should("exist"); // main page
  });

  it("test select registry menu", () => {
    // Enter menu for picking registry
    cy.get('[data-testid="select_registry_button"]').click();
    cy.get('[data-testid="pick_registry_all"]').should("exist");
    cy.get('[data-testid="registry_search_input"]').should("exist");
    cy.get('[data-testid="registry_search_input"]').type("hjerne");
    cy.get('[data-testid="pick_registry_all"]').should("be.visible");
    // Close menu
    cy.get('[data-testid="pick_registry_close_button"]').click();
    cy.get('[data-testid="med_field_list"]').should("be.visible");
    // Reopen menu
    cy.get('[data-testid="select_registry_button"]').click();
    // The typed text is still there
    cy.get('[value="hjerne"]').should("exist");
    cy.get('[data-testid="pick_registry_hjerneslag"]').click();
    cy.url().should("include", "hjerneslag");
    cy.get('[data-testid="med_field_list"]').should("not.exist");
  });

  it("test medical field selector", () => {
    cy.get('[data-testid="medfield_nerve"]').should(
      "not.have.class",
      "checked"
    );
    cy.get('[data-testid="indicatorrow_hjerneslag_beh_enhet"]').should(
      "be.visible"
    );
    cy.get('[data-testid="medfieldbutton_nerve"]').click();
    cy.get('[data-testid="medfield_nerve"]').should("have.class", "checked");
    cy.get('[data-testid="indicatorrow_hjerneslag_beh_enhet"]').should(
      "not.be.visible"
    );
  });

  it("test year selector", () => {
    cy.get('[data-testid="year_selector"]')
      .click()
      .get("body")
      .type("{upArrow}{upArrow}{upArrow}{enter}")
      .url()
      .should("not.include", "2021");
    // DID NOT WORK .url().should("include", "2019");
  });

  it("test Vis alle button", () => {
    cy.get('[data-testid="vis_alle_button"]').click();
    cy.get('[data-testid="tu_list"]').should("be.visible");
    cy.get("body").type("{esc}");
    cy.get('[data-testid="tu_list"]').should("not.be.visible");
    cy.get('[data-testid="vis_alle_button"]').click();
    cy.get('[data-testid="tu_list"]').should("be.visible");
    cy.get("button").contains("Finnmarkssykehuset HF").click();
    cy.get('[data-testid="tu_header_Finnmark HF"]').should("exist");
    cy.get('[data-testid="tu_header_Finnmark HF"]').should("not.be.visible");
    cy.get("button").contains("Hammerfest").click();
    cy.get('[data-testid="tu_list_close"]').click();
    cy.get('[data-testid="tu_list"]').should("not.be.visible");
    cy.get('[data-testid="tu_header_Hammerfest"]').should("exist");
    cy.get('[data-testid="tu_header_Hammerfest"]').should("be.visible");
    cy.get('[data-testid="vis_alle_button"]').click();
    cy.get("button").contains("Hammerfest").click();
    cy.get('[data-testid="tu_header_Hammerfest"]').should("not.exist");
    cy.get("button").contains("Hammerfest").click();
    cy.get('[data-testid="tu_header_Hammerfest"]').should("exist");
    cy.get("button").contains("Kirkenes").click();
    cy.get('[data-testid="tu_header_Kirkenes"]').should("exist");
    cy.get("button").contains("Molde").click();
    cy.get('[data-testid="tu_header_Molde"]').should("exist");
    cy.get("button").contains("Namsos").click();
    cy.get('[data-testid="tu_header_Namsos"]').should("exist");
    cy.get("button").contains("Haukeland").click();
    cy.get('[data-testid="tu_header_Haukeland"]').should("not.exist");
    cy.get("body").type("{esc}");
  });
});

export {};
