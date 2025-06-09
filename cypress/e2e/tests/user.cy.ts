import header from "../components/Header";
import userPage from "../pages/userPage";
import { envs } from "../utils/testData";
import { uiMessages } from "../utils/uiTexts";
import LoginPage from "../pages/LoginPage";
import { symbols } from "../utils/testData";
import { userFullData } from "../utils/testData";
import { faker } from "@faker-js/faker";
import MainPage from "../pages/MainPage";
import adminUsersPage from "../pages/AdminUsersPage";
import adminUserInfoPage from "../pages/AdminUserInfoPage";
import adminPanelPage from "../pages/AdminPanelPage";

context("User page verification (registrated via email)", () => {
  beforeEach(() => {
    LoginPage.visit();
    const mp: MainPage = new MainPage();
    mp.closeTelegramModal();
    header.clickSignInBtn();
    LoginPage.login(envs.email_regMail, envs.pass_regMail);
    header.clickUserBtn();
    header.clickUserDropdownAccountBtn();
  });

  it('C547 Verify ""Номер телефону"" and email sections, with unfilled personal info account (account registrated using email)', () => {
    userPage.elements.profileNumberInput().should("be.empty");
    userPage.elements.profileNumberLbl().should("be.visible");
    userPage.elements
      .profileEmailInput()
      .should("have.value", envs.email_regMail);
  });

  it("C352 Verify that validation messages appears when user input symbols  in 'Прізвище','Ім'я', 'По-батькові' fields", () => {
    symbols.forEach((symbol) => {
      userPage.fillNameInput(symbol);
      userPage.fillLastNameInput(symbol);
      userPage.fillPatronimInput(symbol);
      userPage.clickNextBtn();
      cy.checkInputErrorByLabel("Ім'я", uiMessages.symbolError);
      cy.checkInputErrorByLabel("Прізвище", uiMessages.symbolError);
      cy.checkInputErrorByLabel("По-батькові", uiMessages.symbolError);
      userPage.clearPersonalInformation();
    });
  });

  it("C355 Verify that validation message 'Некоректний номер телефону' appears when user input less than 9 digits after '+380' and non-existent operator code in Ukraine", () => {
    userPage.fillNumber("+38012345678");
    userPage.elements.phoneError().should("have.text", uiMessages.numberError);
    userPage.fillNumber("+380494882982");
    userPage.elements.phoneError().should("have.text", uiMessages.numberError);
  });

  it("C357 Verify that user is unable to input more than 25 letters in Прізвище/Ім'я/По-батькові fields", () => {
    const longString = faker.string.alpha(26);
    userPage.fillNameInput(longString);
    userPage.fillLastNameInput(longString);
    userPage.fillPatronimInput(longString);
    userPage.elements.nameInput().invoke("val").should("have.length", 25);
    userPage.elements.lastNameInput().invoke("val").should("have.length", 25);
    userPage.elements.patronimInput().invoke("val").should("have.length", 25);
  });

  //Bug (BG-006 TC-358) test skiped
  it.skip("C358 Verify that user unable to input more than 50 symbols in 'Telegram' field", () => {
    const longTelegram = faker.string.alpha(52);
    userPage.fillTelegram(longTelegram);
    userPage.elements.telegramInput().invoke("val").should("have.length", 50);
  });

  it("C361 Verify that user unable to input more than 8 digits in 'ЄДРПОУ для юридичних осіб' field", () => {
    const longId = faker.string.numeric(10);
    userPage.selectEntityType("Юридична особа");
    userPage.fillLegalEntityId(longId);
    userPage.elements
      .legalEntityIdInput()
      .invoke("val")
      .should("have.length", 8);
  });

  it("C362 Verify that user unable to input more than 10 digits in 'РНОКПП (ІПН) ' field", () => {
    const longId = faker.string.numeric(11);
    userPage.selectEntityType("Приватна особа");
    userPage.fillPrivateEntityId(longId);
    userPage.elements
      .privateEntityIdInput()
      .invoke("val")
      .should("have.length", 10);
  });

  it("C349 Verify that validation message 'Це поле обов`язкове' appears when user clicks 'Зберегти' button with empty mandatory fields", () => {
    userPage.clickNextBtn();
    cy.checkInputErrorByLabel("Ім'я", uiMessages.requiredField);
    cy.checkInputErrorByLabel("Прізвище", uiMessages.requiredField);
    userPage.elements
      .phoneError()
      .should("have.text", uiMessages.verifyPhoneError);

    userPage.selectEntityType(userFullData.individualEntrepreneur);
    userPage.clickNextBtn();
    cy.checkInputErrorByLabel("РНОКПП (ІПН) для ФОП", uiMessages.requiredField);

    userPage.selectEntityType(userFullData.legalEntity);
    userPage.clickNextBtn();
    cy.checkInputErrorByLabel(
      "ЄДРПОУ для юридичних осіб",
      uiMessages.requiredField
    );
  });

  it("C525 erify that validation message when a user clicks on the 'Зберегти' button without a confirmation phone number.", () => {
    userPage.clickNextBtn();
    userPage.elements
      .phoneError()
      .should("have.text", uiMessages.verifyPhoneError);
  });

  it(
    "C350 Verify that validation message 'Код ЄДРПОУ не може бути коротше 8 символів' appears when user input less than 8 digits", () => {
      userPage.selectEntityType(userFullData.legalEntity);
      userPage.fillLegalEntityId(userFullData.legalEntityId.slice(1));
      userPage.clickNextBtn();
      cy.checkInputErrorByLabel("ЄДРПОУ для юридичних осіб", uiMessages.legalIdError);
    }
  );

  it(
    "C351 Verify that validation message 'Код ІПН не може бути коротше 10 символів' appears when user input less than 10 digits", () => {
      userPage.selectEntityType(userFullData.individualEntrepreneur);
      userPage.fillIndividualEntrepreneurId(userFullData.privateEntityId.slice(1));
      userPage.clickNextBtn();
      cy.checkInputErrorByLabel(
        "РНОКПП (ІПН) для ФОП",
        uiMessages.privateIdError
      );
    }
  );
});

context("User page verification (verified phone account)", () => {
  const mp: MainPage = new MainPage();
  beforeEach(() => {
    LoginPage.visit();
    mp.closeTelegramModal();
    header.clickSignInBtn();
    LoginPage.login(envs.email, envs.password);
    header.clickUserBtn();
    header.clickUserDropdownAccountBtn();
  });

  //Bug (BG-05) test skiped
  it.skip("C341 Verify that user is able to fill all input fields on the page and the changes saved and success message is displayed after user click 'Зберегти' button", () => {
    userPage.selectEntityType(userFullData.privateEntity);
    userPage.fillPrivateEntityId(userFullData.privateEntityId);
    userPage.fillPersonalInfo(
      userFullData.lastName,
      userFullData.name,
      userFullData.patronim,
      userFullData.viber,
      userFullData.telegram,
      userFullData.city
     );
    userPage.clickNextBtn();
    userPage.elements
      .notification()
      .should("have.text", uiMessages.successProfileEdit);
    cy.reload();
    mp.closeTelegramModal();
    userPage.elements
      .privateEntityIdInput()
      .should("have.value", userFullData.privateEntityId);

    userPage.selectEntityType(userFullData.individualEntrepreneur);
    userPage.fillIndividualEntrepreneurId(userFullData.privateEntityId);
    userPage.clickNextBtn();
    userPage.elements
      .notification()
      .should("have.text", uiMessages.successProfileEdit);
    cy.reload();
    mp.closeTelegramModal();
    userPage.elements
      .individualEntrepreneurIdInput()
      .should("have.value", userFullData.privateEntityId);

    userPage.selectEntityType(userFullData.legalEntity);
    userPage.fillLegalEntityId(userFullData.legalEntityId);
    userPage.selectLegalEntityType(userFullData.legalrEntityTypes[0]);
    userPage.fillLegalEntityName(userFullData.patronim);
    userPage.clickNextBtn();
    userPage.elements
      .notification()
      .should("have.text", uiMessages.successProfileEdit);
    header.clickUserBtn();
    header.clickUserDropdownLogoutBtn();
    header.clickSignInBtn();
    LoginPage.login(envs.adminEmail, envs.adminPassword);
    cy.scrollTo('top');
    header.elements.settingsBtn().should("be.visible")
    header.clickSettingsBtn();
    adminPanelPage.clickUsersBtn();
    adminUsersPage.viewUserData(envs.email);
    adminUserInfoPage.verifyUserData(
      userFullData.lastName,
      userFullData.name,
      userFullData.patronim,
      userFullData.city,
      userFullData.legalEntity,
      userFullData.telegram,
      userFullData.viber,
      userFullData.legalrEntityTypes[0],
      null,
      null,
      userFullData.legalEntityId,
      userFullData.patronim
    );
  });
  it('C342  Verify that the ""Виберіть тип особи"", ""РНОКПП (ІПН)"", ""Тип юридичної особи"" fields work correctly and that "ЄДРПОУ для юридичних осіб" field accept only digits', () => {
    userPage.selectEntityType(userFullData.individualEntrepreneur);
    userPage.fillIndividualEntrepreneurId(userFullData.privateEntityId);
    userPage.clickNextBtn();
    userPage.elements
      .notification()
      .should("have.text", uiMessages.successProfileEdit);
    cy.reload();
    userPage.elements
      .individualEntrepreneurIdInput()
      .should("have.value", userFullData.privateEntityId);

    userPage.selectEntityType(userFullData.privateEntity);
    userPage.fillPrivateEntityId(userFullData.privateEntityId);
    userPage.clickNextBtn();
    userPage.elements
      .notification()
      .should("have.text", uiMessages.successProfileEdit);
    cy.reload();
    userPage.elements
      .privateEntityIdInput()
      .should("have.value", userFullData.privateEntityId);
    userPage.selectEntityType(userFullData.legalEntity);
    userFullData.legalrEntityTypes.forEach((type) => {
      userPage.selectLegalEntityType(type);
      userFullData.legalEntityIdInvalid.forEach((val) => {
        userPage.fillLegalEntityId(val);
        userPage.elements.legalEntityIdInput().should("be.empty");
      });
      userPage.fillLegalEntityId(userFullData.legalEntityId);
      userPage.fillLegalEntityName(userFullData.patronim);
      userPage.clickNextBtn();
      userPage.elements
        .notification()
        .should("have.text", uiMessages.successProfileEdit);
      cy.reload();
      userPage.elements
        .legalEntityIdInput()
        .should("have.value", userFullData.legalEntityId);
    });
  });
});
