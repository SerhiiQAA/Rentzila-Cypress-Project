import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/Header";

describe("Tenders functionality", () => {
  beforeEach(() => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
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
    TendersMapPage.elements.resertFiltersBtn().scrollIntoView();
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.elements.regionAllCheckbox().should("be.checked");
    TendersMapPage.elements.regionFilter().scrollIntoView();
    TendersMapPage.elements.regionItem().contains("Волинська область").click();
    TendersMapPage.elements.resertFiltersBtn().scrollIntoView();
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.elements.regionAllCheckbox().should("be.checked");
    TendersMapPage.elements.regionFilter().scrollIntoView();
    TendersMapPage.selectAndValidateRandomRegions();
  });
});
