import BasePage from "../BasePage";

class AdminPanelMachineryPage extends BasePage {
  elements = {
    title: () => cy.get('div[class*="AdminLayout_title"]'),
    createBtn: () => cy.get('[data-testid="customButtonContainer"]'),
    searchField: () => cy.get('[data-testid="input"]'),
    sortByIdBtn: () =>
      cy.get('thead tr th:nth-child(1) [data-testid="sortLabelContainer"]'),
    sortByNameBtn: () =>
      cy.get('thead tr th:nth-child(2) [data-testid="sortLabelContainer"]'),
    idValue: () => cy.get("tbody tr th"),
    nameValue: () => cy.get(".MuiTableCell-root:nth-child(2)"),
    createCategoryModalTitle: () => cy.get('div[class*="PopupLayout_label"]'),
    createCategoryModalNameField: () =>
      cy.get('input[data-testid="custom-input"]'),
    createCategoryModalParentDropdownBtn: () =>
      cy.get('div[data-testid="div_CustomSelect"]'),
    createCategoryModalParentDropdownArea: () =>
      cy.get('ul[data-testid="listItems-customSelect"]'),
    createCategoryModalCancelBtn: () =>
      cy.get('button[class*="AdminCategoryPopup_close_btn"]'),
    createCategoryModalSaveBtn: () =>
      cy.get('button[class*="AdminCategoryPopup_save_btn"]'),
    createCategoryModalCloselBtn: () => cy.get('[data-testid="crossIcon"]'),

    createManufactureModalSubmitBtn: () =>
      cy.get('[data-testid="submitBtn"]'),
    createManufactureModalNameField: () =>
      cy.get('[data-testid="custom-input"]'),

    dataTable: () => cy.get('[data-testid="categoriesContainer"]'),
    viewMachineryModalTitle: () => cy.get('[class*="PopupLayout_label"]'),
    viewMachineryModalCloseBtn: () => cy.get('[data-testid="closeIcon"]'),
    viewMachineryModalCancelBtn: () =>
      cy.get('[class*="AdminCategoryPopup_buttons"] button'),
    editMachineryModalTitle: () => cy.get('[class*="PopupLayout_label"]'),
    editMachineryModalCloseBtn: () => cy.get('[data-testid="closeIcon"]'),
    editMachineryModalNameField: () => cy.get('[data-testid="custom-input"]'),
    editMachineryModalCancelBtn: () =>
      cy.get('[class*="AdminCategoryPopup_buttons"] button:nth-child(1)'),
    editMachineryModalSubmitBtn: () =>
      cy.get('[class*="AdminCategoryPopup_buttons"] button:nth-child(2)'),
    editMachineryModalCategoryDropdown: () =>
      cy.get('[data-testid="div_CustomSelect"]'),
    editMachineryModalCategoryDropdownArea: () =>
      cy.get('[data-testid="listItems-customSelect"]'),

    deleteMachineryModalTitle: () => cy.get('[class*="PopupLayout_label"]'),
    deleteMachineryModalText: () => cy.get('[class*="DialogPopup_text"]'),
    deleteMachineryModalCancelBtn: () =>
      cy.get('[class*="ItemButtons_lightRedBtn"]'),
    deleteMachineryModalSubmitBtn: () =>
      cy.get('[class*="ItemButtons_darkBlueBtn"]'),
  };

  clickCreateBtn() {
    this.elements.createBtn().click();
  }

  clickCreatCategoryModalSavelBtn() {
    this.elements.createCategoryModalSaveBtn().click();
  }

  clickCreateManufactureModalSubmitBtn() {
    this.elements.createManufactureModalSubmitBtn().click();
  }

  clickCreatCategoryModalCancelBtn() {
    this.elements.createCategoryModalCancelBtn().click();
  }

  clickCreatCategoryModalCloselBtn() {
    this.elements.createCategoryModalCloselBtn().click();
  }
  clickSortByIdBtn() {
    this.elements.sortByIdBtn().click();
  }

  clickSortByNameBtn() {
    this.elements.sortByNameBtn().click();
  }

  clickViewMachineryModalCancelBtn() {
    this.elements.viewMachineryModalCancelBtn().click();
  }

  clickEditMachineryModalCloseBtn() {
    this.elements.editMachineryModalCloseBtn().click();
  }

  clickEditMachineryModalCancelBtn() {
    this.elements.editMachineryModalCancelBtn().click();
  }

  clickEditMachineryModalSubmitBtn() {
    this.elements.editMachineryModalSubmitBtn().click();
  }

  clickDeleteMachineryModalSubmitBtn() {
    this.elements.deleteMachineryModalSubmitBtn().click();
  }

  clickDeleteMachineryModalCancelBtn() {
    this.elements.deleteMachineryModalCancelBtn().click();
  }

  fillEditMachineryModalNameField(name) {
    this.elements.editMachineryModalNameField().clear().type(name);
  }

  fillCreateCategoryModalNameField(name: string) {
    this.elements.createCategoryModalNameField().clear().type(name);
  }

  fillSearchField(searchText: string) {
    this.elements.searchField().clear().type(searchText);
  }

  selectCategoryModalDropdownOption(optionText: string) {
    this.elements.createCategoryModalParentDropdownBtn().click();
    this.elements
      .createCategoryModalParentDropdownArea()
      .should("be.visible")
      .contains(optionText)
      .click();
  }

  selectCategoryEditMachineryModalDropdown(categoryName) {
    this.elements.editMachineryModalCategoryDropdown().click();
    this.elements
      .editMachineryModalCategoryDropdownArea()
      .contains(categoryName)
      .click();
  }
}

export default new AdminPanelMachineryPage();
