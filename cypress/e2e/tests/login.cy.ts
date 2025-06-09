import loginPage from "../pages/LoginPage";
import header from "../components/Header";
import { config } from "../../../config";
import { envs } from "../utils/testData";
import { invalidEmails } from "../utils/testData";
import { uiMessages } from "../utils/uiTexts";
import { invalidPasswords } from "../utils/testData";
import { invalidNumbers } from "../utils/testData";

context("Login verification", () => {
  beforeEach(() => {
    cy.viewport(config.viewportWidth, config.viewportHeight);
    loginPage.visit();
    header.clickSignInBtn();
  });

  it("C201 Authorization with valid email and password", () => {
    loginPage.login(envs.email, envs.password);
    header.clickUserBtn();
    header.elements.userDropdownEmail().should("contain.text", envs.email);
    header.clickUserDropdownLogoutBtn();
    header.clickSignInBtn();
    loginPage.loginWithEnter(envs.email, envs.password);
    header.clickUserBtn();
    header.elements.userDropdownEmail().should("contain.text", envs.email);
  });

  it("C203 Authorization with invalid credentials", () => {
    invalidEmails.forEach((email) => {
      loginPage.login(email, envs.password);
      loginPage.getErrorMsg().should("have.text", uiMessages.emailLoginError);
      loginPage.cleanInputs();
    });
    invalidPasswords.forEach((password) => {
      loginPage.login(envs.email, password);
      loginPage
        .getErrorMsg()
        .should("have.text", uiMessages.passwordLoginError);
      loginPage.cleanInputs();
    });
  });
  
  it("C207 Authorization with invalid credentials (phone number)", () => {
    invalidNumbers.forEach((number) => {
      loginPage.login(number, envs.password);
      loginPage.getErrorMsg().should("have.text", uiMessages.phoneLoginError);
      loginPage.cleanInputs();
    });
  });
});
context("C202 Login Verification 2.0", () => {
  it("Authorization with valid phone and password", () => {
    const phoneNumbers = [envs.phone, envs.phone.slice(1), envs.phone.slice(3)];
    phoneNumbers.forEach((number) => {
      cy.viewport(config.viewportWidth, config.viewportHeight);
      loginPage.visit();
      header.clickSignInBtn();
      loginPage.fillEmail(number);
      loginPage.fillPassword(envs.password);
      loginPage.clickSignInBtn();
      header.clickUserBtn();
      header.elements.userDropdownEmail().should("contain.text", envs.email);
      header.clickUserDropdownLogoutBtn();
    });
  });
});
