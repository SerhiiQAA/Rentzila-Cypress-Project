import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/HeaderPage";

describe("Tenders functionality", () => {
  it("C265 Filter the tenders (Region)", () => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
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
