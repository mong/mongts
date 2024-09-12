/// <reference types="cypress"/>

context("Testing of behandlingskvalitet page", () => {
  beforeEach(() => {
    cy.visit("/behandlingskvalitet/?year=2023");
  });
  it("Main page", () => {
    cy.viewport(1550, 1750);
    cy.get('[data-testid="tu_header_Nasjonalt"]').should("exist"); // main page
    cy.get('[data-testid="indicatorrow_hjerneslag_inn_enhet"]').should("exist"); // indicator row
  });
});

export {};
