/// <reference types="cypress"/>

context("Testing of kvalitetsregistre page", () => {
  beforeEach(() => {
    cy.visit("/kvalitetsregistre/alle/sykehus/?year=2021");
  });

  it("Main page", () => {
    cy.get('[data-testid="MainRegister"]').should("exist"); // main page
  });

  it("test select registry menu", () => {
    // Enter popup menu for picking registry
    cy.get('[data-testid="select_registry_button"]').click();
    cy.get('[data-testid="pick_registry_all"]').should("exist");
    cy.get('[data-testid="registry_search_input"]').should("exist");
    // Enter text in search box
    cy.get('[data-testid="registry_search_input"]').type("hjerne");
    cy.get('[value="hjerne"]').should("exist");
    cy.get('[data-testid="pick_registry_all"]').should("be.visible");
    // Close menu
    cy.get('[data-testid="pick_registry_close_button"]').click();
    cy.get('[data-testid="med_field_list"]').should("be.visible");
    // Reopen menu
    cy.get('[data-testid="select_registry_button"]').click();
    // The typed text is still there
    cy.get('[value="hjerne"]').should("exist");
    // Pick hjerneslag registry
    cy.get('[data-testid="pick_registry_hjerneslag"]').click();
    cy.url().should("include", "hjerneslag");
    // Medical field list should not exist when on specific registry page
    cy.get('[data-testid="med_field_list"]').should("not.exist");
  });

  it("test medical field selector", () => {
    cy.get('[data-testid="medfield_nerve"]').should(
      "not.have.class",
      "checked"
    );
    cy.get('[data-testid="indicatorrow_hjerteinfarkt_reper_stemi"]').should(
      "be.visible"
    );
    // Click nerve medical field
    cy.get('[data-testid="medfieldbutton_nerve"]').click();
    cy.get('[data-testid="medfield_nerve"]').should("have.class", "checked");
    cy.get('[data-testid="indicatorrow_hjerteinfarkt_reper_stemi"]').should(
      "not.be.visible"
    );
  });

  it("test year selector", () => {
    cy.url().should("not.include", "year");
    // Click year selector field, press up arrow, and then enter
    // should pick a year, thus get ?year=<YEAR> in url
    cy.get('[data-testid="year_selector"]')
      .click()
      .get("body")
      .type("{upArrow}{upArrow}{enter}");
    cy.get('[data-testid="year_selector"]')
      .click()
      .get("body")
      .type("{upArrow}{upArrow}{enter}")
      .url()
      .should("include", "year");
  });

  it("test Vis alle button", () => {
    // Click "show all units" button
    cy.get('[data-testid="vis_alle_button"]').click();
    cy.get('[data-testid="tu_list"]').should("be.visible");
    // Close popup by pressing Esc button
    cy.get("body").type("{esc}");
    cy.get('[data-testid="tu_list"]').should("not.be.visible");
    cy.get('[data-testid="vis_alle_button"]').click();
    cy.get('[data-testid="tu_list"]').should("be.visible");
    // Pick a unit
    cy.get("button").contains("Finnmarkssykehuset HF").click();
    cy.get('[data-testid="tu_header_Finnmark HF"]').should("exist");
    cy.get('[data-testid="tu_header_Finnmark HF"]').should("not.be.visible");
    // Pick another unit
    cy.get("button").contains("Hammerfest").click();
    cy.get('[data-testid="tu_list_close"]').click();
    cy.get('[data-testid="tu_list"]').should("not.be.visible");
    cy.get('[data-testid="tu_header_Hammerfest"]').should("exist");
    cy.get('[data-testid="vis_alle_button"]').click();
    // Unit should be unselected when clicked a second time
    cy.get("button").contains("Hammerfest").click();
    cy.get('[data-testid="tu_header_Hammerfest"]').should("not.exist");
    cy.get("button").contains("Hammerfest").click();
    cy.get("button").contains("Kirkenes").click();
    cy.get("button").contains("Molde").click();
    cy.get("button").contains("Namsos").click();
    cy.get("button").contains("Haukeland").click();
    // The sixth unit should not be pickable (maximum number of pickable units is five)
    cy.get('[data-testid="tu_header_Haukeland"]').should("not.exist");
    cy.get("body").type("{esc}");
  });
  it("test Søk etter behandlingsenheter field + tab", () => {
    cy.contains("div", "Søk etter behandlingsenheter");
    // Enter text in search field
    cy.get('[data-testid="tu_selector"]').click().type("unn hf{enter}");
    // Change tab
    cy.get('[data-testid="tab_opptaksomraade"]').click();
    cy.get('[data-testid="tab_sykehus"]').should(
      "have.attr",
      "aria-selected",
      "false"
    );
    cy.get('[data-testid="tab_opptaksomraade"]').should(
      "have.attr",
      "aria-selected",
      "true"
    );
    cy.get('[data-testid="tab_datakvalitet"]').should(
      "have.attr",
      "aria-selected",
      "false"
    );
    cy.get('[data-testid="tu_header_UNN HF"]').should("not.exist");
    cy.contains("div", "Søk etter opptaksområder");
    cy.get('[data-testid="tu_selector"]').click().type("UNN HF{enter}");
    // Change tab again
    cy.get('[data-testid="tab_datakvalitet"]').click();
    cy.get('[data-testid="tab_sykehus"]').should(
      "have.attr",
      "aria-selected",
      "false"
    );
    cy.get('[data-testid="tab_opptaksomraade"]').should(
      "have.attr",
      "aria-selected",
      "false"
    );
    cy.get('[data-testid="tab_datakvalitet"]').should(
      "have.attr",
      "aria-selected",
      "true"
    );
    cy.contains("div", "Søk etter behandlingsenheter");
    cy.get('[data-testid="tu_header_UNN HF"]').should("not.exist");
    cy.get('[data-testid="tab_sykehus"]').click();
    cy.get('[data-testid="tab_sykehus"]').should(
      "have.attr",
      "aria-selected",
      "true"
    );
    cy.get('[data-testid="tab_opptaksomraade"]').should(
      "have.attr",
      "aria-selected",
      "false"
    );
    cy.get('[data-testid="tab_datakvalitet"]').should(
      "have.attr",
      "aria-selected",
      "false"
    );
  });
});

export {};
