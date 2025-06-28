import BasePage from "../BasePage";

class AdminPanelServicesPage extends BasePage {
  elements = {
    title: () => cy.get('div[class*="AdminLayout_title"]'),
    searchField: () =>
      cy.get('input[data-testid="input"]'),
    
    servicesBtn: () =>
      cy.get('div[data-testid="linksContainer"]').contains("Сервіси"),
    subItemCategoryServicesBtn: () =>
      cy
        .get('li li [class*="AdminNavigationLink_button"]')
        .contains("Категорії сервісів"),
    subItemListServicesBtn: () =>
      cy
        .get('li li [class*="AdminNavigationLink_button"]')
        .contains("Список сервісів"),
    tableRows: () => cy.get('table > tbody > tr'),
    paginationDropdown: () => cy.get('div[class*="MuiTablePagination-select"]'),
    paginationSelect10:() => cy.get('ul[class*="MuiList-padding"] li[data-value="10"]'),
    paginationSelect20:() => cy.get('ul[class*="MuiList-padding"] li[data-value="20"]'),
    paginationSelect50:() => cy.get('ul[class*="MuiList-padding"] li[data-value="50"]'),
    viewCategoryBtn: () => cy.get('button[data-testid="adminOkoButton"]').first(),
    editCategoryBtn: () => cy.get('button[data-testid="adminPenBtn"]').first(),
    editCategorySaveBtn: () => cy.get('button[class*="AdminServiceCategoriesPopup_save_btn"]'),
    deleteCategoryBtn: () => cy.get('button[class*="AdminButtons_bucket"]').first(),
    deleteCategoryPopupBtn: () => cy.get('div[class*="ItemButtons_wrapper"] button[class*="ItemButtons_darkBlueBtn"]'),
    editCategoryInput: () => cy.get('input[data-testid="custom-input"]'),
    categoryNameField: () => cy.get('div[class*="AdminServiceCategoriesPopup_field"]'),
    categoryElement: () => cy.get('td').first(),
    categoryElementSilskogospodarski: () => cy.get('td').contains("Сільськогосподарські"),

    };

  fillSearchField(searchText: string) {
      this.elements.searchField().clear().type(searchText);
  }


  clickServicesBtn() {
      this.elements.servicesBtn().click();
  }

  clickSubItemCategoryServicesBtn() {
      this.elements.subItemCategoryServicesBtn().click();
  }

  clickSubItemListServicesBtn() { 
      this.elements.subItemListServicesBtn().click();
  }

  clickViewCategoryBtn() {
      this.elements.viewCategoryBtn().click();
  }

  clickEditCategoryBtn() {
      this.elements.editCategoryBtn().click();
  }

  clickEditCategorySaveBtn() {
      this.elements.editCategorySaveBtn().click();
  }

  clickDeleteCategoryBtn() {
      this.elements.deleteCategoryBtn().click();
  }

  clickDeleteCategoryPopupBtn() {
      this.elements.deleteCategoryPopupBtn().click();
  }
  
  clickPaginationDropdown() {
      this.elements.paginationDropdown().click();
  }

  clickPaginationSelect10() {
      this.elements.paginationSelect10().click();
  }

  clickPaginationSelect20() {
      this.elements.paginationSelect20().click();
  }

  clickPaginationSelect50() {
      this.elements.paginationSelect50().click();
  }

  verifyRowsCount(count: number) {
      this.elements.tableRows().should("have.length", count);
  }

  verifyViewCategoryName(name: string) {
      this.elements.categoryNameField().should("contain.text", name);
  }

  fillEditCategoryInput(name: string) {
      this.elements.editCategoryInput().clear().type(name);
  }
  
  verifyEditCategoryInput(name: string) {
      this.elements.editCategoryInput().should("have.value", name);
  }
  
  verifyCategoryElementName(name: string) {
      this.elements.categoryElement().should("contain.text", name);
  }  

}

export default new AdminPanelServicesPage();
