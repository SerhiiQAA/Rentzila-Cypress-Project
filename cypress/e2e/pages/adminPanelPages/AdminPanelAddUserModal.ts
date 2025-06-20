import BasePage from "../BasePage";
import { CreateUserDetails } from "../../utils/types";

class AdminPanelAddUserModal extends BasePage {
  elements = {
    title: () => cy.get('div[class*="PopupLayout_label"]'),
    allUsersDropdown: () =>
      cy.get('[data-testid="div_CustomSelect"]:nth-child(1)'),
    usersDropdownArea: () => cy.get('[data-testid="listItems-customSelect"]'),
    lastNameField: () => cy.get('[name="last_name"]'),
    firstNameField: () => cy.get('[name="first_name"]'),
    middleNameField: () => cy.get('[name="middle_name"]'),
    mobileField: () => cy.get("#mobile"),
    emailField: () => cy.get('[data-testid="custom-input"]'),
    passwordField: () => cy.get("#password"),
    submitBtn: () => cy.get('[type="submit"]'),
  };

  clickAllUsersDropdown() {
    this.elements.allUsersDropdown().click();
  }

  clickSubmitBtn() {
    this.elements.submitBtn().click();
  }

  fillLastName(lastName) {
    this.elements.lastNameField().clear().type(lastName);
  }

  fillFirstName(firstName) {
    this.elements.firstNameField().clear().type(firstName);
  }

  fillMiddleName(middleName) {
    this.elements.middleNameField().clear().type(middleName);
  }

  fillMobileNumber(mobile) {
    this.elements.mobileField().clear().type(mobile);
  }

  fillEmail(mobile) {
    this.elements.emailField().clear().type(mobile);
  }

  fillPassword(password) {
    this.elements.passwordField().clear().type(password);
  }

  selectDropdownOption(optionName) {
    this.clickAllUsersDropdown();
    this.elements.usersDropdownArea().contains(optionName).click();
  }

  createNewUser(userDetails: CreateUserDetails) {
    this.selectDropdownOption(userDetails.optionName);
    this.fillLastName(userDetails.lastName);
    this.fillFirstName(userDetails.firstName);
    this.fillMobileNumber(userDetails.mobile);
    this.fillEmail(userDetails.email);
    this.fillPassword(userDetails.password);
    this.clickSubmitBtn();
  }
}

export default new AdminPanelAddUserModal();
