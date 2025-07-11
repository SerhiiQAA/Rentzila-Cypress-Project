import BasePage from "../BasePage";

class TenderCreatePage extends BasePage {
  elements = {
    tenderNameInput: () => cy.get('[data-testid="custom-input"]').eq(0),
    findServiceInput: () =>
      cy.get('[data-testid="input-customSelectWithSearch"]'),
    findServiceInputSelected: () =>
      cy.get('[class*="CustomSelectWithSearch_serviceText"]'),
    serviceListBtn: () => cy.get('[data-testid="item-customSelectWithSearch"]'),
    serviceListCloseBtn: () => cy.get('[data-testid="closeButton"]'),
    dateBeginningBtn: () => cy.get('[data-testid="datePicker"]').eq(0),
    dateBeginningData: () =>
      cy.get('.react-datepicker-wrapper div input[type="text"]').eq(0),
    dateEndingBtn: () => cy.get('[data-testid="datePicker"]').eq(1),
    dateEndingData: () =>
      cy.get('.react-datepicker-wrapper div input[type="text"]').eq(1),
    datePeriodOfWorkBtn: () => cy.get('[data-testid="datePicker"]').eq(2),
    dateNextMonthBtn: () => cy.get('button[aria-label="Next Month"]'),
    dateCalendarTimeBtn: () =>
      cy.get(".react-datepicker__time-list-item--selected"),
    budgetInput: () =>
      cy.get(
        '[class*="CreateItemPrice_flexRow"] > [data-testid="customInputWrapper"] > :nth-child(2) > [data-testid="custom-input"]'
      ),
    placeWorkMapBtn: () => cy.get('[data-testid="choseOnMap"]'),
    placeWorkMapConfirmBtn: () => cy.get('[class*="ItemButtons_darkBlueBtn"]'),
    additionalInformationInput: () => cy.get('[data-testid="textAreaInput"]'),
    nextBtn: () => cy.get('[data-testid="nextButton"]'),
    tenderNameInputErrorMsg: () =>
      cy.get('[data-testid="descriptionError"]').eq(0),
    findServiceInputErrorMsg: () =>
      cy.get('div[class*="CustomSelectWithSearch_errorTextVisible"]'),
    findServiceModalErrorMsg: () =>
      cy.get('[data-testid="p2-notFound-addNewItem"]'),
    dateEndingErrorMsg: () =>
      cy.get('div[class*="DateContainer_errorTextVisible"]'),
    budgetInputErrorMsg: () => cy.get('[data-testid="descriptionError"]'),
    placeWorkMapErrorMsg: () =>
      cy.get('[class*="AddressSelectionBlock_errorTextVisible"]'),
    additionalInformationErrorMsg: () =>
      cy.get('[data-testid="textAreaError"]'),
    allErrorMsg: () => cy.get(".error-message"),
    closeTelegramBtn: () => cy.get('[data-testid="crossButton"]'),
    firstServiceOptionFromInputDropdown: () =>
      cy.get(':nth-child(1) > [data-testid="item-customSelectWithSearch"]'),
  };

  clickNextBtn() {
    this.elements.nextBtn().click();
  }

  clickCloseTelegramBtn() {
    this.elements.closeTelegramBtn().click();
  }

  clickServiceListCloseBtn() {
    this.elements.serviceListCloseBtn().click();
  }

  clickDateCalendarTimeBtn() {
    this.elements.dateCalendarTimeBtn().click();
  }

  clickDateBeginningBtn() {
    this.elements.dateBeginningBtn().click();
  }

  clickDateEndingBtn() {
    this.elements.dateEndingBtn().click();
  }

  clickDatePeriodOfWorkBtn() {
    this.elements.datePeriodOfWorkBtn().click();
  }

  clickFirstServiceOptionFromInputDropdown() {
    this.elements.firstServiceOptionFromInputDropdown().click();
  }

  fillTenderNameInput(value) {
    this.elements.tenderNameInput().clear().type(value);
  }

  fillBudgetInput(value) {
    this.elements.budgetInput().clear().type(value);
  }

  validateAllErrorMsg() {
    const errors = [
      {
        element: this.elements.tenderNameInputErrorMsg,
        expectedText: "Назва має містити щонайменше 10 символів",
      },
      {
        element: this.elements.findServiceInputErrorMsg,
        expectedText: "Це поле обов’язкове",
      },
      {
        element: this.elements.dateEndingErrorMsg,
        expectedText: "Це поле обов’язкове",
      },
      {
        element: this.elements.budgetInputErrorMsg,
        expectedText: "Це поле обов’язкове",
      },
      {
        element: this.elements.placeWorkMapErrorMsg,
        expectedText: "Виберіть коректне місце на мапі України",
      },
      {
        element: this.elements.additionalInformationErrorMsg,
        expectedText: "Опис має містити щонайменше 40 символів (0)",
      },
    ];

    errors.forEach(({ element, expectedText }) => {
      element().should("have.text", expectedText);
    });
  }

  validateNoErrorMsg() {
    const errors = [
      this.elements.tenderNameInputErrorMsg,
      this.elements.findServiceInputErrorMsg,
      this.elements.dateEndingErrorMsg,
      this.elements.budgetInputErrorMsg,
      this.elements.placeWorkMapErrorMsg,
      this.elements.additionalInformationErrorMsg,
    ];

    errors.forEach((errorElement) => {
      errorElement().should("have.length", 0);
    });
  }

  selectDateEnding(day) {
    this.elements.dateEndingBtn().click();
    cy.get(
      `.react-datepicker__day--${day.toString().padStart(3, "0")}`
    ).click();
    this.elements.dateCalendarTimeBtn().click();
  }

  selectDatePeriodOfWorkBtn(startDay) {
    this.elements.datePeriodOfWorkBtn().click();
    cy.get(
      `.react-datepicker__day--${startDay.toString().padStart(3, "0")}`
    ).click();
    const endDay = startDay + 2;
    cy.get(
      `.react-datepicker__day--${endDay.toString().padStart(3, "0")}`
    ).click();
  }

  fillAllFields() {
    this.elements.tenderNameInput().type("Перевезення зерна");
    this.elements.findServiceInput().type("Перевезення урожаю");
    this.elements.serviceListBtn().contains("Перевезення урожаю").click();
    this.selectDateEnding(20);
    this.selectDatePeriodOfWorkBtn(25);
    this.elements.budgetInput().type("1");
    this.elements.placeWorkMapBtn().click();
    this.elements.placeWorkMapConfirmBtn().click();
    this.elements
      .additionalInformationInput()
      .type("Цей тендер надає послуги з перевезення зерна");
  }
}

export default new TenderCreatePage();
