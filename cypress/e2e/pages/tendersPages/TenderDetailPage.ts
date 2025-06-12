import BasePage from "../BasePage";

class TenderDetailPage extends BasePage {
  elements = {
    receivingProposalsText: () =>
      cy.get('div[class*="ProposeButton_propose_denied"]'),
    budgetAnnouncedValue: () => cy.get('span[class*="Additional_budget"]'),
    editBtn: () => cy.get('class*="CurrentTenderButtons_fillBtn"]'),
  };

  clickEditBtn() {
    this.elements.editBtn().click();
  }
}
export default new TenderDetailPage();
