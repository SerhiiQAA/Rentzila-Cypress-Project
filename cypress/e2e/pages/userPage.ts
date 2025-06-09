import BasePage from "./BasePage";

class UserPage extends BasePage {
  elements = {
    entityTypeSelect: () =>
      cy
        .contains("Тип особи, до якої належите")
        .parent()
        .find('[data-testid="div_CustomSelect"]'),
    legalEntityTypeSelect: () =>
      cy
        .contains("Тип юридичної особи")
        .parent()
        .find('[data-testid="div_CustomSelect"]'),
    privateEntityIdInput: () => this.getCustomInput("РНОКПП (ІПН)"),
    individualEntrepreneurIdInput: () =>
      this.getCustomInput("РНОКПП (ІПН) для ФОП"),
    legalEntityIdInput: () => this.getCustomInput("ЄДРПОУ для юридичних осіб "),
    legalEntityNameInput: () => this.getCustomInput("Назва юридичної особи"),
    lastNameInput: () => this.getCustomInput("Прізвище"),
    nameInput: () => this.getCustomInput("Ім'я"),
    patronimInput: () => this.getCustomInput("По-батькові"),
    cityInput: () => this.getCustomInput("Місто"),
    profileNumberInput: () =>
      cy
        .contains("Номер телефону")
        .parent()
        .find('[data-testid="input_OwnerProfileNumber"]'),
    profileNumberLbl: () => cy.contains("Номер телефону"),
    profileEmailInput: () => this.getCustomInput("Email"),
    smsBtn: () => cy.contains("SMS"),
    smsCodeInput: () => cy.get('[data-testid="smsInput"]'),
    verifyNumberBtn: () => cy.contains("Верифікувати номер телефону"),
    sendSmsAgainBtn: () => cy.get('[data-testid="sendSmsAgain"]'),
    saveBtn: () => cy.get('[data-testid="nextButton"]'),
    viberInput: () => cy.contains("Viber").parent().find("#mobile"),
    telegramInput: () =>
      cy
        .contains('[data-testid="customInputWrapper"]', "Telegram")
        .parent()
        .find('[data-testid="custom-input"]'),
    choosePhotoBtn: () => cy.get('input[data-testid="leftsideFile"]'),
    userAvatar: () => cy.get('[data-testid="photo"]'),
    phoneError: () => cy.get('[data-testid="phoneError_OwnerProfileNumber"]'),
    imageError: () => cy.get('[data-testid="errorPopup"]'),
    codeError: () => cy.contains("Введений код невірний"),
    notification: () =>
      cy.get(
        '[data-testid="notificationContainer"] .NotificationLikePopup_description__htlK7',
        { timeout: 5000 }
      ),
    uploadModalUnderstoodBtn: () => cy.contains("Зрозуміло"),
    uploadModalCloseBtn: () => cy.get('[data-testid="closeIcon"]'),
  };

  visit(path?: string): void {
    super.visit("/owner-cabinet/");
  }

  getCustomInput(title: string) {
    return cy.contains(title).parent().find('[data-testid="custom-input"]');
  }

  fillNameInput(name: string) {
    this.elements.nameInput().clear().type(name);
  }

  fillLastNameInput(surname: string) {
    this.elements.lastNameInput().clear().type(surname);
  }

  fillPatronimInput(patronim: string) {
    this.elements.patronimInput().clear().type(patronim);
  }

  fillCity(city: string) {
    this.elements.cityInput().clear().type(city);
  }

  fillNumber(number: string) {
    this.elements.profileNumberInput().clear().type(number);
  }
  fillSmsCode(code: string) {
    this.elements.smsCodeInput().clear().type(code);
  }

  fillViber(number: string) {
    this.elements.viberInput().clear().type(number);
  }

  fillTelegram(telegram: string) {
    this.elements.telegramInput().clear().type(telegram);
  }

  fillPrivateEntityId(id: string) {
    this.elements.privateEntityIdInput().clear().type(id);
  }

  fillIndividualEntrepreneurId(id: string) {
    this.elements.individualEntrepreneurIdInput().clear().type(id);
  }

  fillLegalEntityId(id: string) {
    this.elements.legalEntityIdInput().clear().type(id);
  }

  fillLegalEntityName(name: string) {
    this.elements.legalEntityNameInput().clear().type(name);
  }

  clearPersonalInformation() {
    this.elements.nameInput().clear();
    this.elements.lastNameInput().clear();
    this.elements.patronimInput().clear();
  }

  clickSmsBtn() {
    this.elements.smsBtn().click();
  }

  clickVerifyNumberBtn() {
    this.elements.verifyNumberBtn().click();
  }

  clickSendSmsAgainBtn() {
    this.elements.sendSmsAgainBtn().click();
  }

  clickNextBtn() {
    this.elements.saveBtn().click();
  }

  clickUnderstoodBtn(){
    this.elements.uploadModalUnderstoodBtn().click();
  }

  clickCloseUploadModal(){
    this.elements.uploadModalCloseBtn().click();
  }

  clickOutside(){
    cy.get("body").click(0, 0);
  }

  selectEntityType(option: string) {
    this.elements.entityTypeSelect().click();
    this.elements.entityTypeSelect().contains(option).click();
  }

  selectLegalEntityType(option: string) {
    this.elements.legalEntityTypeSelect().click();
    this.elements.legalEntityTypeSelect().contains(option).click();
  }

  selectPhoto(imagePath: string) {
    this.elements.choosePhotoBtn().selectFile(imagePath, { force: true });
  }

  fillPersonalInfo(lastName, name, patronim, viber, telegram, city) {
    this.fillLastNameInput(lastName);
    this.fillNameInput(name);
    this.fillPatronimInput(patronim);
    this.fillCity(city);
    this.fillViber(viber);
    this.fillTelegram(telegram);
  }
}
export default new UserPage();
