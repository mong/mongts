/// <reference types="cypress"/>

context("Testing of behandlingskvalitet page", () => {
  beforeEach(() => {
    cy.visit("behandlingskvalitet/?registries=hjerneslag");
  });
  it("Main page", () => {
    
    cy.get('[data-testid="IndicatorTable"]').should("exist")
    
    // Test that the medical field pop up works
    cy.get('[data-testid="MedicalFieldPopUpButton"]').should("exist");
    cy.get('[data-testid="MedicalFieldPopUpButton"]').click();
    cy.get('[data-testid="MedicalFieldPopUp"]').should("exist");
    cy.get('[data-testid="MedicalFieldPopUpSubmit"').click()

    // Test that the treatment unit popup works
    cy.get('[data-testid="TreatmentUnitPopUpButton"]').should("exist");
    cy.get('[data-testid="TreatmentUnitPopUpButton"]').click();
    cy.get('[data-testid="TreatmentUnitPopUp"]').should("exist");
    cy.get('[data-testid="TreatmentUnitPopUpSubmit"').click()
  });
});

export {};
