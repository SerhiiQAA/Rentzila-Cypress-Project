import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/Header";
import Map from "../../components/Map";

describe("Tenders functionality", () => {
  it("C259 View the tenders on the map", () => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
    TendersMapPage.getTenderCardsCount().then((count) => {
      const tenderWordEnding = TendersMapPage.getTenderWordEnding(count);
      TendersMapPage.getCleanTitleText().should(
        "eq",
        `Знайдено ${count} ${tenderWordEnding} на видимій території`
      );
    });
    Map.clickMultipleTendersBadgeOnMap();
    cy.wait(500);
    Map.clickSingleTendersBadgeOnMap();
    TendersMapPage.elements.tenderCard().should("have.length", 1);
    cy.reload();
    TendersMapPage.getTenderCardsCount().then((count) => {
      const tenderWordEnding = TendersMapPage.getTenderWordEnding(count);
      TendersMapPage.getCleanTitleText().should(
        "eq",
        `Знайдено ${count} ${tenderWordEnding} на видимій території`
      );
    });
  });
});
