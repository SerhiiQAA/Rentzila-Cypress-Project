import { create } from "cypress/types/lodash";
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
    categoryPopupYesBtn: () => cy.get('button[class*="AdminServiceCategoriesPopup_save_btn"]'),
    
    deleteCategoryBtn: () => cy.get('button[class*="AdminButtons_bucket"]').first(),
    deleteCategoryPopupBtn: () => cy.get('div[class*="ItemButtons_wrapper"] button[class*="ItemButtons_darkBlueBtn"]'),
    categoryPopupInput: () => cy.get('input[data-testid="custom-input"]'),

    createCategoryBtn: () => cy.get('button[data-testid="customButtonContainer"]'),
    

    categoryNameField: () => cy.get('div[class*="AdminServiceCategoriesPopup_field"]'),
    tableElement: () => cy.get('td'),
    categoryElementSilskogospodarski: () => cy.get('td').contains("Сільськогосподарські"),

    idSortLabel: () => cy.get('span[data-testid="sortLabelContainer"]').contains("ID"),
    nameSortLabel: () => cy.get('span[data-testid="sortLabelContainer"]').contains("Назва"),
    categorySortLabel: () => cy.get('span[data-testid="sortLabelContainer"]').contains("Категорія"),
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

  clickCategoryPopupYesBtn() {
      this.elements.categoryPopupYesBtn().click();
  }

  clickDeleteCategoryBtn() {
      this.elements.deleteCategoryBtn().click();
  }

  clickDeleteCategoryPopupBtn() {
      this.elements.deleteCategoryPopupBtn().click();
  }

  clickCreateCategoryBtn() {
      this.elements.createCategoryBtn().click();
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

  clickIdSort() {
      this.elements.idSortLabel().click();
  }

  clickNameSort() {
      this.elements.nameSortLabel().click();
  }

  clickCategorySort() {
      this.elements.categorySortLabel().click();
  }

  verifyRowsCount(count: number) {
      this.elements.tableRows().should("have.length", count);
  }

  verifyViewCategoryName(name: string) {
      this.elements.categoryNameField().should("contain.text", name);
  }

  fillCategoryPopupInput(name: string) {
      this.elements.categoryPopupInput().clear().type(name);
  }
  
  verifyEditCategoryInput(name: string) {
      this.elements.categoryPopupInput().should("have.value", name);
  }
  
  verifyTableElement(name: string) {
      this.elements.tableElement().should("contain.text", name);
  }

  deleteCategory(name: string) {
      this.elements.tableElement()
        .contains(name)
        .parents('tr')
        .find('button[class*="AdminButtons_bucket"]')
        .click();
      this.clickDeleteCategoryPopupBtn();
      cy.reload();
      this.elements.tableElement()
        .contains(name)
        .should("not.exist");
  }

  sortIdAndVerify() {
      this.clickIdSort();
      cy.get('tbody tr th').then($cells => {
        const displayedIDs = Array.from($cells, cell =>
          Number(cell.innerText.trim())
        );

        const expectedAscending = [...displayedIDs].sort((a, b) => a - b);
        expect(displayedIDs).to.deep.equal(expectedAscending);
      });

      
      this.clickIdSort();

      
      cy.get('tbody tr th').then($cells => {
        const displayedIDs = Array.from($cells, cell =>
          Number(cell.innerText.trim())
        );

        const expectedDescending = [...displayedIDs].sort((a, b) => b - a);
        expect(displayedIDs).to.deep.equal(expectedDescending);

      });
  }

  sortNameAndVerify() {
      this.clickNameSort();
      cy.get('tbody tr td:nth-of-type(1)').then($cells => {
        const displayedNames = Array.from($cells, cell =>
          Number(cell.innerText.trim())
        );

        const expectedAscending = [...displayedNames].sort((a, b) => a - b);
        expect(displayedNames).to.deep.equal(expectedAscending);
      });

      
      this.clickNameSort();

      
      cy.get('tbody tr td:nth-of-type(1)').then($cells => {
        const displayedNames = Array.from($cells, cell =>
          Number(cell.innerText.trim())
        );

        const expectedDescending = [...displayedNames].sort((a, b) => b - a);
        expect(displayedNames).to.deep.equal(expectedDescending);

      });
  }

  sortCategoryAndVerify() {
      this.clickCategorySort();
      cy.get('tbody tr td:nth-of-type(2)').then($cells => {
        const displayedCategories = Array.from($cells, cell =>
          Number(cell.innerText.trim())
        );

        const expectedAscending = [...displayedCategories].sort((a, b) => a - b);
        expect(displayedCategories).to.deep.equal(expectedAscending);
      });

      
      this.clickCategorySort();

      
      cy.get('tbody tr td:nth-of-type(2)').then($cells => {
        const displayedCategories = Array.from($cells, cell =>
          Number(cell.innerText.trim())
        );

        const expectedDescending = [...displayedCategories].sort((a, b) => b - a);
        expect(displayedCategories).to.deep.equal(expectedDescending);

      });
  }

}

export default new AdminPanelServicesPage();
