/// <reference types="cypress"/>

// The tests are commented out because the front page now just redirects to FNSP

// context("Push some front page buttons", () => {
//   beforeEach(() => {
//     cy.visit("/helseatlas");
//   });

//   it("should visit v2 atlas", () => {
//     cy.get('[data-testid="helseatlas/v2/kronikere"]').click();
//     cy.get('[data-testid="v2atlas"]', { timeout: 60000 }).should("exist");
//     cy.url().should("include", "/v2");
//   });

//   it("should visit v1 atlas", () => {
//     cy.get('[data-testid="helseatlas/v2/dagkir"]').click();
//     cy.get('[data-testid="v2atlas"]', { timeout: 60000 }).should("exist");
//     cy.url().should("include", "/v2");
//   });

//   it("should push english button", () => {
//     cy.get('[data-testid="buttonEng"]').click(); // Push english button
//     cy.get('[data-testid="helseatlas/en/v2/kvalitet"]', {
//       timeout: 60000,
//     }).should("exist"); // Wait for english page to load
//     cy.url().should("include", "/en/");
//     cy.get("h1").contains("Equitable health services");
//     cy.get('[data-testid="menuButton"]').click(); // Enter english menu
//     cy.get('[data-testid="mainMenu"]').should("exist"); // Menu exist
//     cy.get('[data-testid="menuAtlasLink1"]').click(); // Enter an english atlas
//     cy.get('[data-testid="mainMenu"]').should("not.exist"); // Menu gone after click
//     cy.url({ timeout: 60000 }).should("include", "/en/v2/"); // English atlas is entered in english menu
//   });

//   it("should push menu button", () => {
//     cy.get('[data-testid="mainMenu"]').should("not.exist"); // Menu does not exist
//     cy.get('[data-testid="menuButton"]').click();
//     cy.get('[data-testid="mainMenu"]').should("exist"); // Menu exist

//     cy.get('[data-testid="menuAtlasLink1"]').click();
//     cy.get('[data-testid="mainMenu"]').should("not.exist"); // Menu gone after click

//     cy.get('[data-testid="menuButton"]').click(); // Push menu button again
//     cy.get('[data-testid="mainMenu"]').should("exist"); // Menu exist
//     cy.get('[data-testid="menuButton"]').type("{esc}"); // click Esc to exit menu
//     cy.get('[data-testid="mainMenu"]').should("not.exist"); // Menu gone after click
//   });
// });

export {};
