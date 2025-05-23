Cypress.Commands.add('checkInputErrorByLabel', (labelText, expectedError) => {
  cy.get('[data-testid="customInputWrapper"]')
    .filter(`:contains("${labelText}")`) 
    .first() 
    .within(() => {
      cy.get('[data-testid="descriptionError"]').should(
        "contain",
        expectedError
      );
    });
});
