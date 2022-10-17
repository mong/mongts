/// <reference types="cypress"/>

describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate to the contact page", () => {
    // Find multiple link with an href attribute containing "kontakt" and click them
    cy.get('a[href*="kontakt"]').click({ multiple: true });

    // The new url should include "/kontakt"
    cy.url().should("include", "/kontakt");

    // The page should include the 'h2' tag "Kontakt SKDE"
    cy.get("strong").contains("Telefon");
  });

  it("Enter kvalitetsregistre page", () => {
    // Enter "kvalitetsregistre" page
    cy.get('[data-testid="kvalitetsregistre_button"]').click();
    cy.get('[data-testid="MainRegister"]').should("exist"); // Menu exist
    cy.get('[data-testid="select_registry_button"]').click();
    cy.get('[placeholder="Søk etter register"]').type("hjerne");
  });

  it("should navigate to personvern page", () => {
    // Find a link with an href attribute containing "personvern" and click it
    cy.get('a[href*="personvern"]').click();

    // The new url should include "/personvern"
    cy.url().should("include", "/personvern");

    // Look for content
    cy.contains(
      "p",
      "SKDE følger samme behandling av personopplysninger som i"
    );
  });
});

export {};
