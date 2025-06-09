export default class BasePage {
  visit(path = "/") {
    cy.visit(path);
  }
   verifyCurrentUrl(expectedPath) {
    cy.url().should('include', expectedPath);
  }
}
