import BasePage from "../BasePage";

class AdminPanelMachineryPage extends BasePage {
  elements = {
    title: () => cy.get("div.AdminLayout_title__lqIgo"),
    createBtn: () => cy.get('[data-testid="customButtonContainer"]'),
    searchField: () => cy.get('[data-testid="input"]'),
    sortByIdBtn: () =>
      cy.get('thead tr th:nth-child(1) [data-testid="sortLabelContainer"]'),
    sortByNameBtn: () =>
      cy.get('thead tr th:nth-child(2) [data-testid="sortLabelContainer"]'),
    idValue: () => cy.get("tbody tr th"),
    nameValue: () => cy.get(".MuiTableCell-root:nth-child(2)"),
    createCategoryModalTitle: () => cy.get("div.PopupLayout_label__pmlul"),
    createCategoryModalNameField: () =>
      cy.get('input[data-testid="custom-input"]'),
    createCategoryModalParentDropdownBtn: () =>
      cy.get('div[data-testid="div_CustomSelect"]'),
    createCategoryModalParentDropdownArea: () =>
      cy.get('ul[data-testid="listItems-customSelect"]'),
    creatCategoryModalCancelBtn: () =>
      cy.get("button.AdminCategoryPopup_close_btn__5UFLs"),
    createCategoryModalSavelBtn: () =>
      cy.get("button.AdminCategoryPopup_save_btn__0tYx_"),
    createCategoryModalCloselBtn: () => cy.get('[data-testid="crossIcon"]'),
  };

  clickCreateBtn() {
    this.elements.createBtn().click();
  }

  clickCreatCategoryModalSavelBtn() {
    this.elements.createCategoryModalSavelBtn().click();
  }

  clickCreatCategoryModalCancelBtn() {
    this.elements.creatCategoryModalCancelBtn().click();
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
