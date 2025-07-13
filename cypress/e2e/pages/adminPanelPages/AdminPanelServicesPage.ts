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

    createBtn: () => cy.get('button[data-testid="customButtonContainer"]'),

    imageInput: () => cy.get('input[data-testid="imageInput"]'),
    
    viewCategoryBtn: () => cy.get('button[data-testid="adminOkoButton"]').first(),
    
    editCategoryBtn: () => cy.get('button[data-testid="adminPenBtn"]').first(),
    
    deleteCategoryBtn: () => cy.get('button[class*="AdminButtons_bucket"]').first(),
    deleteCategoryPopupBtn: () => cy.get('div[class*="ItemButtons_wrapper"] button[class*="ItemButtons_darkBlueBtn"]'),

    categoryPopupYesBtn: () => cy.get('button[class*="AdminServiceCategoriesPopup_save_btn"]'),
    elementPopupInput: () => cy.get('input[data-testid="custom-input"]'),
    popupCloseBtn: () => cy.get('div[data-testid="closeIcon"]'),
    popupCancelBtn: () => cy.get('button[class*="AdminServicePopup_close_btn_"]'),


    categoryNameField: () => cy.get('div[class*="AdminServiceCategoriesPopup_field"]'),

    servicePopupField: () => cy.get('div[class*="AdminServicePopup_field"]'),
    servicePopupYesBtn: () => cy.get('button[data-testid="submitBtn"]'),

    tableElement: () => cy.get('td'),
    categoryElementSilskogospodarski: () => cy.get('td').contains("Сільськогосподарські"),
    
    idSortLabel: () => cy.get('span[data-testid="sortLabelContainer"]').contains("ID"),
    nameSortLabel: () => cy.get('span[data-testid="sortLabelContainer"]').contains("Назва"),
    categorySortLabel: () => cy.get('span[data-testid="sortLabelContainer"]').contains("Категорія"),
  };

  verifyTitle(name: string) {
      this.elements.title().should("contain.text", name);
  }

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

  clickCategoryPopupYesBtn() {
      this.elements.categoryPopupYesBtn().click();
  }

  clickDeleteCategoryPopupBtn() {
      this.elements.deleteCategoryPopupBtn().click();
  }

  clickCreateBtn() {
      this.elements.createBtn().click();
  }

  clickElementActionBtnByName(name: string, action: string) {
    const selectors = {
    view: 'button[data-testid="adminOkoButton"]',
    edit: 'button[data-testid="adminPenBtn"]',
    delete: 'button[class*="AdminButtons_bucket"]',
    };

    const buttonSelector = selectors[action];

    this.elements.tableElement()
      .contains(name)
      .parents('tr')
      .find(buttonSelector)
      .click();
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

  clickPopupCloseBtn() {
      this.elements.popupCloseBtn().click();
  }

  clickPopupCancelBtn() {
      this.elements.popupCancelBtn().click();
  }

  clickServicePopupYesBtn() {
      this.elements.servicePopupYesBtn().click();
  }

  uploadImage(imagePath: string) {
      this.elements.imageInput().selectFile(imagePath, { force: true });
  }

  verifyRowsCount(count: number) {
      this.elements.tableRows().should("have.length", count);
  }

  verifyViewCategoryName(name: string) {
      this.elements.categoryNameField().should("contain.text", name);
  }

  fillElementPopupInput(name: string) {
      this.elements.elementPopupInput().clear().type(name);
  }
  
  verifyEditElementPopupInput(name: string) {
      this.elements.elementPopupInput().should("have.value", name);
  }

  verifyServicePopupNameField(name: string) {
      this.elements.servicePopupField().should("have.text", name);
  }

  verifyTableElement(name: string) {
      this.elements.tableElement().should("contain.text", name);
  }

  verifyCurrentDropdownElementByName(name: string) {
      this.elements.paginationDropdown()
        .should("contain.text", name);
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
