import TendersMapPage from '../../pages/tendersPages/TendersMapPage';
import Header from '../../components/HeaderPage';

describe('Tenders functionality', () => {
  it('C261 Search the tender', () => {
    TendersMapPage.visit();
    // 1. Click on the ""Тендери"" button in the header.
    Header.clickTendersBtn()
    // 2. Set a valid keyword ""testing"" in the Search field. 
    const searchQuery = 'v';
    TendersMapPage.typeInSearchTenderField(searchQuery);
    TendersMapPage.elements.tenderCard()
      .its('length') 
      .then((count) => {
        const tenderWord = (count === 1) ? 'тендер' : (count >= 5) ? 'тендерів' : 'тендери';
        const expectedText = `Знайдено ${count} ${tenderWord} на видимій території за запитом "${searchQuery}"`;
        TendersMapPage.elements.tendersInformativeTitle()
          .invoke('text')
          .then((text) => {
            expect(text.trim().replace(/\s+/g, ' ')).to.eq(expectedText);
          });
      });
    // 3. Click the ""x"" button on the right side of the search field.
    TendersMapPage.clickClearSearchTenderFieldBtn()
    // 4. Set a not valid keyword ""j"" in the Search field.
    TendersMapPage.typeInSearchTenderField('j')
    TendersMapPage.elements.tendersInformativeTitle().should('have.text', 'Знайдено 0 тендерів на видимій території за запитом "j"')
  });
});