import BasePage from "../BasePage";

class TenderDetailPage extends BasePage {
  elements = {
    receivingProposalsText: () =>
      cy.get("div.ProposeButton_propose_denied__SV3R3"),
    budgetAnnouncedValue: () => cy.get("span.Additional_budget__qN_zb"),
    editBtn: () => cy.get(".CurrentTenderButtons_fillBtn__HCP5l"),
  };

  clickEditBtn() {
    this.elements.editBtn().click();
  }
}
export default new TenderDetailPage();
