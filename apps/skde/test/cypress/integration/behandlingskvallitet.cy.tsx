/// <reference types="cypress"/>

context("Testing of behandlingskvalitet page", () => {
  beforeEach(() => {
    cy.visit("behandlingskvalitet/?registries=hjerneslag&year=2024");
  });
  it("Main page", () => {
    cy.get('[data-testid="indicatorrow_hjerneslag_beh_enhet"]', {
      timeout: 4000,
    }).should("exist"); // indicator row for "Andel behandlet i slagenhet" exists
    cy.get('[data-testid^="indicatorrow_"]', {
      timeout: 4000,
    }).should("exist"); // indicator row
  });
});

export {};
