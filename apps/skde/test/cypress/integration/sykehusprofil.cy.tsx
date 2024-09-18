/// <reference types="cypress"/>

context("Testing of sykehusprofil page", () => {
  beforeEach(() => {
    cy.visit("/sykehusprofil");
  });
  it("Main page", () => {
    cy.viewport(1550, 1750);
    cy.get('[data-testid="hospital_profile_box_Nasjonalt"]').should("exist");
    cy.get('[data-testid="LocalHospitalIcon"]').click({ multiple: true });
    cy.get('[data-testid="hospital_profile_box_Nasjonalt"]').should(
      "not.exist",
    );
  });
});

export {};
