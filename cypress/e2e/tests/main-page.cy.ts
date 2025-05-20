// / <reference types="Cypress" />

// import { config } from '../../../config';
import BasePage from '../pages/BasePage';
import MainPage from '../pages/MainPage';

const basePage = new BasePage();
const mainPage = new MainPage();

describe('Main Page Test', () => {
  it('close telegram modal', () => {
    
   basePage.visit(); 
   mainPage.closeTelegramModal();
  });

  it("C213 - Checking 'Special Equipment' section on the main page",()=>{
    basePage.visit(); 
   mainPage.closeTelegramModal();
   mainPage.navigateToSpecEquipmentSection();
   mainPage.elements.sectionSpecEquipment().should("be.visible");
   mainPage.elements.popularSpecEquipmentTab().should("be.visible");
   mainPage.clickSivalky();
   cy.url().should("eq", "https://dev.rentzila.com.ua/products/posivna-ta-sadilna-tekhnika/");


  })
});
