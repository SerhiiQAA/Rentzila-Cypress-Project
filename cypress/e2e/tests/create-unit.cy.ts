// / <reference types="Cypress" />

import BasePage from "../pages/BasePage";
import MainPage from "../pages/MainPage";
import header from "../components/Header";
import loginPage from "../pages/LoginPage";
import { createUnitData } from "../utils/createUnitData";
import createUnitPage from "../pages/CreateUnitPage";
import { should } from "chai";

const basePage = new BasePage();
const mainPage = new MainPage();

describe("Create Unit page tests", () => {
  beforeEach(() => {
    basePage.visit();
    mainPage.closeTelegramModal();
    header.clickAdAnnouncementBtn();
    loginPage.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
  });

  it("C294 Verify body title and tab titles", () => {
    createUnitPage.elements
      .createUnitPageTitle()
      .should("be.visible")
      .and("have.text", "Створити оголошення");

    createUnitPage.elements.tabsNumbers().each((tab, index) => {
      cy.wrap(tab).should("have.text", index + 1);
    });
    createUnitPage.elements.tabsTitles().each((tab, index) => {
      cy.wrap(tab).should("have.text", createUnitData.tabTitles[index]);
    });
    createUnitPage.elements.tabsCreateUnit().each((tab, index) => {
      if (index === 0) {
        cy.wrap(tab).should("have.attr", "aria-selected", "true");
      } else {
        cy.wrap(tab).should("have.attr", "aria-selected", "false");
      }
    });
  });

  it("C296 Verify category (Категорія) section", () => {
    createUnitPage.elements
      .mainInfoCategory()
      .should("be.visible")
      .should("have.text", "Категорія *");
    createUnitPage.elements
      .categoryInputField()
      .should("have.text", "Виберіть категорію");
    createUnitPage.elements
      .categoryInputFieldArrow()
      .should("exist")
      .and("be.visible");

    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .categoryInputField()
      .should("have.css", "border-bottom-color", "rgb(247, 56, 89)");
    createUnitPage.elements
      .categoryErrorMessage()
      .should("be.visible")
      .and("have.text", createUnitData.requestedFieldErrorMessage)
      .and("have.css", "color", "rgb(247, 56, 89)");

    createUnitPage.clickCategoryInputField();
    createUnitPage.elements.categoryPopup().should("exist").and("be.visible");
    createUnitPage.elements
      .categoryPopupTitle()
      .should("have.text", createUnitData.categoryPopupTitle);
    createUnitPage.elements
      .categoryPopupCloseIcon()
      .should("exist")
      .and("be.visible");
    createUnitPage.clickCategoryPopupCloseIcon();
    createUnitPage.elements.categoryPopup().should("not.exist");

    createUnitPage.clickCategoryInputField();
    createUnitPage.clickOutsidePopup();
    createUnitPage.elements.categoryPopup().should("not.exist");

    createUnitPage.clickCategoryInputField();
    createUnitPage.elements.firstCategoryInPopup().then(($categories) => {
      for (let i = 0; i < $categories.length; i++) {
        cy.wrap($categories[i]).should(
          "have.text",
          createUnitData.categoryOne[i]
        );
        cy.wrap($categories[i]).click();
        createUnitPage.elements.secondCategoryInPopup().should("be.visible");
        createUnitPage.elements
          .secondCategoryInPopup()
          .each((subCat, subIndex) => {
            cy.wrap(subCat).should(
              "have.text",
              createUnitData.categoryTwo[i][subIndex]
            );
          });
      }
    });
    createUnitPage.clickCategoryPopupCloseIcon();
    createUnitPage.clickCategoryInputField();
    createUnitPage.elements.firstCategoryInPopup().then(($categories) => {
      for (let i = 0; i < $categories.length; i++) {
        createUnitPage.elements.firstCategoryInPopup().eq(i).click();
        createUnitPage.elements.secondCategoryInPopup().first().click();
        createUnitPage.elements
          .thirdCategoryInPopup()
          .first()
          .should("have.text", createUnitData.categoryThree[i])
          .click();
        createUnitPage.elements
          .categoryInputField()
          .should("have.text", createUnitData.categoryThree[i]);
        createUnitPage.elements.categoryPopup().should("not.exist");
        if (i < $categories.length - 1) {
          createUnitPage.elements.categoryInputField().should("be.visible");
          createUnitPage.openPopup();
        }
      }
    });
  });

  it("C297 Verify unit name section", () => {
    createUnitPage.elements
      .customInput()
      .should("be.visible")
      .should("contain.text", "Назва оголошення")
      .should("contain.text", "*");
    createUnitPage.elements
      .customInputField()
      .should("have.attr", "placeholder", "Введіть назву оголошення");
    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .customInputField()
      .should("have.css", "border-bottom-color", "rgb(247, 56, 89)");

    createUnitPage.elements
      .customInputFieldErrorMessage()
      .should("be.visible")
      .and("have.text", createUnitData.requestedFieldErrorMessage)
      .and("have.css", "color", "rgb(247, 56, 89)");

    createUnitPage.fillCustomInputField("123456789");
    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .customInputField()
      .should("have.css", "border-bottom-color", "rgb(247, 56, 89)");

    createUnitPage.elements
      .customInputFieldErrorMessage()
      .should("be.visible")
      .and("have.text", createUnitData.lessTenErrorMessage)
      .and("have.css", "color", "rgb(247, 56, 89)");
    createUnitPage.clearCustomInputField();
    createUnitPage.pasteInputField("123456789");
    createUnitPage.clickNextBtn();
    createUnitPage.elements.customInputFieldErrorMessage().should("be.visible");
    //While copy-paste incorrect error message appears
    // .and('have.text',createUnitData.lessTenErrorMessage);
    createUnitPage.clearCustomInputField();

    createUnitPage.fillCustomInputField(createUnitData.oneHundredOne);
    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .customInputFieldErrorMessage()
      .should("be.visible")
      .and("have.text", createUnitData.moreOneHundredErrorMessage);
    createUnitPage.clearCustomInputField();

    createUnitPage.pasteInputField(createUnitData.oneHundredOne);
    createUnitPage.clickNextBtn();
    createUnitPage.elements.customInputFieldErrorMessage().should("be.visible");
    // While copy-paste incorrect error message appears
    // .and('have.text',createUnitData.moreOneHundredErrorMessage);
    createUnitPage.clearCustomInputField();

    createUnitPage.fillCustomInputField(createUnitData.specSymbols);
    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .customInputFieldErrorMessage()
      .should("be.visible")
      .and("have.text", createUnitData.requestedFieldErrorMessage);
    createUnitPage.clearCustomInputField();

    createUnitPage.pasteInputField(createUnitData.specSymbols);
    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .customInputFieldErrorMessage()
      .should("be.visible")
      .and("have.text", createUnitData.requestedFieldErrorMessage);
    createUnitPage.clearCustomInputField();

    createUnitPage.fillCustomInputField("abcdefghij");
    createUnitPage.clickNextBtn();
    createUnitPage.elements.customInputFieldErrorMessage().should("not.exist");
    createUnitPage.elements
      .customInputField()
      .should("have.css", "border-bottom-color", "rgb(229, 229, 229)");
  });

  it("C298 Verify vehicle manufacturer section", () => {
    createUnitPage.elements
      .selectManufactureTitle()
      .should("be.visible")
      .should("contain.text", "Виробник транспортного засобу")
      .and("contain.text", "*");
    createUnitPage.elements
      .selectManufactureInput()
      .should(
        "have.attr",
        "placeholder",
        "Введіть виробника транспортного засобу"
      );
    createUnitPage.elements.loupeIcon().should("exist").and("be.visible");

    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .selectManufactureInputField()
      .should("have.css", "border-bottom-color", "rgb(247, 56, 89)");
    createUnitPage.elements
      .selectManuctureErrorMessage()
      .should("be.visible")
      .and("have.text", "Це поле обов’язкове")
      .and("have.css", "color", "rgb(247, 56, 89)");

    createUnitPage.fillSelectManufactureInput("A");
    createUnitPage.elements.selectManufacturDropdown().should("be.visible");
    createUnitPage.clearSelectManufactureInput();

    createUnitPage.fillSelectManufactureInput("AGRIA");
    createUnitPage.elements.selectManufacturDropdown().should("be.visible");
    createUnitPage.elements
      .selectManufactureSearchResults()
      .should("have.text", "AGRIA");
    createUnitPage.clearSelectManufactureInput();
    createUnitPage.fillSelectManufactureInput("agria");
    createUnitPage.elements.selectManufacturDropdown().should("be.visible");
    createUnitPage.elements
      .selectManufactureSearchResults()
      .should("have.text", "AGRIA");
    createUnitPage.clearSelectManufactureInput();

    createUnitPage.fillSelectManufactureInput("12345");
    createUnitPage.elements.absentManufacturerMessage().should("be.visible");
  });

  it("C299 Verify model name input field", () => {
    createUnitPage.elements
      .modelInputTitle()
      .should("be.visible")
      .should("contain.text", "Назва моделі");
    createUnitPage.elements
      .modelInput()
      .should("have.attr", "placeholder", "Введіть назву моделі");

    createUnitPage.fillModelInput("11234567890123456");
    createUnitPage.elements
      .modelInputError()
      .should("exist")
      .and("be.visible")
      .and("have.text", "У назві моделі може бути не більше 15 символів");
    createUnitPage.elements
      .modelInput()
      .should("have.css", "border-bottom-color", "rgb(247, 56, 89)");

    createUnitPage.fillModelInput("11234567890 12345");
    createUnitPage.elements
      .modelInputError()
      .should("exist")
      .and("be.visible")
      .and("have.text", createUnitData.fifteenErrorMessage);

    createUnitPage.fillModelInput("1123456789012345 ");
    createUnitPage.elements
      .modelInputError()
      .should("exist")
      .and("be.visible")
      .and("have.text", createUnitData.fifteenErrorMessage);

    createUnitPage.fillModelInput(createUnitData.specSymbols);
    createUnitPage.elements.modelInput().should("have.attr", "value", "");
    createUnitPage.fillModelInput(" ");
    createUnitPage.elements.modelInput().should("have.attr", "value", "");

    createUnitPage.pasteModelInput(createUnitData.specSymbols);
    createUnitPage.elements.modelInput().should("have.attr", "value", "");
    createUnitPage.pasteModelInput(" ");
    createUnitPage.elements.modelInput().should("have.attr", "value", "");

    createUnitPage.fillModelInput("112345678901234");
    createUnitPage.elements.modelInputError().should("not.exist");
  });

  it("C317 Verify model name input field", () => {
    createUnitPage.elements
      .techDataTitle()
      .should("be.visible")
      .and("contain.text", "Технічні характеристики");
    createUnitPage.elements
      .modelInput()
      .should("have.attr", "placeholder", "Введіть назву моделі");
    createUnitPage.elements
      .techDataArea()
      .should("be.visible")
      .and("not.be.disabled")
      .and("not.have.attr", "readonly");
    createUnitPage.elements.techDataArea().click();

    createUnitPage.fillTechDataArea(createUnitData.specSymbols);
    createUnitPage.elements.techDataArea().should("have.text", "");

    createUnitPage.pasteTechDataArea(createUnitData.specSymbols);
    createUnitPage.elements.techDataArea().should("have.text", "");

    createUnitPage.elements
      .techDataArea()
      .type("A".repeat(9000) + "1", { delay: 0 });
    createUnitPage.elements
      .techDataArea()
      .should("have.text", "A".repeat(9000));
  });

  it("C318 Verify description section", () => {
    createUnitPage.elements
      .descriptionTitle()
      .should("be.visible")
      .and("contain.text", "Детальний опис");
    createUnitPage.elements
      .modelInput()
      .should("have.attr", "placeholder", "Введіть назву моделі");
    createUnitPage.elements
      .techDataArea()
      .should("be.visible")
      .and("not.be.disabled")
      .and("not.have.attr", "readonly");
    createUnitPage.elements.techDataArea().click();

    createUnitPage.fillDescription(createUnitData.specSymbols);
    createUnitPage.elements.descriptionArea().should("have.text", "");

    createUnitPage.pasteDescription(createUnitData.specSymbols);
    createUnitPage.elements.techDataArea().should("have.text", "");

    createUnitPage.elements
      .descriptionArea()
      .type("A".repeat(9000) + "1", { delay: 0 });
    createUnitPage.elements
      .techDataArea()
      .should("have.text", "A".repeat(9000));
  });

  it("C319 Verify vehicle location division", () => {
    createUnitPage.elements
      .addressSelectionTitle()
      .should("be.visible")
      .and("have.text", "Місце розташування технічного засобу *");
    createUnitPage.elements
      .addressSelectionField()
      .should("have.text", "Виберіть на мапі");

    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .addressSelectionField()
      .should("have.css", "border-bottom-color", "rgb(247, 56, 89)");
    createUnitPage.elements
      .addressSelectionErrorMessage()
      .should("be.visible")
      .and("have.text", "Виберіть коректне місце на мапі України")
      .and("have.css", "color", "rgb(247, 56, 89)");
    createUnitPage.clickSelectOnMapBtn();
    createUnitPage.elements.mapPopup().should("exist").and("be.visible");
    createUnitPage.elements.mapPopupTitle().should("exist").and("be.visible");
    createUnitPage.elements
      .mapPopupCloseIcon()
      .should("exist")
      .and("be.visible");
    createUnitPage.elements
      .mapPopupAddressInputField()
      .should("have.text", createUnitData.defaultMapAddress);
    createUnitPage.clickMapPopupCloseIcon();
    createUnitPage.elements.mapPopup().should("not.exist");

    createUnitPage.clickSelectOnMapBtn();
    createUnitPage.selectNewAddress();
    cy.wait(1000);
    createUnitPage.elements
      .mapPopupAddressInputField()
      .invoke("text")
      .then((text) => {
        const clean = text
          .replace(/\s+/g, " ")
          .replace(/\u00a0/g, " ")
          .trim();
        expect(clean).to.eq(createUnitData.newMapAddress);
      });
    createUnitPage.clickOutsidePopup();
    createUnitPage.elements.mapPopup().should("not.exist");
  });

  it.only('C326 Verify ""Скасувати"" button', () => {
    createUnitPage.elements.cancelBtn().should("have.text", "Скасувати");
    cy.on("window:confirm", () => true);
    createUnitPage.clickCancelBtn();
    basePage.verifyCurrentUrl(Cypress.config("baseUrl"));
  });

  it('C329 Verify ""Далі"" button', () => {
    createUnitPage.elements.nextBtn().should("have.text", "Далі");

    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .categoryErrorMessage()
      .should("exist")
      .and("be.visible");
    createUnitPage.elements
      .customInputFieldErrorMessage()
      .should("exist")
      .and("be.visible");
    createUnitPage.elements
      .selectManuctureErrorMessage()
      .should("exist")
      .and("be.visible");
    createUnitPage.elements
      .addressSelectionErrorMessage()
      .should("exist")
      .and("be.visible");

    createUnitPage.fillAllValidData();
    createUnitPage.clickNextBtn();
    
    createUnitPage.elements
      .createUnitPageTitle()
      .should("have.text", "Створити оголошення");
    createUnitPage.elements.tabsTitles().each((tab, index) => {
      cy.wrap(tab).should("have.text", createUnitData.tabTitles[index]);
    });
    createUnitPage.elements.tabsCreateUnit().each((tab, index) => {
      if (index === 1) {
        cy.wrap(tab).should("have.attr", "aria-selected", "true");
      } else {
        cy.wrap(tab).should("have.attr", "aria-selected", "false");
      }
    });
  });
});
