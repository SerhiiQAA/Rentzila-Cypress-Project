/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    checkInputErrorByLabel(labelText, expectedError): void;
  }
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    drag(targetSelector: string, options?: Partial<{ force: boolean }>): Chainable<Subject>;
  }
}
