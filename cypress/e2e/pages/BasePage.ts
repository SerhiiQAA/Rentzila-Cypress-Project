export default class BasePage {
  visit(path = "/") {
    cy.visit(path);
  }
}
