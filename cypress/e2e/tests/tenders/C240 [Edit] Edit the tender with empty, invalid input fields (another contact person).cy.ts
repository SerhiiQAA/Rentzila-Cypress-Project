import LoginPage from "../../pages/LoginPage";
import TendersOwnerPage from "../../pages/tendersPages/TendersOwnerPage";
import TenderCreatePage from "../../pages/tendersPages/TenderCreatePage";
import TenderDetailPage from "../../pages/tendersPages/TenderDetailPage";

describe("Tenders functionality", () => {
  it("C240 [Edit] Edit the tender with empty/invalid input fields (another contact person)", () => {
    TenderCreatePage.visit("owner-tenders-page/");
    LoginPage.login("testuserrentzila@gmail.com", "Testuser10");
    TenderCreatePage.clickCloseTelegramBtn();
    TendersOwnerPage.elements.pendingTab().scrollIntoView();
    TendersOwnerPage.clickPendingTab();
    TendersOwnerPage.clickCardFirstTender();
    cy.wait(500);
    TenderDetailPage.elements.editBtn().scrollIntoView();
    TenderDetailPage.clickEditBtn();
    TenderCreatePage.elements.tenderNameInput().clear();
    TenderCreatePage.clickNextBtn();
    TenderCreatePage.elements
      .tenderNameInputErrorMsg()
      .scrollIntoView()
      .should("have.text", "Назва має містити щонайменше 10 символів");
    TenderCreatePage.fillTenderNameInput("Tender na");
    TenderCreatePage.elements.nextBtn().click();
    TenderCreatePage.elements
      .tenderNameInputErrorMsg()
      .scrollIntoView()
      .should("have.text", "Назва має містити щонайменше 10 символів");
    TenderCreatePage.fillTenderNameInput("Tender name <");
    TenderCreatePage.elements
      .tenderNameInput()
      .should("be.visible")
      .invoke("val")
      .should("eq", "Tender name ");
    TenderCreatePage.fillTenderNameInput("Tender name >");
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
    TenderCreatePage.elements.findServiceInput().type("При");
    TenderCreatePage.clickFirstServiceOptionFromInputDropdown();
    TenderCreatePage.elements
      .findServiceInputSelected()
      .should("have.text", "Прибирання снігу");

    TenderCreatePage.clickDateBeginningBtn();
    TenderCreatePage.clickDateEndingBtn();
    TenderCreatePage.clickDatePeriodOfWorkBtn();

    TenderCreatePage.elements.budgetInput().clear();
    TenderCreatePage.elements
      .budgetInputErrorMsg()
      .scrollIntoView()
      .should("have.text", "Це поле обов’язкове");

    TenderCreatePage.fillBudgetInput("< > { } ; ^");
    TenderCreatePage.elements
      .budgetInputErrorMsg()
      .scrollIntoView()
      .should("have.text", "Це поле обов’язкове");

    TenderCreatePage.fillBudgetInput("Tender name <");
    TenderCreatePage.elements
      .budgetInputErrorMsg()
      .scrollIntoView()
      .should("have.text", "Це поле обов’язкове");

    TenderCreatePage.fillBudgetInput("9999999991");
    TenderCreatePage.elements
      .budgetInput()
      .scrollIntoView()
      .should("have.value", "999999999");

    TenderCreatePage.elements.budgetInput().clear();
    TenderCreatePage.elements
      .budgetInput()
      .invoke("val", "1111111110")
      .trigger("input");
    TenderCreatePage.elements
      .budgetInput()
      .scrollIntoView()
      //   Bug
      .should("have.value", "1111111110");

    // TenderCreatePage.elements.findServiceInput()
    //   .should("have.value", "Прибирання снігу");
    //   .findServiceInput()
    //   .should("be.visible")
    //   .invoke("val")
    //   .should("eq", "Перевезення урожаю ");
    // TenderCreatePage.elements
    //   .findServiceInput()
    //   .type(
    //     "Перевезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаююю1"
    //   );
    // TenderCreatePage.elements
    //   .findServiceModalErrorMsg()
    //   .should("be.visible")
    //   .invoke("text")
    //   .then((text) => {
    //     cy.log(`Actual text received: ${text}`);
    //     const normalizedText = text
    //       .replace(/\s+/g, " ")
    //       .replace(/&nbsp;/g, " ")
    //       .trim();
    //     expect(normalizedText).to.include(
    //       "На жаль, послугу “Перевезення урожаю Перевезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаюююП“ не знайдено в нашій базі."
    //     );
    //   });
    // TenderCreatePage.elements
    //   .findServiceInput()
    //   .clear()
    //   .type("Перевезення урожаю >");
    // TenderCreatePage.elements
    //   .findServiceInput()
    //   .should("be.visible")
    //   .invoke("val")
    //   .should("eq", "Перевезення урожаю ");
  });
});
