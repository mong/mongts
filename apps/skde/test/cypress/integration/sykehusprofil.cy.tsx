/// <reference types="cypress"/>

context("Testing of sykehusprofil page", () => {
  beforeEach(() => {
    cy.visit("/sykehusprofil");
  });
  it("Main page", () => {
    cy.viewport(1550, 1750);
    cy.get('[data-testid="hospital_profile_box_Nasjonalt"]').should("exist");
    cy.get('[data-testid="subunit_button_Helse Nord RHF"]').click();
    cy.get('[data-testid="hospital_profile_box_Nasjonalt"]').should(
      "not.exist",
    );
  });
});

export {};
