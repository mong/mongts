/// <reference types="cypress"/>

context("Testing of sykehusprofil page", () => {
  beforeEach(() => {
    cy.visit("/sykehusprofil/?selected_treatment_units=Tromsø");
  });
  it("Main page", () => {
    cy.viewport(1550, 1750);
    cy.get('[data-testid="hospital_profile_title_Tromsø"]').should("exist");
  });
});

export {};
