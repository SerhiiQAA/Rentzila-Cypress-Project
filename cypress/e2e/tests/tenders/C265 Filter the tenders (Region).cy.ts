import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/HeaderPage";

describe("Tenders functionality", () => {
  it("C265 Filter the tenders (Region)", () => {
    TendersMapPage.visit();
    // 1. Click on the ""Тендери"" button in the header.
    Header.clickTendersBtn();
    // 2. Scroll down to the ""Регіон"" section on the left sidebar filter.
    TendersMapPage.elements.regionFilter().scrollIntoView();
    // 3. Check the ""Вінницька область"" checkbox.
    TendersMapPage.elements.regionItem().contains("Вінницька область").click();
    // 4. Scroll up to the ""Скинути фiльтри"" button and click it.
    TendersMapPage.elements.resertFiltersBtn().scrollIntoView();
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.elements.regionAllCheckbox().should("be.checked");
    // 5. Scroll down to the ""Регіон"" section on the left sidebar filter and click the ""Волинська область"" checkbox.
    TendersMapPage.elements.regionFilter().scrollIntoView();
    TendersMapPage.elements.regionItem().contains("Волинська область").click();
    // 6. Scroll up to the ""Скинути фiльтри"" button and click it.
    TendersMapPage.elements.resertFiltersBtn().scrollIntoView();
    TendersMapPage.clickResertFiltersBtn();
    TendersMapPage.elements.regionAllCheckbox().should("be.checked");
    // 7. Scroll down to the ""Регіон"" section on the left sidebar filter and click the random multiple regions filter.
    TendersMapPage.elements.regionFilter().scrollIntoView();
    TendersMapPage.elements.regionItem().then((regions) => {
      const allRegions = regions
        .map((index, el) => Cypress.$(el).text().trim())
        .get();
      const randomRegions = Cypress._.sampleSize(allRegions, 3);
      randomRegions.forEach((region) => {
        TendersMapPage.elements.regionItem().contains(region).click();
      });
      TendersMapPage.elements
        .filterAppliedName()
        .invoke("text")
        .then((filterText) => {
          const normalizedText = filterText.replace(/\s*\(\d+\)$/, "");

          randomRegions.forEach((region) => {
            const cleanRegion = region.replace(/\s*\(\d+\)$/, "");
            expect(normalizedText).to.include(cleanRegion);
          });
        });
    });
  });
});
