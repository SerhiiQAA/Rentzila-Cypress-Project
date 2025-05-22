class Header {
  elements = {
    logoBtn: () => cy.get('[data-testid="logo"]').eq(0),
    announcementBtn: () => cy.get(".Navbar_link__UhyJF").eq(0),
    jobRequestsBtn: () => cy.get(".Navbar_link__UhyJF").eq(1),
    tendersBtn: () => cy.get(".Navbar_link__UhyJF").eq(2),
    adAnnouncementBtn: () => cy.get(".Navbar_addAnnouncement__ZFXeC"),
    languageBtn: () => cy.get(".Navbar_variantsContainer__stc8e"),
    catalogBtn: () => cy.get("div .NavbarCatalog_label__s1meA"),
    mainSearchInput: () => cy.get("div .MainSearch_input__Kr9pB"),
    mainSearchInputCity: () => cy.get("div .AutocompleteInput_city__p_OgU"),
    signInBtn: () => cy.get("div .NavbarAuthBlock_buttonEnter__c9siH"),
  };

  clickLogoBtn() {
    this.elements.logoBtn().click();
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

  typeInMainSearchInput(text: string) {
    this.elements.mainSearchInput().type(text);
  }

  typeInMainSearchInputCity(city: string) {
    this.elements.mainSearchInputCity().type(city);
  }

  clickSignInBtn() {
    this.elements.signInBtn().click();
  }
}

export default new Header();
