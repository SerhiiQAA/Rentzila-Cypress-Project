import BasePage from '../BasePage';

class TenderDetailPage extends BasePage {

    elements = {
        receivingProposalsText: () => cy.get('div.ProposeButton_propose_denied__SV3R3'),
        budgetAnnouncedValue: () => cy.get('span.Additional_budget__qN_zb'),
    };

}
export default new TenderDetailPage();