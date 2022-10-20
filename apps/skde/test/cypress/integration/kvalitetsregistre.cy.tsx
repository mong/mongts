/// <reference types="cypress"/>

context("Testing of kvalitetsregistre page", () => {
  beforeEach(() => {
    cy.visit("/kvalitetsregistre/alle/sykehus");
  });

  it("Main page", () => {
    cy.get('[data-testid="MainRegister"]').should("exist"); // main page
  });

  it("Enter kvalitetsregistre page", () => {
    // Enter menu for picking registry
    cy.get('[data-testid="select_registry_button"]').click();
    cy.get('[data-testid="pick_registry_all"]').should("exist");
    cy.get('[data-testid="registry_search_input"]').should("exist");
    cy.get('[data-testid="registry_search_input"]').type("hjerne");
    cy.get('[data-testid="pick_registry_all"]').should("be.visible");
    // Close menu
    cy.get('[data-testid="pick_registry_close_button"]').click();
    // Reopen menu
    cy.get('[data-testid="select_registry_button"]').click();
    // The typed text is still there
    cy.get('[value="hjerne"]').should("exist");
    cy.get('[data-testid="pick_registry_hjerneslag"]').click();
    cy.url().should("include", "hjerneslag");
  });
});

export {};
