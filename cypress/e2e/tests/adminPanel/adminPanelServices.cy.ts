import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelServicesPage from "../../pages/adminPanelPages/AdminPanelServicesPage";
import { envs } from "../../utils/testData";

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
    AdminPanelServicesPage.verifyTableElement("Інші");
  });

  it("C369 The number of service categories on the page functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.verifyCurrentDropdownElementByName("10");
    AdminPanelServicesPage.clickPaginationDropdown();
    AdminPanelServicesPage.clickPaginationSelect20();
    AdminPanelServicesPage.verifyCurrentDropdownElementByName("20");
    AdminPanelServicesPage.clickPaginationDropdown();
    AdminPanelServicesPage.clickPaginationSelect50();
    AdminPanelServicesPage.verifyCurrentDropdownElementByName("50");
  });

  it("С370 The Перегляд категорії button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.clickCategoryActionBtnByName("Сільськогосподарські", "view");
    AdminPanelServicesPage.verifyViewCategoryName("Сільськогосподарські");
    
  });

  it("C371 The Редагувати категорію button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.clickCategoryActionBtnByName("Сільськогосподарські", "edit");
    AdminPanelServicesPage.verifyEditCategoryInput("Сільськогосподарські");
    AdminPanelServicesPage.fillCategoryPopupInput("Сільськогосподарськіtest");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
    cy.reload();
    AdminPanelServicesPage.verifyTableElement("Сільськогосподарськіtest");
    AdminPanelServicesPage.clickCategoryActionBtnByName("Сільськогосподарськіtest", "edit");
    AdminPanelServicesPage.fillCategoryPopupInput("Сільськогосподарські");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
  });

  it.skip("C372 The Видалення категорії button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.elements.categoryElementSilskogospodarski()
      .should("exist");
    AdminPanelServicesPage.clickCategoryActionBtnByName("Сільськогосподарські", "delete");
    AdminPanelServicesPage.clickDeleteCategoryPopupBtn(); //Error 500 - ReadOnlyError at /api/crm/service/categories/2/
    cy.reload();
    AdminPanelServicesPage.elements.categoryElementSilskogospodarski()
      .should("not.exist");
    
    AdminPanelServicesPage.clickCreateCategoryBtn();
    AdminPanelServicesPage.fillCategoryPopupInput("Сільськогосподарські");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
    cy.reload();
  });

  it("C373 The  Створити категорію button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.clickCreateCategoryBtn();
    AdminPanelServicesPage.fillCategoryPopupInput("Сільськогосподорські");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
    cy.reload();
    AdminPanelServicesPage.verifyTableElement("Сільськогосподорські");

    AdminPanelServicesPage.deleteCategory("Сільськогосподорські");
  
  });

  it.skip("C374 The ID, Назва and Категорія filters functionality for  Список сервісів page - BG-007", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    
    AdminPanelServicesPage.sortIdAndVerify();
    
    AdminPanelServicesPage.sortNameAndVerify();
    
    //AdminPanelServicesPage.sortCategoryAndVerify(); // Client side error, no useful data on the network tab, but the sort is not working as expected.
  });

  it("C394 The Знайти по назві search field functionality for Список сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    AdminPanelServicesPage.fillSearchField("прибирання снігу");
    cy.wait(1000);
    AdminPanelServicesPage.verifyTableElement("Прибирання снігу");
  });

  it("C395 The number of service categories on the page functionality for Список сервісів  page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    AdminPanelServicesPage.clickPaginationDropdown();
    AdminPanelServicesPage.clickPaginationSelect20();
    AdminPanelServicesPage.verifyRowsCount(20);
    AdminPanelServicesPage.clickPaginationDropdown();
    AdminPanelServicesPage.clickPaginationSelect50();
    AdminPanelServicesPage.verifyRowsCount(50);
  });

});