import BasePage from '../BasePage';

class TendersOwnerPage extends BasePage {

    elements = {
        createTenderUpBtn: () => cy.get('button.OwnerTendersPage_addUnit__XAQsu'),
        createTenderDownBtn: () => cy.get('button.EmptyBlockInfo_btn__hvPKg'),
        createTenderBtn: () => cy.get('#mui-p-26394-T-Активні'),

        activTab: () => cy.get('#mui-p-26394-T-Активні'),
        completedTab: () => cy.get('#mui-p-61993-T-Завершені'),
        pendingTab: () => cy.get('#mui-p-61993-T-Очікуючі'),
        rejectedTab: () => cy.get('#mui-p-61993-T-Відхилені'),

        infoTitle: () => cy.get('[data-testid="title"]'),
        cardTender: () => cy.get('[data-testid="tenderLink"]'),
        cardTenderName: () => cy.get('div.CurrentItemInfo_name__oQOA2'),
        cardFirstTenderDate: () => cy.get('div.ParagraphWithIcon_paragraph__5i0nJ').eq(0),
        cardSecondTenderDate: () => cy.get('div.ParagraphWithIcon_paragraph__5i0nJ').eq(0),

       };

    clickCreateTenderBtn() {
        this.elements.createTenderBtn().click();
    }
}
export default new TendersOwnerPage();