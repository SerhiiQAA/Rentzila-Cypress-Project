import LoginPage from '../../pages/LoginPage';
import TendersOwnerPage from '../../pages/tendersPages/TendersOwnerPage';
import TenderCreatePage from '../../pages/tendersPages/TenderCreatePage';

describe('Tenders functionality', () => {
  it('should create a tender with correct date selection', () => {
    TenderCreatePage.visit('tenders-map/');
    LoginPage.login('testuserrentzila@gmail.com', 'Testuser10');
    TenderCreatePage.clickCloseTelegramBtn()
    // 1. Click the ""Створити тендер"" button
    TendersOwnerPage.clickCreateTenderBtn();
    // 2. Click the ""ДАЛІ"" button
    TenderCreatePage.clickNextBtn();
    TenderCreatePage.validateAllErrorMsg()
    // 3. Enter valid values for each field:
    TenderCreatePage.fillAllFields();
    // 4.1 - Enter following invalid values into ""Назва тендера"" field
    TenderCreatePage.elements.tenderNameInput().clear().type(' ')
    TenderCreatePage.elements.nextBtn().click();
    TenderCreatePage.elements.tenderNameInputErrorMsg().scrollIntoView().should('have.text', 'Назва має містити щонайменше 10 символів')
    // 4.2 - Enter following invalid values into ""Назва тендера"" field
    TenderCreatePage.elements.tenderNameInput().clear().type('Tender na')
    TenderCreatePage.elements.nextBtn().click();
    TenderCreatePage.elements.tenderNameInputErrorMsg().scrollIntoView().should('have.text', 'Назва має містити щонайменше 10 символів')
    // 4.3 - Enter following invalid values into ""Назва тендера"" field
    TenderCreatePage.elements.tenderNameInput().clear().type('Tender name <')
    TenderCreatePage.elements.tenderNameInput()
    .should('be.visible') 
    .invoke('val')
    .should('eq', 'Tender name ');
    // 4.4 Copy and paste the name with a restricted symbol.
    TenderCreatePage.elements.tenderNameInput().clear().type('Tender name >')
    TenderCreatePage.elements.tenderNameInput()
    .should('be.visible') 
    .invoke('val')
    .should('eq', 'Tender name ');
    // 4.5 Enter the name that has 71 symbol
    TenderCreatePage.elements.tenderNameInput().clear().type('TendernameTendernameTendernameTendernameTendernameTendernameTendername1')
    TenderCreatePage.elements.tenderNameInput()
    .should('be.visible') 
    .invoke('val')
    .should('eq', 'TendernameTendernameTendernameTendernameTendernameTendernameTendername');
    // 5. - Click the ""X"" icon near the service to clear the ""Послуга"" field
    TenderCreatePage.clickServiceListCloseBtn()
    TenderCreatePage.elements.findServiceInput()
    .should('be.visible')
    .invoke('val')
    .should('eq', '');
    // 5.1 - Empty ""Послуга"" field - Click ""ДАЛІ""
    TenderCreatePage.clickNextBtn();
    TenderCreatePage.elements.findServiceInputErrorMsg().scrollIntoView().should('have.text', 'Це поле обов’язкове')
    // 5.2 Enter a valid value with the restricted symbol at the end
    TenderCreatePage.elements.findServiceInput().type('Перевезення урожаю <')
    TenderCreatePage.elements.findServiceInput()
    .should('be.visible')
    .invoke('val')
    .should('eq', 'Перевезення урожаю ');
    // 5.3 Enter the value that has 101 symbol.
    TenderCreatePage.elements.findServiceInput().type('Перевезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаююю1')
    TenderCreatePage.elements.findServiceModalErrorMsg()
    .should('be.visible')
    .invoke('text')
    .then((text) => {
        cy.log(`Actual text received: ${text}`); 
        const normalizedText = text.replace(/\s+/g, ' ').replace(/&nbsp;/g, ' ').trim(); 
        expect(normalizedText).to.include('На жаль, послугу “Перевезення урожаю Перевезення урожаюююПеревезення урожаюююПеревезення урожаюююПеревезення урожаюююП“ не знайдено в нашій базі.');
    });
    // 5.4 Empty the field again. Copy and paste the value with a restricted symbol.
    TenderCreatePage.elements.findServiceInput().clear().type('Перевезення урожаю >')
    TenderCreatePage.elements.findServiceInput()
    .should('be.visible')
    .invoke('val')
    .should('eq', 'Перевезення урожаю ');
  });
});