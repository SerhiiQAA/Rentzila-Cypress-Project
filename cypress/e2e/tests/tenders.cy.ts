import Header from "../components/Header";
import Map from "../components/Map";
import TendersMapPage from "../pages/tendersPages/TendersMapPage";
import LoginPage from "../pages/LoginPage";
import TendersOwnerPage from "../pages/tendersPages/TendersOwnerPage";
import TenderCreatePage from "../pages/tendersPages/TenderCreatePage";
import TenderDetailPage from "../pages/tendersPages/TenderDetailPage";
import { envs } from "../utils/testData";

describe("Tenders functionality", () => {
  beforeEach(() => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
  });

  it("C240 [Edit] Edit the tender with empty/invalid input fields (another contact person)", () => {
    TenderCreatePage.visit("owner-tenders-page/");
    LoginPage.login(envs.email, envs.password);
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
      .should("have.value", "1111111110");
      // first part of the test case includes 9.4 Copypaste 10 symbols to the ""Оголошений бюджет"" field Example: 1111111110
  });

  it("C259 View the tenders on the map", () => {
    TendersMapPage.getTenderCardsCount().then((count) => {
      const tenderWordEnding = TendersMapPage.getTenderWordEnding(count);
      TendersMapPage.getCleanTitleText().should(
        "eq",
        `Знайдено ${count} ${tenderWordEnding} на видимій території`
      );
    });
    Map.clickMultipleTendersBadgeOnMap();
    Map.clickSingleTendersBadgeOnMap();
    TendersMapPage.elements.tenderCard().should("have.length", 1);
    cy.reload(); // Instead of: 4. Click the "Показати всі результати" button (The button is missing).
    TendersMapPage.getTenderCardsCount().then((count) => {
      const tenderWordEnding = TendersMapPage.getTenderWordEnding(count);
      TendersMapPage.getCleanTitleText().should(
        "eq",
        `Знайдено ${count} ${tenderWordEnding} на видимій території`
      );
    });
  });

  it("C260 View the tenders in the list", () => {
    TendersMapPage.clickShowListBtn();
    TendersMapPage.verifyFirstAndLastTenderCardElements();
  });

  it("C261 Search the tender", () => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
    const searchQuery = "v";
    TendersMapPage.fillInSearchTenderField(searchQuery);
    TendersMapPage.elements
      .tenderCard()
      .its("length")
      .then((count) => {
        const tenderWord =
          count === 1 ? "тендер" : count >= 5 ? "тендерів" : "тендери";
        const expectedText = `Знайдено ${count} ${tenderWord} на видимій території за запитом "${searchQuery}"`;
        TendersMapPage.elements
          .tendersInformativeTitle()
          .invoke("text")
          .then((text) => {
            expect(text.trim().replace(/\s+/g, " ")).to.eq(expectedText);
          });
      });
    TendersMapPage.clickClearSearchTenderFieldBtn();
    TendersMapPage.fillInSearchTenderField("j");
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should(
        "have.text",
        'Знайдено 0 тендерів на видимій території за запитом "j"'
      );
  });

  it("C262 Filter the tenders (Organizer)", () => {
    TendersMapPage.fillInOrganizatorInputField("Test");
    TendersMapPage;
    TendersMapPage.clickOrganizatorCheckboxFirst();
    TendersMapPage.elements
      .filterAppliedName()
      .invoke("text")
      .then((filterText) => {
        TendersMapPage.elements
          .tenderCardOrganizationName()
          .invoke("text")
          .should("include", filterText);
      });
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.clickOrganizatorCheckboxFirst();
    TendersMapPage.clickOrganizatorCheckboxSecond();
    TendersMapPage.clickOrganizatorCheckboxThird();
    TendersMapPage.validateFilterAppliedToTenders();
  });

  it("C263 Filter the tenders (Category)", () => {
    TendersMapPage.clickCategoryAgriculturalOpenListBtn();
    TendersMapPage.clickCategorySubItemByText("Дискування землі");
    TendersMapPage.elements
      .filterAppliedName()
      .should("have.text", "Дискування землі");
    TendersMapPage.getTenderCardsCount().then((count) => {
      const tenderWordEnding = TendersMapPage.getTenderWordEnding(count);
      TendersMapPage.getCleanTitleText().should(
        "eq",
        `Знайдено ${count} ${tenderWordEnding} на видимій території`
      );
    });
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.elements.categorySubCheckbox().should("not.be.checked");
    TendersMapPage.clickCategoryBuildingOpenListBtn();
    TendersMapPage.clickCategorySubItemByText("Демонтажні роботи");
    TendersMapPage.clickCategorySubItemByText("Монтажні роботи");
    TendersMapPage.clickCategorySubItemByText("Фасадні роботи");
    TendersMapPage.verifySelectedFilters([
      "Демонтажні роботи",
      "Монтажні роботи",
      "Фасадні роботи",
    ]);
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.elements.categorySubCheckbox().should("not.be.checked");
    TendersMapPage.getTenderCardsCount().then((count) => {
      const tenderWordEnding = TendersMapPage.getTenderWordEnding(count);
      TendersMapPage.getCleanTitleText().should(
        "eq",
        `Знайдено ${count} ${tenderWordEnding} на видимій території`
      );
    });
    TendersMapPage.clickCategorySubItemByText("Полив урожаю");
    TendersMapPage.elements.categoryBuildingOpenListBtn().scrollIntoView();
    TendersMapPage.clickCategoryBuildingOpenListBtn();
    TendersMapPage.clickCategoryBuildingOpenListBtn();
    TendersMapPage.clickCategorySubItemByText("Заливка бетону");
    TendersMapPage.elements.categoryOthersOpenListBtn().scrollIntoView();
    TendersMapPage.clickCategoryOthersOpenListBtn();
    TendersMapPage.clickCategorySubItemByText("Дуже класна послуга");
    TendersMapPage.verifySelectedFilters([
      "Полив урожаю",
      "Заливка бетону",
      "Дуже класна послуга",
    ]);
  });

  it("C264 Filter the tenders (Budget)", () => {
    TendersMapPage.elements.budgetFromItem().scrollIntoView();
    TendersMapPage.elements.budgetToItem().clear();
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("have.text", "Знайдено 0 тендерів на видимій території");
    TendersMapPage.fillBudgetTo(999999999);
    TendersMapPage.elements.budgetToItem().should("have.value", "999999999");
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("include.text", "Знайдено");
    TendersMapPage.elements.tenderCard().should("have.length.greaterThan", 1);
    TendersMapPage.elements.budgetToItem().clear();
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("have.text", "Знайдено 0 тендерів на видимій території");
    TendersMapPage.fillBudgetTo(1234567890);
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("include.text", "Знайдено");
    TendersMapPage.elements.tenderCard().should("have.length.greaterThan", 1);
    TendersMapPage.elements.budgetFromItem().clear();
    TendersMapPage.elements.budgetToItem().clear();
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("have.text", "Знайдено 0 тендерів на видимій території");
    TendersMapPage.fillBudgetFrom(11);
    TendersMapPage.elements.budgetFromItem().should("have.value", "11");
    TendersMapPage.fillBudgetTo(1);
    TendersMapPage.elements.budgetToItem().should("have.value", "1");
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("have.text", "Знайдено 0 тендерів на видимій території");
  });

  it("C265 Filter the tenders (Region)", () => {
    TendersMapPage.elements.regionFilter().scrollIntoView();
    TendersMapPage.elements.regionItem().contains("Вінницька область").click();
    TendersMapPage.elements.filterAppliedName().should("have.text", "Вінницька область");
    TendersMapPage.elements.resertFiltersBtn().scrollIntoView();
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.elements.regionAllCheckbox().should("be.checked");
    TendersMapPage.elements.regionFilter().scrollIntoView();
    TendersMapPage.elements.regionItem().contains("Волинська область").click();
    TendersMapPage.elements.filterAppliedName().should("have.text", "Волинська область");
    TendersMapPage.elements.resertFiltersBtn().scrollIntoView();
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.elements.regionAllCheckbox().should("be.checked");
    TendersMapPage.elements.regionFilter().scrollIntoView();
    TendersMapPage.selectAndValidateRandomRegions();
  });
});
