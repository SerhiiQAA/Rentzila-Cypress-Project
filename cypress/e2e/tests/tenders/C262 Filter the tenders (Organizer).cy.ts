import TendersMapPage from "../../pages/tendersPages/TendersMapPage";
import Header from "../../components/HeaderPage";

describe("Tenders functionality", () => {
  it("C262 Filter the tenders (Organizer)", () => {
    TendersMapPage.visit();
    Header.clickTendersBtn();
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
});
