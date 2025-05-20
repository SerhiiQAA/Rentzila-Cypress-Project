import BasePage from '../BasePage';

class TendersMapPage extends BasePage {

    elements = {
        showListBtn: () => cy.get('button.MapListSwitcher_switch__Jge1g'),
        tendersInformativeTitle: () => cy.get('[data-testid="count"]'),
        tenderCardFirst: () => cy.get('[data-testid="tenderLink"]').eq(0),
        tenderCard: () => cy.get('[data-testid="tenderLink"]'),
        tenderCardName: () => cy.get('[data-testid="tenderName"]'),
        tenderCategoryName: () => cy.get('div.TenderInList_category__AKgPq'),
        tenderCardOrganizationName: () => cy.get('div.ParagraphWithIcon_paragraph__5i0nJ').eq(0),
        tenderCardPrice: () => cy.get('[data-testid="tenderPrice"]'),
        tenderCardTimer: () => cy.get('[data-testid="remainingTimeDesktop"]'),
        tenderCardProposeDeniedBtn: () => cy.get('div.ProposeButton_propose_denied__SV3R3'),
        allTenderCardsField: () => cy.get('div .Tenders_tenders__NTsrF'),
        searchTenderField: () => cy.get('input[data-testid="search"]'),
        clearSearchTenderFieldBtn: () => cy.get('[data-testid="clear"]'),
        organizatorInputField: () => cy.get('[data-testid="edrpou"]'),
        organizatorCheckboxFirst: () => cy.get('input.FirmCheckbox_checkbox__2VlXV').eq(0),
        organizatorCheckboxSecond: () => cy.get('input.FirmCheckbox_checkbox__2VlXV').eq(1),
        organizatorCheckboxThird: () => cy.get('input.FirmCheckbox_checkbox__2VlXV').eq(2),
        organizatorCheckboxFirstName: () => cy.get('div.FirmCheckbox_firmName__6oVpu'),
        organizatorCheckboxSecondName: () => cy.get('div.FirmCheckbox_firmName__6oVpu'),
        organizatorCheckboxThirdName: () => cy.get('div.FirmCheckbox_firmName__6oVpu'),
        organizatorCheckboxName: () => cy.get('div.FirmCheckbox_firmName__6oVpu'),
        resertFiltersBtn: () => cy.get('[data-testid="resetFilters"]'),
        categoryItem: () => cy.get('div.ItemCategory_checkboxWithLabel__gvz5O'),
        categoryCheckbox: () => cy.get('.ItemCategory_checkbox__NE_uP[type="checkbox"]'),
        categorySubItem: () => cy.get('label[data-testid="label"]'),
        categorySubCheckbox: () => cy.get('.ItemService_checkbox__15BWs[type="checkbox"]'),
        filterAppliedName: () => cy.get('div.AppliedFilters_filter__PwGY_'),
        budgetFromItem: () => cy.get('[data-testid="budgetFrom"]'),
        budgetToItem: () => cy.get('[data-testid="budgetTo"]'),
        regionFilter: () => cy.get('div.TendersRegionFilter_captions__Jbd1l'),
        regionAllCheckbox: () => cy.get('#all'),

        regionItem: () => cy.get('.RegionsList_check_label__PY3uq[data-testid="label"]'),
        regionCheckbox: () => cy.get('.RegionsList_region__8dslR [type="checkbox"]'),

    };

    clickShowListBtn() {
        this.elements.showListBtn().click();
    }

    clickClearSearchTenderFieldBtn() {
        this.elements.clearSearchTenderFieldBtn().click();
    }

    clicktenderCardFirst() {
        this.elements.tenderCardFirst().click();
    }

    fillInSearchTenderField(text: string) {
        this.elements.searchTenderField().type(text);
    }

    fillInOrganizatorInputField(text: string) {
        this.elements.organizatorInputField().type(text);
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

    fillBudgetFrom(amount) {
        this.elements.budgetFromItem().clear().type(amount);
    }

    fillBudgetTo(amount) {
        this.elements.budgetToItem().clear().type(amount);
    }

    verifyFirstAndLastTenderCardElements() {
    // Перевіряємо першу картку
    this.elements.tenderCard().first().within(() => {
        this.elements.tenderCardName().should('exist');
        this.elements.tenderCardPrice().should('exist');
        this.elements.tenderCardOrganizationName().should('exist');
        this.elements.tenderCardTimer().should('exist');
    });

    // Перевіряємо останню картку
    this.elements.tenderCard().last().within(() => {
        this.elements.tenderCardName().should('exist');
        this.elements.tenderCardPrice().should('exist');
        this.elements.tenderCardOrganizationName().should('exist');
        this.elements.tenderCardTimer().should('exist');
    });
}
}

export default new TendersMapPage();