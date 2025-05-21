import LoginPage from "../../pages/LoginPage";
import TendersOwnerPage from "../../pages/tendersPages/TendersOwnerPage";
import TenderCreatePage from "../../pages/tendersPages/TenderCreatePage";

describe("Tenders functionality", () => {
  it("C231 Creat tender", () => {
    TenderCreatePage.visit("tenders-map/");
    LoginPage.login("testuserrentzila@gmail.com", "Testuser10");
    TenderCreatePage.clickCloseTelegramBtn();
    TendersOwnerPage.clickCreateTenderBtn();
    TenderCreatePage.clickNextBtn();
    TenderCreatePage.validateAllErrorMsg();
    TenderCreatePage.fillAllFields();
    TenderCreatePage.elements.tenderNameInput().clear().type(" ");
    TenderCreatePage.elements.nextBtn().click();
    TenderCreatePage.elements
      .tenderNameInputErrorMsg()
      .scrollIntoView()
      .should("have.text", "Назва має містити щонайменше 10 символів");
    TenderCreatePage.elements.tenderNameInput().clear().type("Tender na");
    TenderCreatePage.elements.nextBtn().click();
    TenderCreatePage.elements
      .tenderNameInputErrorMsg()
      .scrollIntoView()
      .should("have.text", "Назва має містити щонайменше 10 символів");
    TenderCreatePage.elements.tenderNameInput().clear().type("Tender name <");
    TenderCreatePage.elements
      .tenderNameInput()
      .should("be.visible")
      .invoke("val")
      .should("eq", "Tender name ");
    TenderCreatePage.elements.tenderNameInput().clear().type("Tender name >");
    TenderCreatePage.elements
      .tenderNameInput()
      .should("be.visible")
      .invoke("val")
      .should("eq", "Tender name ");
    TenderCreatePage.elements
      .tenderNameInput()
      .clear()
      .type(
        "TendernameTendernameTendernameTendernameTendernameTendernameTendername1"
      );
    TenderCreatePage.elements
      .tenderNameInput()
      .should("be.visible")
      .invoke("val")
      .should(
        "eq",
        "TendernameTendernameTendernameTendernameTendernameTendernameTendername"
      );
    TenderCreatePage.clickServiceListCloseBtn();
    TenderCreatePage.elements
      .findServiceInput()
      .should("be.visible")
      .invoke("val")
      .should("eq", "");
    TenderCreatePage.clickNextBtn();
    TenderCreatePage.elements
      .findServiceInputErrorMsg()
      .scrollIntoView()
      .should("have.text", "Це поле обов’язкове");
    TenderCreatePage.elements.findServiceInput().type("Перевезення урожаю <");
    TenderCreatePage.elements
      .findServiceInput()
      .should("be.visible")
      .invoke("val")
      .should("eq", "Перевезення урожаю ");
    TenderCreatePage.elements
      .findServiceInput()
      .type(
        "Перевезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаююю1"
      );
    TenderCreatePage.elements
      .findServiceModalErrorMsg()
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        cy.log(`Actual text received: ${text}`);
        const normalizedText = text
          .replace(/\s+/g, " ")
          .replace(/&nbsp;/g, " ")
          .trim();
        expect(normalizedText).to.include(
          "На жаль, послугу “Перевезення урожаю Перевезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаюююП“ не знайдено в нашій базі."
        );
      });
    TenderCreatePage.elements
      .findServiceInput()
      .clear()
      .type("Перевезення урожаю >");
    TenderCreatePage.elements
      .findServiceInput()
      .should("be.visible")
      .invoke("val")
      .should("eq", "Перевезення урожаю ");
  });
});
