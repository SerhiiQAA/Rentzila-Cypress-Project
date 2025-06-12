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
  };

  clickCreateBtn() {
    this.elements.createBtn().click();
  }

  clickCreatCategoryModalSavelBtn() {
    this.elements.createCategoryModalSaveBtn().click();
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

  fillCreatCategoryModalNameField(name: string) {
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
}

export default new AdminPanelMachineryPage();