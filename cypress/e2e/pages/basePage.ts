class BasePage {
  visit(path = '/') {
    cy.visit(path);
  }
}

export default new BasePage();
