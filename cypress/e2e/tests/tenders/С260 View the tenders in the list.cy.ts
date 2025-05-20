import TendersMapPage from '../../pages/tendersPages/TendersMapPage';
import Header from '../../components/HeaderPage';

describe('Tenders functionality', () => {
    it('С260 View the tenders in the list', () => {
        TendersMapPage.visit();
        // 1. Click on the ""Тендери"" button in the header.
        Header.clickTendersBtn()
        // 2. Click on the ""Показати список"" button on the left side of the page.
        TendersMapPage.clickShowListBtn()
        TendersMapPage.verifyFirstAndLastTenderCardElements();
    });
});