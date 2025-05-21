import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/HeaderPage";

describe("Tenders functionality", () => {
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
});
