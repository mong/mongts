describe("Navigation", () => {
  it("should navigate to the contact page", () => {
    // Start from the index page
    cy.visit("/");

    // Find multiple link with an href attribute containing "kontakt" and click them
    cy.get('a[href*="kontakt"]').click({ multiple: true });

    // The new url should include "/kontakt"
    cy.url().should("include", "/kontakt");

    // The page should include the 'h2' tag "Kontakt SKDE"
    cy.get("strong").contains("Telefon");
  });

  it("return error if navigating to kvalitetsregistre", () => {
    // Start from the index page
    cy.visit("/");

    // Find a link with an href attribute containing "kvalitetsregistre" (do not click it)
    cy.get('a[href*="kvalitetsregistre"]');

    // The url should return "404 This page could not be found."
    cy.request({ url: "/kvalitetsregistre", failOnStatusCode: false })
      .its("status")
      .should("equal", 404);
  });

  it("should navigate to personvern page", () => {
    // Start from the index page
    cy.visit("/");

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
