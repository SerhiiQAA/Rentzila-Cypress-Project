import BasePage from "./BasePage";

class CreateUnitPage extends BasePage {

  elements = {
    map: () => cy.get("#map"),
    searchResultsCardsNames: () => cy.get('[data-testid="unitName"]').first(),
    createUnitPageTitle: () => cy.get(".CreateEditFlowLayout_title__0A3ik"),
    tabsCreateUnit: () => cy.get('button[role="tab"]'),
    tabsNumbers: () => cy.get('[data-testid="labelNumber"]'),
    tabsTitles: () => cy.get(".CustomLabel_labelTitle__O2bFl"),
    mainInfoCategory: () => cy.get(".CategorySelect_title__W8Hgo"),
    categoryInputField: () => cy.get('[data-testid="buttonDiv"]'),
    categoryInputFieldArrow: () => cy.get('img[alt="Arrow-down"]'),
    nextBtn: () => cy.get('[data-testid="nextButton"]'),
    categoryErrorMessage: () => cy.get(".CategorySelect_errorTextVisible__1Oyzh"),
    categoryPopup: () => cy.get(".CategoryPopup_content__gOnMw"),
    categoryPopupTitle: () => cy.get(".CategoryPopup_title__19YOz"),
    categoryPopupCloseIcon: () => cy.get('[data-testid="closeIcon"]'),
    firstCategoryInPopup: () => cy.get('[data-testid="firstCategoryLabel"]'),
    secondCategoryInPopup: () => cy.get(".SecondCategory_check_label__CpNA3"),
    thirdCategoryInPopup: () => cy.get('[data-testid="thirdCategoryLabel"]'),
    customInput: () => cy.contains("Назва оголошення"),
    customInputField: () => cy.get('[maxlength="101"]'),
    customInputFieldErrorMessage: () =>
      cy.get('.CustomInput_inputError__L195T~[data-testid="descriptionError"]'),
    selectManufactureTitle: () => cy.get(".SelectManufacturer_title__X9AEw"),
    selectManufactureInput: () =>
      cy.get('[data-testid="input-customSelectWithSearch"]'),
    loupeIcon: () => cy.get(".CustomSelectWithSearch_searchInput__UySwA>svg"),
    selectManuctureErrorMessage: () =>
      cy.get(".CustomSelectWithSearch_errorTextVisible__B5lZH"),
    selectManufactureInputField: () =>
      cy.get(
        ".CustomSelectWithSearch_searchResult__qY1GJ.CustomSelectWithSearch_searchResultError__Q9xtO"
      ),
    selectManufacturDropdown: () =>
      cy.get(".CustomSelectWithSearch_searchedServicesCat_wrapper__aOGc3"),
    selectManufactureSearchResults: () =>
      cy.get('[data-testid="item-customSelectWithSearch"]'),
    absentManufacturerMessage: ()=> cy.get('[data-testid="p2-notFound-addNewItem"]'),
    modelInputTitle: () => cy.contains("Назва моделі"),
    modelInput: () => cy.get('[maxlength="25"]'),
    modelInputError: () => cy.get('[data-testid="descriptionError"]'),
    techDataTitle: () => cy.contains("Технічні характеристики"),
    techDataArea: () =>
      cy.get('[data-testid="textarea-customTextAriaDescription"]').first(),
    descriptionTitle: () => cy.contains("Детальний опис"),
    descriptionArea: () =>
      cy.get('[data-testid="textarea-customTextAriaDescription"]').last(),
    addressSelectionTitle: () => cy.get(".AddressSelectionBlock_title__pTi78"),
    addressSelectionField: () => cy.get('[data-testid="mapLabel"]'),
    addressSelectionErrorMessage: () =>
      cy.get(".AddressSelectionBlock_errorTextVisible__IAGKS"),
    selectOnMapBtn: () => cy.get(".AddressSelectionBlock_locationBtn__IvqEL"),
    mapPopup: () => cy.get('[data-testid="div-mapPopup"]'),
    mapPopupTitle: () => cy.get(".MapPopup_title__ykbd3"),
    mapPopupCloseIcon: () => cy.get(".MapPopup_icon__aJopq"),
    mapPopupAddressInputField: () => cy.get('[data-testid="address"]'),
    mapElementPopup: () => cy.get(".MapPopup_map__ss3EW"),
    cancelBtn: () => cy.get('[data-testid="prevButton"]'),
    confirmSelectionOnMapBtn: () =>
      cy.get(".ItemButtons_darkBlueBtn__juupv.ItemButtons_fullWidth__3HqA0"),
    validManufacturer: () =>
      cy
        .get('[data-testid="item-customSelectWithSearch"]')
        .contains("AEBI SCHMIDT"),
  };

  clickNextBtn() {
    this.elements.nextBtn().click();
  }

  clickCategoryInputField() {
    this.elements.categoryInputField().click();
  }

  clickCategoryPopupCloseIcon() {
    this.elements.categoryPopupCloseIcon().click();
  }

  clickOutsidePopup() {
    cy.get("body").click("topLeft");
  }

  clickSelectOnMapBtn() {
    this.elements.selectOnMapBtn().click();
  }

  clickMapPopupCloseIcon() {
    this.elements.mapPopupCloseIcon().click();
  }

  clickCancelBtn() {
    this.elements.cancelBtn().click();
  }

  clearCustomInputField() {
    this.elements.customInputField().clear();
  }

  clearSelectManufactureInput() {
    this.elements.selectManufactureInput().clear();
  }

  fillCustomInputField(text: string) {
    this.elements.customInputField().clear().type(text);
  }
  fillSelectManufactureInput(option: string) {
    this.elements.selectManufactureInput().type(option, { delay: 200 });
  }

  fillModelInput(option: string) {
    this.elements.modelInput().clear().type(option);
  }

  fillTechDataArea(text: string) {
    this.elements.techDataArea().type(text, { delay: 0, timeout: 10000 });
  }

  fillDescription(text: string) {
    this.elements.descriptionArea().type(text);
  }

  fillAllValidData() {
    this.elements.categoryInputField().click();
    this.elements.firstCategoryInPopup().eq(1).click();
    this.elements.secondCategoryInPopup().first().click();
    this.elements.thirdCategoryInPopup().first().click();
    this.fillCustomInputField("test announcement");
    this.elements.selectManufactureInput().type("AEBI SCHMIDT");
    this.elements.validManufacturer().click();
    this.clickSelectOnMapBtn();
    this.elements.confirmSelectionOnMapBtn().click();
  }

  pasteInputField(text: string) {
    this.elements
      .customInputField()
      .clear()
      .invoke("val", text)
      .trigger("input");
  }

  pasteSelectManufacture(text: string) {
    this.elements
      .selectManufactureInput()
      .clear()
      .invoke("val", text)
      .trigger("input");
  }

  pasteModelInput(text: string) {
    this.elements.modelInput().clear().invoke("val", text).trigger("input");
  }

  pasteTechDataArea(text: string) {
    this.elements.techDataArea().clear().invoke("val", text).trigger("input");
  }

  pasteDescription(text: string) {
    this.elements.descriptionArea().clear().invoke("val", text).trigger("input");
  }

  selectNewAddress() {
    this.elements.mapElementPopup().click(150, 150, { timeout: 2000 });
  }

  openPopup() {
    cy.get('[data-testid="buttonDiv"]').as("popup").click();
  }
}

export default new CreateUnitPage();
