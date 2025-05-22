import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/Header";

describe("Tenders functionality", () => {
  it("C264 Filter the tenders (Budget)", () => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
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
});
