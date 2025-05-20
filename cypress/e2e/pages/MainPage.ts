import BasePage from './BasePage'

class MainPage extends BasePage {
elements={
  crossBtnTelegram: ()=> cy.get('[data-testid="crossButton"]'),
  sectionSpecEquipment: ()=> cy.get('[data-testid="specialEquipment"]'),
  popularSpecEquipmentTab: ()=> cy.get('[data-testid="specialEquipment__populyarna"]'),
  sivalky: ()=> cy.get('[data-testid="category__sivalki"]')
  }

   closeTelegramModal() {
    this.elements.crossBtnTelegram().click();
  }

  navigateToSpecEquipmentSection(){
    this.elements.sectionSpecEquipment().scrollIntoView();
  }

  clickSivalky(){
    this.elements.sivalky().click();
  }


    }

export default MainPage;
