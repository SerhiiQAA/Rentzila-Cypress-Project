import BasePage from "./BasePage";

class LoginPage extends BasePage {
  elements = {
    emailInput: () => cy.get("#email"),
    passwordInput: () => cy.get("#password"),
    submitBtn: () =>
      cy.get("form[class='LoginForm_form__7G3Zk'] button[type='submit']"),
    googleLoginBtn: () => cy.get(".AuthorizationGoogle_button__k_C7f"),
    registerBtn: () => cy.get(".AuthorizationSwitcher_switcher_link__QX9z_"),
    forgotPasswordButton: () =>
      cy.get("div[class='LoginForm_links_wrapper__k2b1a'] div:nth-child(2)"),
  };

  fillEmail(email: string){
    this.elements.emailInput().type(email);
  }

  fillPassword(password: string){
    this.elements.passwordInput().type(password);
  }

  clickSignInBtn(){
    this.elements.submitBtn().click();
  }

  clickRegisterBtn(){
    this.elements.registerBtn().click();
  }

  clickForgotPasswordButton(){
    this.elements.forgotPasswordButton().click();
  }

  login(email: string, password: string){
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickSignInBtn();
  }
}
export default new LoginPage();

