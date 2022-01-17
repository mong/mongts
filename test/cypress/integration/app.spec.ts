describe("Navigation", () => {
  it("should navigate to the contact page", () => {
    // Start from the index page
    cy.visit("/");

    // Find multiple link with an href attribute containing "kontakt" and click them
    cy.get('a[href*="kontakt"]').click({ multiple: true });

    // The new url should include "/kontakt"
    cy.url().should("include", "/kontakt");

    // The page should include the 'h2' tag "Kontakt SKDE"
    cy.get("h2").contains("Kontakt SKDE");
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

  it("should navigate to pasientstrommer", () => {
    // Start from the index page
    cy.visit("/");

    // Find a link with an href attribute containing "pasientstrommer" and click it
    cy.get('a[href*="pasientstrommer"]').click();

    // The new url should include "/kontakt"
    cy.url().should("include", "/pasientstrommer");

    // The page should include the 'h2' tag "Kontakt SKDE"
    cy.get("h2").contains("Pasientstrømmer, Helse Nord RHF");
  });

  it("should navigate to personvern", () => {
    // Start from the index page
    cy.visit("/personvern");
  });
});

export {};
