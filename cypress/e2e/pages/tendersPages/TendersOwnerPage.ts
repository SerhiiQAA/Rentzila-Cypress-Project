import BasePage from "../BasePage";

class TendersOwnerPage extends BasePage {
  elements = {
    createTenderUpBtn: () => cy.get('button[class*="OwnerTendersPage_addUnit"]'),
    createTenderDownBtn: () => cy.get('button[class*="EmptyBlockInfo_btn"]'),
    activeTab: () => cy.get(".MuiTab-root").eq(0),
    completedTab: () => cy.get(".MuiTab-root").eq(1),
    pendingTab: () => cy.get(".MuiTab-root").eq(2),
    rejectedTab: () => cy.get(".MuiTab-root").eq(3),
    infoTitle: () => cy.get('[data-testid="title"]'),
    cardFirstTender: () => cy.get('[data-testid="tenderLink"]').eq(0),
    cardTenderName: () => cy.get('div[class*="CurrentItemInfo_name"]'),
    cardFirstTenderDate: () =>
      cy.get('div[class*="ParagraphWithIcon_paragraph"]').eq(0),
    cardSecondTenderDate: () =>
      cy.get('div[class*="ParagraphWithIcon_paragraph"]').eq(0),
    cardFirstTenderEditBtn: () => cy.get('[class*="CurrentTenderButtons_fillBtn"]'),
  };

  clickCreateTenderUpBtn() {
    this.elements.createTenderUpBtn().click();
  }

  clickCreateTenderDownBtn() {
    this.elements.createTenderDownBtn().click();
  }

  clickCardFirstTenderEditBtn() {
    this.elements.cardFirstTenderEditBtn().click();
  }

  clickPendingTab() {
    this.elements.pendingTab().click();
  }

  clickCardFirstTender() {
    this.elements.cardFirstTender().click();
  }
}

export default new TendersOwnerPage();
