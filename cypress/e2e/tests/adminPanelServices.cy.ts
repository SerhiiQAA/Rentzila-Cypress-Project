import AdminPanelMainPage from "../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelServicesPage from "../pages/adminPanelPages/AdminPanelServicesPage";
import { envs } from "../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
    cy.wait(2000);
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
  });

  it("C368 The Знайти по назві search field functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.fillSearchField("Інші");
    cy.wait(1000);
    AdminPanelServicesPage.elements
      .tableRows()
      .should("have.length", 1)
      .and("contain.text", "Інші");
  });

  it("C369 The number of service categories on the page functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    AdminPanelServicesPage.clickPaginationDropdown();
    AdminPanelServicesPage.clickPaginationSelect20();
    AdminPanelServicesPage.verifyRowsCount(20);
    AdminPanelServicesPage.clickPaginationDropdown();
    AdminPanelServicesPage.clickPaginationSelect50();
    AdminPanelServicesPage.verifyRowsCount(50);
  });

  it("С370 The Перегляд категорії button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.clickViewCategoryBtn();
    AdminPanelServicesPage.verifyViewCategoryName("Сільськогосподарські");
    
  });

  it("C371 The Редагувати категорію button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.clickEditCategoryBtn();
    AdminPanelServicesPage.verifyEditCategoryInput("Сільськогосподарські");
    AdminPanelServicesPage.fillCategoryPopupInput("Сільськогосподарськіtest");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
    cy.reload();
    AdminPanelServicesPage.verifyCategoryElement("Сільськогосподарськіtest");
    AdminPanelServicesPage.clickEditCategoryBtn();
    AdminPanelServicesPage.fillCategoryPopupInput("Сільськогосподарські");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
  });

  it.skip("C372 The Видалення категорії button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.elements.categoryElementSilskogospodarski()
      .should("exist");
    AdminPanelServicesPage.clickDeleteCategoryBtn();
    AdminPanelServicesPage.clickDeleteCategoryPopupBtn(); //Error 500 - ReadOnlyError at /api/crm/service/categories/2/
    cy.reload();
    AdminPanelServicesPage.elements.categoryElementSilskogospodarski()
      .should("not.exist");
  });

  it("C373 The  Створити категорію button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.clickCreateCategoryBtn();
    AdminPanelServicesPage.fillCategoryPopupInput("Сільськогосподорські");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
    cy.reload();
    AdminPanelServicesPage.verifyCategoryElement("Сільськогосподорські");

    AdminPanelServicesPage.deleteCategory("Сільськогосподорські");
  
  });

  it.skip("C374 The ID, Назва and Категорія filters functionality for  Список сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    
    AdminPanelServicesPage.sortIdAndVerify();
    
    AdminPanelServicesPage.sortNameAndVerify();
    
    AdminPanelServicesPage.sortCategoryAndVerify(); // Client side error
  }); 

});