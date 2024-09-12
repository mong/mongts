/// <reference types="cypress"/>

context("Testing of behandlingskvalitet page", () => {
  beforeEach(() => {
    cy.visit("/behandlingskvalitet/?year=2023");
  });
  it("Main page", () => {
    cy.viewport(1550, 1750);
    cy.get('[data-testid="tu_header_Nasjonalt"]').should("exist"); // main page
    cy.get('[data-testid="indicatorrow_hjerneslag_inn_enhet"]').should("exist"); // indicator row
    cy.get('[data-testid="tab_caregiver"]').should("exist");
    cy.get('[data-testid="tab_resident"]').should("exist");
    cy.get('[data-testid="tab_resident"]').click();
    cy.get('[data-testid="indicatorrow_hjerneslag_inn_enhet"]').should(
      "not.exist",
    ); // indicator row
    cy.get('[data-testid="selected-filters-section-id-selectedfilters"]', {
      timeout: 60000,
    }).should("exist"); // Menu exist
    cy.get('[data-testid="TuneRoundedIcon"]').should("not.exist"); // Menu does not exist
    cy.viewport(550, 750);
    cy.get('[data-testid="TuneRoundedIcon"]').should("exist"); // Menu does not exist
  });
  it("Ablanor page", () => {
    cy.viewport(1550, 1750);
    cy.visit("/behandlingskvalitet/ablanor/?year=2023");
    cy.get('[data-testid="tu_header_Nasjonalt"]').should("exist"); // main page
    cy.get('[data-testid="indicatorrow_hjerneslag_inn_enhet"]').should(
      "not.exist",
    ); // indicator row
    cy.get('[data-testid="tab_caregiver"]').should("not.exist"); // tab does not exist
    cy.get('[data-testid="tab_resident"]').should("not.exist");
    cy.get('[data-testid="selected-filters-section-id-selectedfilters"]', {
      timeout: 60000,
    }).should("exist"); // Special menu exist
  });
});

export {};
