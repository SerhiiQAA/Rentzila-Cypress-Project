import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/Header";

describe("Tenders functionality", () => {
  it("C263 Filter the tenders (Category)", () => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
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
});
