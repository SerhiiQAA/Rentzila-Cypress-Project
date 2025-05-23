import BasePage from "../BasePage";

class TendersOwnerPage extends BasePage {
  elements = {
    createTenderUpBtn: () => cy.get("button.OwnerTendersPage_addUnit__XAQsu"),
    createTenderDownBtn: () => cy.get("button.EmptyBlockInfo_btn__hvPKg"),
    activTab: () => cy.get(".MuiTab-root").eq(0),
    completedTab: () => cy.get(".MuiTab-root").eq(1),
    pendingTab: () => cy.get(".MuiTab-root").eq(2),
    rejectedTab: () => cy.get(".MuiTab-root").eq(3),
    infoTitle: () => cy.get('[data-testid="title"]'),
    cardFirstTender: () => cy.get('[data-testid="tenderLink"]').eq(0),
    cardTenderName: () => cy.get("div.CurrentItemInfo_name__oQOA2"),
    cardFirstTenderDate: () =>
      cy.get("div.ParagraphWithIcon_paragraph__5i0nJ").eq(0),
    cardSecondTenderDate: () =>
      cy.get("div.ParagraphWithIcon_paragraph__5i0nJ").eq(0),
  };

  clickCreateTenderUpBtn() {
    this.elements.createTenderUpBtn().click();
  }

  clickCreateTenderDownBtn() {
    this.elements.createTenderDownBtn().click();
  }

  clickPendingTab() {
    this.elements.pendingTab().click();
  }

  clickCardFirstTender() {
    this.elements.cardFirstTender().click();
  }
}

export default new TendersOwnerPage();
