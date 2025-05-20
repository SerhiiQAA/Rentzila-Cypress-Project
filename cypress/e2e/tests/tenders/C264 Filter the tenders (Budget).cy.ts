import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/HeaderPage";

describe("Tenders functionality", () => {
  it("C264 Filter the tenders (Budget)", () => {
    TendersMapPage.visit();
    // 1. Click on the ""Тендери"" button in the header.
    Header.clickTendersBtn();
    // 2. Scroll down to the ""БЮДЖЕТ"" section on the left sidebar filter.
    TendersMapPage.elements.budgetFromItem().scrollIntoView();
    // 3. Clear the ""до"" input field.
    TendersMapPage.elements.budgetToItem().clear();
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("have.text", "Знайдено 0 тендерів на видимій території");
    // 4. Insert the ""999999999"" in the ""до"" input field.
    TendersMapPage.fillBudgetTo(999999999);
    TendersMapPage.elements.budgetToItem().should("have.value", "999999999");
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("include.text", "Знайдено");
    TendersMapPage.elements.tenderCard().should("have.length.greaterThan", 1);
    // 5. Clear the ""до"" input field.
    TendersMapPage.elements.budgetToItem().clear();
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("have.text", "Знайдено 0 тендерів на видимій території");
    // 6. Insert the ""1234567890"" in the ""до"" input field.
    TendersMapPage.fillBudgetTo(1234567890);
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("include.text", "Знайдено");
    TendersMapPage.elements.tenderCard().should("have.length.greaterThan", 1);
    // 7. Clear the ""до"" and ""вiд"" input fields.
    TendersMapPage.elements.budgetFromItem().clear();
    TendersMapPage.elements.budgetToItem().clear();
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("have.text", "Знайдено 0 тендерів на видимій території");
    // 8. Insert the ""11"" in the ""вiд"" input field.
    TendersMapPage.fillBudgetFrom(11);
    TendersMapPage.elements.budgetFromItem().should("have.value", "11");
    // 9. Insert the ""1"" in the ""до"" input field.
    TendersMapPage.fillBudgetTo(1);
    TendersMapPage.elements.budgetToItem().should("have.value", "1");
    TendersMapPage.elements
      .tendersInformativeTitle()
      .should("have.text", "Знайдено 0 тендерів на видимій території");
  });
});
