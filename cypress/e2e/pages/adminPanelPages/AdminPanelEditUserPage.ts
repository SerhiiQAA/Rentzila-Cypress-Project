import BasePage from "../BasePage";

class AdminPanelEditUserPage extends BasePage {
  elements = {
    title: () => cy.get('div[class*="AdminLayout_title"]'),
    allUsersDropdown: () => cy.get('[data-testid="div_CustomSelect"]'),
    usersDropdownArea: () => cy.get('[data-testid="listItems-customSelect"]'),
    usersDropdown: () => cy.get('[data-testid="span-customSelect"]'),
    subCategoryDropdownClient: () =>
      cy.get('li[data-testid="item-customSelect"]').contains("Клієнт"),
    lastNameField: () => cy.get('[data-testid="custom-input"]').eq(0),
    firstNameField: () => cy.get('[data-testid="custom-input"]').eq(1),
    middleNameField: () => cy.get('[data-testid="custom-input"]').eq(2),
    mobileField: () => cy.get('[data-testid="OwnerProfileNumber"]'),
    viberField: () =>
      cy.get('[class*="OwnerProfileAdditionalInfo_input_wrapper"] div #mobile'),
    telegramField: () => cy.get('[data-testid="custom-input"]').eq(3),
    emailField: () => cy.get('[data-testid="custom-input"]').eq(4),
    closeBtn: () => cy.get('[class*="EditUser_close_btn"]'),
    deleteUserBtn: () => cy.get('[class*="EditUser_delete_btn]'),
    submitBtn: () => cy.get('[type="submit"]'),
  };

  clickAllUsersDropdown() {
    this.elements.allUsersDropdown().click();
  }

  clickSubCategoryDropdownClient() {
    this.elements.subCategoryDropdownClient().click({ force: true });
  }

  clickCloseBtn() {
    this.elements.closeBtn().click();
  }

  clickDeleteUserBtn() {
    this.elements.deleteUserBtn().click();
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

  fillViberField(mobile) {
    this.elements.viberField().clear().type(mobile);
  }

  fillTelegramField(mobile) {
    this.elements.telegramField().clear().type(mobile);
  }

  fillEmail(mobile) {
    this.elements.emailField().clear().type(mobile);
  }

  selectDropdownOption(optionName) {
    this.elements.allUsersDropdown().should("be.visible").click();
    this.elements
      .usersDropdown()
      .contains(optionName)
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
  }
}

export default new AdminPanelEditUserPage();
