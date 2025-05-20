import TendersMapPage from '../../pages/tendersPages/TendersMapPage';
import Header from '../../components/HeaderPage';

describe('Tenders functionality', () => {
    it('C262 Filter the tenders (Organizer)', () => {
        TendersMapPage.visit();;
        // 1. Click on the ""Тендери"" button in the header.
        Header.clickTendersBtn()
        // 2. Enter ""Test"" in the ""Організатор"" input field
        TendersMapPage.typeInOrganizatorInputField('Test')
        TendersMapPage
        // 3. Mark the ""Test, ТОВ"" checkbox on the left sidebar filter.
        TendersMapPage.clickOrganizatorCheckboxFirst()
        TendersMapPage.elements.filterAppliedName()
            .invoke('text')
            .then((filterText) => {
                TendersMapPage.elements.tenderCardOrganizationName()
                    .invoke('text')
                    .should('include', filterText);
            });
        // 4. Click on the ""Скинути фільтри"" button on the left sidebar filter.
        TendersMapPage.clickResertFiltersBtn()
        // 5. Mark the ""Test, ТОВ"" and ""Anton B. ФОП"" checkboxes on the left sidebar filter.
        TendersMapPage.clickOrganizatorCheckboxFirst()
        TendersMapPage.clickOrganizatorCheckboxSecond()
        TendersMapPage.clickOrganizatorCheckboxThird()
        TendersMapPage.elements.filterAppliedName()
            .then((filterElements) => {
                const filterTexts = filterElements.map((index, el) => Cypress.$(el).text().trim()).get();
                TendersMapPage.elements.tenderCardOrganizationName()
                    .then((cardElements) => {
                        const cardTexts = cardElements.map((index, el) => Cypress.$(el).text().trim()).get();
                        expect(filterTexts.some((filterText) => cardTexts.some((cardText) => cardText.includes(filterText)))).to.be.true;
                    });
            });
    });
});