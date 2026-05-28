/// <reference types="cypress"/>

context("Testing of behandlingskvalitet page", () => {
  beforeEach(() => {
    cy.visit("behandlingskvalitetV2/?registries=hjerneslag&year=2024");
  });
  it("Main page", () => {
    cy.get('[data-testid="indicatorrow_hjerneslag_tromb_40min"]', {
      timeout: 4000,
    }).should("exist"); // indicator row for hjerneslag tromb 40min exists
    cy.get('[data-testid^="indicatorrow_"]', {
      timeout: 4000,
    }).should("exist"); // indicator row
  });
});

export {};
