import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/HeaderPage";

describe("Tenders functionality", () => {
  it("C262 Filter the tenders (Organizer)", () => {
    TendersMapPage.visit();
    // 1. Click on the ""Тендери"" button in the header.
    Header.clickTendersBtn();
    // 2. Enter ""Test"" in the ""Організатор"" input field
    TendersMapPage.fillInOrganizatorInputField("Test");
    TendersMapPage;
    // 3. Mark the ""Test, ТОВ"" checkbox on the left sidebar filter.
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
    // 4. Click on the ""Скинути фільтри"" button on the left sidebar filter.
    TendersMapPage.clickResertFiltersBtn();
    // 5. Mark the ""Test, ТОВ"" and ""Anton B. ФОП"" checkboxes on the left sidebar filter.
    TendersMapPage.clickOrganizatorCheckboxFirst();
    TendersMapPage.clickOrganizatorCheckboxSecond();
    TendersMapPage.clickOrganizatorCheckboxThird();
    TendersMapPage.validateFilterAppliedToTenders();
  });
});
