import BasePage from "./BasePage";

class RegistrationPage extends BasePage {
  elements = {
    emailInput: () => cy.get("#login"),
    passwordInput: () => cy.get("#password"),
    agreementCheckbox: () => cy.get("#registration"),
    googleRegistrationBtn: () => cy.get(".AuthorizationGoogle_button__k_C7f"),
    registrationBtn: () =>
      cy.get(
        "form[class='RegistrationForm_form__HaCqR'] button[type='submit']"
      ),
    passwordError: () => cy.contains("Неправильний формат email"),
    emailError: () => cy.contains("Неправильний формат email"),
    registerLink: () => cy.get(".AuthorizationSwitcher_switcher_link__QX9z_"),
  };

  fillEmail(email: string) {
    cy.scrollTo("top");
    this.elements.emailInput().type(email);
  }

  fillPassword(password: string) {
    this.elements.passwordInput().type(password);
  }

  clickAgreementCheckbox() {
    this.elements.agreementCheckbox().check();
  }

  clickGoogleRegistrationBtn() {
    this.elements.googleRegistrationBtn().click();
  }

  clickRegisterLink() {
    this.elements.registerLink().click();
  }

  clickRegistrationBtn() {
    this.elements.registrationBtn().click();
  }
}
export default new RegistrationPage();
