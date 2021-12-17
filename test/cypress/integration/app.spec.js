describe("Navigation", () => {
  it("should navigate to the contact page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find multiple link with an href attribute containing "kontakt" and click them
    cy.get('a[href*="kontakt"]').click({ multiple: true });

    // The new url should include "/kontakt"
    cy.url().should("include", "/kontakt");

    // The page should include the 'h2' tag "Kontakt SKDE"
    cy.get("h2").contains("Kontakt SKDE");
  });
});
