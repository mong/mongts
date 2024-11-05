/// <reference types="cypress"/>

context("Push some front page buttons", () => {
  it("should redirect to atlas home page on FNSP", () => {
    cy.request({
      url: "/helseatlas",
      followRedirect: false,
    }).then((resp) => {
      expect(resp.status).to.eq(308);
      const locationHeader = resp.headers["location"];
      const expectedUrl = "https://www.skde.no/helseatlas";
      expect(locationHeader).to.be.oneOf(["/helseatlas/", expectedUrl]);
    });
  });
});
