import BasePage from "../BasePage";

class TendersMapPage extends BasePage {
  elements = {
    showListBtn: () => cy.get('button[class*="MapListSwitcher_switch"]'),
    tendersInformativeTitle: () => cy.get('[data-testid="count"]'),
    tenderCardFirst: () => cy.get('[data-testid="tenderLink"]').eq(0),
    tenderCard: () => cy.get('[data-testid="tenderLink"]'),
    tenderCardName: () => cy.get('[data-testid="tenderName"]'),
    tenderCategoryName: () => cy.get('div[class*="TenderInList_category"]'),
    tenderCardOrganizationName: () =>
      cy.get('div[class*="ParagraphWithIcon_paragraph"]').eq(0),
    tenderCardPrice: () => cy.get('[data-testid="tenderPrice"]'),
    tenderCardTimer: () => cy.get('[data-testid="remainingTimeDesktop"]'),
    tenderCardProposeDeniedBtn: () =>
      cy.get('div[class*="ProposeButton_propose_denied"]'),
    allTenderCardsField: () => cy.get('div [class*="Tenders_tenders"]'),
    searchTenderField: () => cy.get('input[data-testid="search"]'),
    clearSearchTenderFieldBtn: () => cy.get('[data-testid="clear"]'),
    organizatorInputField: () => cy.get('[data-testid="edrpou"]'),
    organizatorCheckboxFirst: () =>
      cy.get('input[class*="FirmCheckbox_checkbox"]').eq(0),
    organizatorCheckboxSecond: () =>
      cy.get('input[class*="FirmCheckbox_checkbox"]').eq(1),
    organizatorCheckboxThird: () =>
      cy.get('input[class*="FirmCheckbox_checkbox"]').eq(2),
    organizatorCheckboxFirstName: () =>
      cy.get('div[class*="FirmCheckbox_firmName"]'),
    organizatorCheckboxSecondName: () =>
      cy.get('div[class*="FirmCheckbox_firmName"]'),
    organizatorCheckboxThirdName: () =>
      cy.get('div[class*="FirmCheckbox_firmName"]'),
    organizatorCheckboxName: () => cy.get('div[class*="FirmCheckbox_firmName"]'),
    resertFiltersBtn: () => cy.get('[data-testid="resetFilters"]'),
    categoryItem: () => cy.get('div[class*="ItemCategory_checkboxWithLabel"]'),
    categoryCheckbox: () =>
      cy.get('[class*="ItemCategory_checkbox"][type="checkbox"]'),
    categorySubItem: () => cy.get('div[class*="ItemService_service"]'),
    categorySubCheckbox: () =>
      cy.get('[class*="ItemService_checkbox"][type="checkbox"]'),
    categoryBuildingOpenListBtn: () => cy.get('[data-testid="chevron"]').eq(0),
    categoryOthersOpenListBtn: () => cy.get('[data-testid="chevron"]').eq(1),
    categoryAgriculturalOpenListBtn: () =>
      cy.get('[data-testid="chevron"]').eq(2),
    filterAppliedAllNames: () => cy.get('[class*="AppliedFilters_wrapper"] div [class*="AppliedFilters_filter"] div'),
    budgetFromItem: () => cy.get('[data-testid="budgetFrom"]'),
    budgetToItem: () => cy.get('[data-testid="budgetTo"]'),
    regionFilter: () => cy.get('div[class*="TendersRegionFilter_captions"]'),
    regionAllCheckbox: () => cy.get("#all"),
    regionItem: () =>
      cy.get('[class*="RegionsList_check_label"][data-testid="label"]'),
    regionCheckbox: () =>
      cy.get('[class*="RegionsList_region"] [type="checkbox"]'),
  };

  clickShowListBtn() {
    this.elements.showListBtn().click();
  }

  clickClearSearchTenderFieldBtn() {
    this.elements.clearSearchTenderFieldBtn().click();
  }

  clickTenderCardFirst() {
    this.elements.tenderCardFirst().click();
  }

  clickOrganizatorCheckboxFirst() {
    this.elements.organizatorCheckboxFirst().click();
  }
  
  clickOrganizatorCheckboxSecond() {
    this.elements.organizatorCheckboxSecond().click();
  }
  
  clickOrganizatorCheckboxThird() {
    this.elements.organizatorCheckboxThird().click();
  }
  
  clickResertFiltersBtn() {
    this.elements.resertFiltersBtn().click();
  }
  
  clickCategoryCheckbox() {
    this.elements.categoryCheckbox().click();
  }
  
  clickCategorySubCheckbox() {
    this.elements.categorySubCheckbox().click();
  }
  
  clickCategoryItem() {
    this.elements.categoryItem().click();
  }
  
  clickCategorySubItem() {
    this.elements.categorySubItem().click();
  }
  
  clickCategoryBuildingOpenListBtn() {
    this.elements.categoryBuildingOpenListBtn().click();
  }
  
  clickCategoryOthersOpenListBtn() {
    this.elements.categoryOthersOpenListBtn().click();
  }
  
  clickCategoryAgriculturalOpenListBtn() {
    this.elements.categoryAgriculturalOpenListBtn().click();
  }
  
  clickCategorySubItemByText(text) {
    this.elements.categorySubItem().contains(text).click();
  }

  fillInSearchTenderField(text: string) {
    this.elements.searchTenderField().type(text);
  }

  fillInOrganizatorInputField(text: string) {
    this.elements.organizatorInputField().type(text);
  }


  fillBudgetFrom(amount) {
    this.elements.budgetFromItem().clear().type(amount);
  }

  fillBudgetTo(amount) {
    this.elements.budgetToItem().clear().type(amount);
  }

  getTenderCardsCount() {
    return this.elements.tenderCard().then((cards) => cards.length);
  }

  getTenderWordEnding(count) {
    if (count === 1) return "тендер";
    if (count >= 2 && count <= 4) return "тендери";
    return "тендерів";
  }

  getCleanTitleText() {
    return this.elements
      .tendersInformativeTitle()
      .invoke("text")
      .then((text) => text.trim().replace(/\s+/g, " "));
  }

  verifySelectedFilters(names) {
    this.elements.filterAppliedAllNames().should(($elements) => {
      const texts = $elements.map((index, el) => Cypress.$(el).text()).get();
      names.forEach((name) => {
        expect(texts).to.include(name);
      });
    });
  }

  verifyFirstAndLastTenderCardElements() {
    this.elements
      .tenderCard()
      .first()
      .within(() => {
        this.elements.tenderCardName().should("exist");
        this.elements.tenderCardPrice().should("exist");
        this.elements.tenderCardOrganizationName().should("exist");
        this.elements.tenderCardTimer().should("exist");
      });

    this.elements
      .tenderCard()
      .last()
      .within(() => {
        this.elements.tenderCardName().should("exist");
        this.elements.tenderCardPrice().should("exist");
        this.elements.tenderCardOrganizationName().should("exist");
        this.elements.tenderCardTimer().should("exist");
      });
  }

  validateFilterAppliedToTenders() {
    this.elements.filterAppliedAllNames().then((filterElements) => {
      const filterTexts = filterElements
        .map((index, el) => Cypress.$(el).text().trim())
        .get();

      this.elements.tenderCardOrganizationName().then((cardElements) => {
        const cardTexts = cardElements
          .map((index, el) => Cypress.$(el).text().trim())
          .get();

        expect(
          filterTexts.some((filterText) =>
            cardTexts.some((cardText) => cardText.includes(filterText))
          )
        ).to.be.true;
      });
    });
  }

  selectAndValidateRandomRegions() {
    this.elements.regionItem().then((regions) => {
      const allRegions = regions
        .map((index, el) => Cypress.$(el).text().trim())
        .get();

      const randomRegions = Cypress._.sampleSize(allRegions, 3);

      randomRegions.forEach((region) => {
        this.elements.regionItem().contains(region).click();
      });

      this.elements
        .filterAppliedAllNames()
        .invoke("text")
        .then((filterText) => {
          const normalizedText = filterText.replace(/\s*\(\d+\)$/, "");

          randomRegions.forEach((region) => {
            const cleanRegion = region.replace(/\s*\(\d+\)$/, "");
            expect(normalizedText).to.include(cleanRegion);
          });
        });
    });
  }
}

export default new TendersMapPage();
