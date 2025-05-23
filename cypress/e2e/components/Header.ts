class Header {
  elements = {
    logoBtn: () => cy.get('[data-testid="logo"]').eq(0),
    announcementBtn: () => cy.get(".Navbar_link__UhyJF").eq(0),
    jobRequestsBtn: () => cy.get(".Navbar_link__UhyJF").eq(1),
    tendersBtn: () => cy.get(".Navbar_link__UhyJF").eq(2),
    adAnnouncementBtn: () => cy.get(".Navbar_addAnnouncement__ZFXeC"),
    languageBtn: () => cy.get(".Navbar_variantsContainer__stc8e"),
    catalogBtn: () => cy.get("div .NavbarCatalog_label__s1meA"),
    searchFieldInput: ()=> cy.get('header input[data-testid="searchInput"]').first(),
    mainSearchInputCity: () => cy.get("div .AutocompleteInput_city__p_OgU"),
    signInBtn: () => cy.get("div .NavbarAuthBlock_buttonEnter__c9siH"),
    searchDropdown: ()=> cy.get('header .MainSearch_popup_wrapper__w7qVk'),
    searchHistoryPopup: ()=> cy.get('h6').contains('Історія пошуку'),
    servicesInSearchDropdown: ()=> cy.get('[data-testid="services"]>.SearchResultItem_item_name__SXnXJ'),
    categoriesInSearchDropdown: ()=> cy.get('[data-testid="services"]>.SearchResultItem_item_name__SXnXJ'),
    settingsBtn: () => cy.get('div[data-testid="superuserIcon_Navbar"]'),    
    searchFieldInput: () =>
      cy.get('header input[data-testid="searchInput"]').first(),
    mainSearchInputCity: () => cy.get("div .AutocompleteInput_city__p_OgU"),
    searchDropdown: () => cy.get("header .MainSearch_popup_wrapper__w7qVk"),
    searchHistoryPopup: () => cy.get("h6").contains("Історія пошуку"),
    servicesInSearchDropdown: () =>
      cy.get('[data-testid="services"]>.SearchResultItem_item_name__SXnXJ'),
    categoriesInSearchDropdown: () =>
      cy.get('[data-testid="services"]>.SearchResultItem_item_name__SXnXJ'),
    settingsBtn: () => cy.get('div[data-testid="superuserIcon_Navbar"]'),
    signInBtn: () => cy.contains("Вхід"),
    userBtn: () => cy.get(".NavbarAuthBlock_iconWrapper__tFste"),
    userDropdownEmail: () => cy.get('div[data-testid="email"]'),
    userDropdownLogoutBtn: () => cy.get('div[data-testid="logout"]'),
    userDropdownAccountBtn: () => cy.contains("Мій профіль"),
  };

  clickLogoBtn() {
    this.elements.logoBtn().click();
  }

  clickSettingsBtn() {
    this.elements.settingsBtn().click();
  }

  clickAnnouncementBtn() {
    this.elements.announcementBtn().click();
  }

  clickJobRequestsBtn() {
    this.elements.jobRequestsBtn().click();
  }

  clickTendersBtn() {
    this.elements.tendersBtn().click();
  }

  clickAdAnnouncementBtn() {
    this.elements.adAnnouncementBtn().click();
  }

  clickLanguageBtn() {
    this.elements.languageBtn().click();
  }

  clickCatalogBtn() {
    this.elements.catalogBtn().click();
  }

  fillSearchFieldInput(text: string) {
    this.elements.searchFieldInput().type(text);
  }

  typeInMainSearchInputCity(city: string) {
    this.elements.mainSearchInputCity().type(city);
  }

  clickSignInBtn() {
    this.elements.signInBtn().click();
  }

   clickSearchFieldInput(){
    this.elements.searchFieldInput().click();
  }

  pressEnterOnSearchFieldInput(){
    this.elements.searchFieldInput().type('{enter}');
  }

  clickSearchFieldInput() {
    this.elements.searchFieldInput().click();
  }

  pressEnterOnSearchFieldInput() {
    this.elements.searchFieldInput().type("{enter}");
  }

  clickUserBtn() {
    this.elements.userBtn().click();
  }

  clickUserDropdownLogoutBtn() {
    this.elements.userDropdownLogoutBtn().click();
  }

  clickUserDropdownAccountBtn() {
    this.elements.userDropdownAccountBtn().click();
  }
}

export default new Header();

