/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    checkInputErrorByLabel(labelText, expectedError): void;
  }
}
