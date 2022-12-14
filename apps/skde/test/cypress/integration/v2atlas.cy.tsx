/// <reference types="cypress"/>

context("v2 atlas", () => {
  before(() => {
    cy.visit("/helseatlas/v2/test_atlas");
  });

  it("Simple start", () => {
    cy.visit("/helseatlas/v2/test_atlas");
    cy.get("h1").contains("Testatlas (ikke publiser)");
    cy.get('[data-testid="tocItem"]:visible').click(5, 5); // Click ToC element
    cy.url().should("include", "ms-syke-barn-under"); // Check url change
  });

  it("Test expansion of result box", () => {
    cy.visit("/helseatlas/v2/test_atlas");
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.lt", 600); // Check if result box is not expanded
    cy.get('[data-testid="resultbox_expandButton"]').click(); // Open the result box
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.gt", 600); // Check if result box is expanded
    cy.get('[data-testid="resultbox_expandButton"]').click(); // Close the result box by click on button
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.lt", 600); // Check if result box is not expanded
    cy.get('[data-testid="resultbox_ingress"]').click(); // Open the result box by click on text
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.gt", 600); // Check if result box is expanded
    cy.get('[data-testid="resultbox_ingress"]').click(); // Close the result box by click on text
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.lt", 600); // Check if result box is not expanded
  });
  it("Test the selection popup inside result box", () => {
    cy.visit("/helseatlas/v2/test_atlas");
    cy.get('[data-testid="resultbox_ingress"]').click(); // Open the result box by click on text
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.gt", 600); // Check if result box is expanded

    cy.get('[data-testid="selectionBtn"]').click(); // Open the selection popup
    cy.get('[data-testid="popUpContent"]').should("exist"); // Popup exist
    cy.get('[data-testid="closeBtn"]').click(); // Close the popup
    cy.get('[data-testid="popUpContent"]').should("not.exist"); // Popup does not exist

    cy.get('[data-testid="selectionBtn"]').click(); // Open the selection popup
    cy.get('[data-testid="popUpContent"]').should("exist"); // Popup exist
    cy.get("body").click(0, 0); // Close the popup by click outside
    cy.get('[data-testid="popUpContent"]').should("not.exist"); // Popup does not exist
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.gt", 600); // Check if result box is still expanded

    cy.get('[data-testid="selectionBtn"]').click(); // Open the selection popup
    cy.get('[data-testid="popUpContent"]').should("exist"); // Popup exist
    cy.get('[data-testid="selectionBtn"]').type("{esc}"); // Close the popup by click Esc
    cy.get('[data-testid="popUpContent"]').should("not.exist"); // Popup does not exist
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.gt", 600); // Check if result box is still expanded

    cy.get('[data-testid="resultbox_ingress"]').click(); // Close the result box
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.lt", 600); // Check if result box is not expanded
  });

  it(" Test the carousel", () => {
    cy.visit("/helseatlas/v2/test_atlas");
    cy.get('[data-testid="resultbox_ingress"]').click(); // Expand the result box
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.gt", 600); // Check if result box is expanded

    cy.get('[label="barchart"]').should("exist"); // Barchart exist
    cy.get('[label="map"]').should("not.exist"); // Map does not exist
    cy.get('[label="table"]').should("not.exist"); // Table does not exist

    cy.get('[data-testid="carouselbutton_1"]').click(); // Show the second barchart
    cy.get('[label="barchart"]').should("exist"); // Barchart exist
    cy.get('[label="map"]').should("not.exist"); // Map does not exist
    cy.get('[label="table"]').should("not.exist"); // Table does not exist

    cy.get('[data-testid="carouselbutton_2"]').click(); // Show the table
    cy.get('[label="table"]').should("exist"); // Table exist
    cy.get('[label="barchart"]').should("not.exist"); // Barchart does not exist
    cy.get('[label="map"]').should("not.exist"); // Map does not exist
    cy.get("caption").contains("gjennomsnittsverdier for perioden");
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(3)").contains(
      "812"
    );
    cy.get("span").contains("Pasienter").click(); // Sort table
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(3)").contains(
      "368"
    );
    cy.get("span").contains("Pasienter").click(); // Sort table again
    cy.get(".MuiTableBody-root > :nth-child(1) > :nth-child(3)").contains(
      "173"
    );

    cy.get('[data-testid="carouselbutton_3"]').click(); // Show the map
    cy.get('[label="map"]').should("exist"); // Map exist
    cy.get('[label="table"]').should("not.exist"); // Table does not exist
    cy.get('[label="barchart"]').should("not.exist"); // Barchart does not exist
    cy.get('[data-testid="mapCaption"]').contains("Antall med epilepsi pr.");

    cy.get('[data-testid="carouselbutton_0"]').click(); // Show the first barchart
    cy.get('[label="barchart"]').should("exist"); // Barchart exist
    cy.get('[label="map"]').should("not.exist"); // Map does not exist
    cy.get('[label="table"]').should("not.exist"); // Table does not exist

    cy.get('[data-testid="resultbox_ingress"]').click(); // Close the result box
    cy.get('[data-testid="resultbox"]').invoke("height").should("be.lt", 600); // Check if result box is not expanded
  });

  it("Test expansion of fact box", () => {
    cy.visit("/helseatlas/v2/test_atlas");
    cy.get('[data-testid="factbox"]').invoke("height").should("be.lt", 100);
    cy.get('[data-testid="factbox"]').click();
    cy.get('[data-testid="factbox"]').invoke("height").should("be.gt", 200);
    cy.get(
      '[id="ms-syke-barn-under-fødsel-fact-svangeskapsdiabetes-header"]'
    ).click();
    cy.get('[data-testid="factbox"]').invoke("height").should("be.lt", 100);
  });

  it("Test select HF", () => {
    cy.visit("/helseatlas/v2/test_atlas");
    cy.get('[data-testid="circle_UNN_selected"]').should("not.exist");
    cy.get('[data-testid="rect_UNN_selected"]').should("not.exist");
    cy.visit("/helseatlas/v2/test_atlas?bohf=UNN");
    cy.get('[data-testid="circle_UNN_selected"]').should("exist");
    cy.get('[data-testid="circle_UNN_selected"]').should("be.visible");
    cy.get('[data-testid="rect_UNN_selected"]').should("exist");
    cy.get('[data-testid="rect_UNN_selected"]').should("not.be.visible");
    cy.get('[data-testid="circle_UNN_selected"]').click();
    cy.get('[data-testid="rect_UNN_selected"]').should("be.visible");
    cy.get('[data-testid="rect_UNN_selected"]').click();
    cy.get('[data-testid="circle_UNN_selected"]').should("not.exist");
    cy.get('[data-testid="rect_UNN_selected"]').should("not.exist");
    cy.get('[data-testid="rect_UNN_unselected"]').click();
    cy.get('[data-testid="rect_UNN_selected"]').should("exist");
    cy.get('[data-testid="circle_UNN_selected"]').should("exist");
    cy.get('[data-testid="circle_OUS_unselected"]').should("exist");
    cy.get('[data-testid="rect_OUS_unselected"]').click();
    cy.get('[data-testid="circle_UNN_selected"]').should("exist");
    cy.get('[data-testid="circle_OUS_selected"]').should("exist");
    cy.get('[data-testid="carouselbutton_2"]').click(); // Show the table
    cy.get('[data-testid="tablerow_UNN"]').should("have.class", "Mui-selected");
    cy.get('[data-testid="tablerow_OUS"]').should("have.class", "Mui-selected");
    cy.get('[data-testid="tablerow_Telemark"]').should(
      "not.have.class",
      "Mui-selected"
    );
    cy.get('[data-testid="tablerow_Telemark"]').click();
    cy.get('[data-testid="tablerow_Telemark"]').should(
      "have.class",
      "Mui-selected"
    );
    cy.get('[data-testid="carouselbutton_3"]').click(); // Show the map
    cy.get('[data-testid="maphf_UNN"]')
      .get('[fill="rgba(3, 63, 133, 0.8)"]')
      .should("exist");
    cy.get('[data-testid="maphf_Telemark"]')
      .get('[fill="rgba(171, 108, 166, 0.75)"]')
      .should("exist");
    cy.get('[data-testid="maphf_UNN"]').click();
    cy.get('[data-testid="maphf_UNN"]')
      .get('[fill="rgba(171, 108, 166, 0.75)"]')
      .should("exist");
    cy.get('[data-testid="maphf_Telemark"]').click();
    cy.get('[data-testid="maphf_Telemark"]')
      .get('[fill="rgba(3, 63, 133, 0.8)"]')
      .should("exist");
  });

  it("Test english test atlas", () => {
    cy.visit("/helseatlas/en/v2/test_atlas");
    cy.get('[data-testid="resultbox_expandButton"]').click(); // Open the result box
    cy.get('[data-testid="rect_UNN_unselected"]').click();
    cy.get('[data-testid="rect_UNN_selected"]').should("exist");
    cy.get('[data-testid="circle_UNN_selected"]').should("exist");
    cy.get('[data-testid="carouselbutton_3"]').click(); // Show the map
    cy.get('[label="map"]').should("exist"); // Map exist
    cy.get('[data-testid="mapCaption"]').contains(
      "Number of epilepsy patients per 1,000 inhabitants"
    );
    cy.get('[data-testid="carouselbutton_2"]').click(); // Show the table
    cy.get('[label="table"]').should("exist"); // Table exist
    cy.get("caption").contains("Average per year for the period ");
    cy.get('[data-testid="carouselbutton_1"]').click(); // Show the second barchart
    cy.get('[label="barchart"]').should("exist"); // Barchart exist
    cy.get('[label="map"]').should("not.exist"); // Map does not exist
    cy.get('[label="table"]').should("not.exist"); // Table does not exist
  });
});

export {};
