import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/Header";

describe("Tenders functionality", () => {
  it("C260 View the tenders in the list", () => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
    TendersMapPage.clickShowListBtn();
    TendersMapPage.verifyFirstAndLastTenderCardElements();
  });
});
