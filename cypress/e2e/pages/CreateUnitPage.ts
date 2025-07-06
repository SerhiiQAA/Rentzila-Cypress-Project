import BasePage from "./BasePage";

class CreateUnitPage extends BasePage {
  elements = {
    map: () => cy.get("#map"),
    searchResultsCardsNames: () => cy.get('[data-testid="unitName"]').first(),
    createUnitPageTitle: () => cy.get("[class^='CreateEditFlowLayout_title']"),
    tabsCreateUnit: () => cy.get('button[role="tab"]'),
    tabsNumbers: () => cy.get('[data-testid="labelNumber"]'),
    tabsTitles: () => cy.get("[class^='CustomLabel_labelTitle']"),
    mainInfoCategory: () => cy.get("[class^='CategorySelect_title']"),
    categoryInputField: () => cy.get('[data-testid="buttonDiv"]'),
    categoryInputFieldArrow: () => cy.get('img[alt="Arrow-down"]'),
    nextBtn: () => cy.get('[data-testid="nextButton"]'),
    categoryErrorMessage: () =>
      cy.get("[class^='CategorySelect_errorTextVisible']"),
    categoryPopup: () => cy.get("[class^='CategoryPopup_content']"),
    categoryPopupTitle: () => cy.get("[class^='CategoryPopup_title']"),
    categoryPopupCloseIcon: () => cy.get('[data-testid="closeIcon"]'),
    firstCategoryInPopup: () => cy.get('[data-testid="firstCategoryLabel"]'),
    secondCategoryInPopup: () => cy.get("[class^='SecondCategory_check_label']"),
    thirdCategoryInPopup: () => cy.get('[data-testid="thirdCategoryLabel"]'),
    customInput: () => cy.contains("Назва оголошення"),
    customInputField: () => cy.get('[maxlength="101"]'),
    customInputFieldErrorMessage: () =>
      cy.get('.CustomInput_inputError__L195T~[data-testid="descriptionError"]'),
    selectManufactureTitle: () => cy.get("[class^='SelectManufacturer_title']"),
    selectManufactureInput: () =>
      cy.get('[data-testid="input-customSelectWithSearch"]'),
    loupeIcon: () => cy.get("[class^='CustomSelectWithSearch_searchInput']"),
    selectManuctureErrorMessage: () =>
      cy.get("[class^='CustomSelectWithSearch_errorTextVisible']"),
    selectManufactureInputField: () =>
      cy.get(
        ".CustomSelectWithSearch_searchResult__qY1GJ.CustomSelectWithSearch_searchResultError__Q9xtO"
      ),
    selectManufacturDropdown: () =>
      cy.get("[class^='CustomSelectWithSearch_searchedServicesCat_wrapper']"),
    selectManufactureSearchResults: () =>
      cy.get('[data-testid="item-customSelectWithSearch"]'),
    absentManufacturerMessage: () =>
      cy.get('[data-testid="p2-notFound-addNewItem"]'),
    modelInputTitle: () => cy.contains("Назва моделі"),
    modelInput: () => cy.get('[maxlength="25"]'),
    modelInputError: () => cy.get('[data-testid="descriptionError"]'),
    techDataTitle: () => cy.contains("Технічні характеристики"),
    techDataArea: () =>
      cy.get('[data-testid="textarea-customTextAriaDescription"]').first(),
    descriptionTitle: () => cy.contains("Детальний опис"),
    descriptionArea: () =>
      cy.get('[data-testid="textarea-customTextAriaDescription"]').last(),
    addressSelectionTitle: () => cy.get("[class^='AddressSelectionBlock_title']"),
    addressSelectionField: () => cy.get('[data-testid="mapLabel"]'),
    addressSelectionErrorMessage: () =>
      cy.get("[class^='AddressSelectionBlock_errorTextVisible']"),
    selectOnMapBtn: () => cy.get("[class^='AddressSelectionBlock_locationBtn']"),
    mapPopup: () => cy.get('[data-testid="div-mapPopup"]'),
    mapPopupTitle: () => cy.get("[class^='MapPopup_title']"),
    mapPopupCloseIcon: () => cy.get("[class^='MapPopup_icon']"),
    mapPopupAddressInputField: () => cy.get('[data-testid="address"]'),
    mapElementPopup: () => cy.get("[class^='MapPopup_map']"),
    cancelBtn: () => cy.get('[data-testid="prevButton"]'),
    confirmSelectionOnMapBtn: () =>
      cy.get("[class^='ItemButtons_darkBlueBtn'][class^='ItemButtons_fullWidth']"),
    validManufacturer: () =>
      cy
        .get('[data-testid="item-customSelectWithSearch"]')
        .contains("AEBI SCHMIDT"),
    imageUploadTitle: () => cy.get("[class^='ImagesUnitFlow_paragraph']"),
    clueImageLine: () => cy.get('[data-testid="description"]'),
    imageUploadBlock: () => cy.get('[data-testid="imageBlock"]'),
    fileInput: () => cy.get('[data-testid="input_ImagesUnitFlow"]'),
    mainImageLabel: () => cy.get("[data-testid='mainImageLabel']"),
    unitImage: () => cy.get('[data-testid="unitImage"]'),
    deleteImageIcon: () => cy.get('[data-testid="deleteImage"]'),
    invalidImagePopup: () => cy.get('[class^="NotValidImagePopup_wrap"]'),
    crossIconInvalidImagePopup: () => cy.get('[data-testid="crossIcon"]'),
    uploadedImage: () => cy.get('[class*="ImagesUnitFlow_fullSize"]'),
    invalidImagePopupBtn: () => cy.get('[class^="ItemButtons_wrapper"]'),
    servicesTabTitle: () => cy.get('[class^="ServicesUnitFlow_title"]'),
  };

  clickNextBtn() {
    this.elements.nextBtn().click({ timeout: 30000 });
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

  clickUploadElement(index: number) {
    this.elements.imageUploadBlock().eq(index).click();
  }

  clickCrossIconInvalidImagePopup() {
    this.elements.crossIconInvalidImagePopup().click();
  }

  clickInvalidImagePopupBtn() {
    this.elements.invalidImagePopupBtn().click();
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
    this.elements
      .descriptionArea()
      .clear()
      .invoke("val", text)
      .trigger("input");
  }

  selectNewAddress() {
    this.elements.mapElementPopup().click(150, 150, { timeout: 2000 });
  }

  openPopup() {
    cy.get('[data-testid="buttonDiv"]').click();
  }

  uploadImage(imageName: string) {
    this.elements
      .fileInput()
      .selectFile(`cypress/fixtures/${imageName}`, { force: true });
  }

  dragImage(fromIndex: number, toIndex: number) {
    this.elements
      .unitImage()
      .eq(fromIndex)
      .drag(`[data-testid="unitImage"]:eq(${toIndex})`);
  }
}

export default new CreateUnitPage();
