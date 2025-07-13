import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelServicesPage from "../../pages/adminPanelPages/AdminPanelServicesPage";
import { envs } from "../../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
    cy.wait(2000);
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
  });

  it("C365 The services menu section functionality", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.verifyTitle("Категорії сервісів");
    AdminPanelMainPage.clickSubItemListServicesBtn();
    AdminPanelServicesPage.verifyTitle("Сервіси");
  });

  it("367 The ID and Назва filters functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.verifyTitle("Категорії сервісів");
    AdminPanelServicesPage.sortIdAndVerify();
    AdminPanelServicesPage.sortNameAndVerify();
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
    AdminPanelServicesPage.clickElementActionBtnByName("Сільськогосподарські", "view");
    AdminPanelServicesPage.verifyViewCategoryName("Сільськогосподарські");
    
  });

  it("C371 The Редагувати категорію button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.clickElementActionBtnByName("Сільськогосподарські", "edit");
    AdminPanelServicesPage.verifyEditElementPopupInput("Сільськогосподарські");
    AdminPanelServicesPage.fillElementPopupInput("Сільськогосподарськіtest");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
    cy.reload();
    AdminPanelServicesPage.verifyTableElement("Сільськогосподарськіtest");
    AdminPanelServicesPage.clickElementActionBtnByName("Сільськогосподарськіtest", "edit");
    AdminPanelServicesPage.fillElementPopupInput("Сільськогосподарські");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
  });

  it.skip("C372 The Видалення категорії button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.elements.categoryElementSilskogospodarski()
      .should("exist");
    AdminPanelServicesPage.clickElementActionBtnByName("Сільськогосподарські", "delete");
    AdminPanelServicesPage.clickDeleteCategoryPopupBtn(); //Error 500 - ReadOnlyError at /api/crm/service/categories/2/
    cy.reload();
    AdminPanelServicesPage.elements.categoryElementSilskogospodarski()
      .should("not.exist");
    
    AdminPanelServicesPage.clickCreateBtn();
    AdminPanelServicesPage.fillElementPopupInput("Сільськогосподарські");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
    cy.reload();
  });

  it("C373 The  Створити категорію button functionality for Категорії сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemCategoryServicesBtn();
    AdminPanelServicesPage.clickCreateBtn();
    AdminPanelServicesPage.fillElementPopupInput("Сільськогосподорські");
    AdminPanelServicesPage.clickCategoryPopupYesBtn();
    cy.reload();
    AdminPanelServicesPage.verifyTableElement("Сільськогосподорські");

    AdminPanelServicesPage.deleteCategory("Сільськогосподорські");
  
  });

  it("C374 The ID, Назва and Категорія filters functionality for  Список сервісів page - BG-007", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    
    AdminPanelServicesPage.sortIdAndVerify();
    
    AdminPanelServicesPage.sortNameAndVerify();
    
    // AdminPanelServicesPage.sortCategoryAndVerify(); // Server response didnt return name - fixed ------> Same issue again
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

  it("C512 The Перегляд сервісу button functionality for Список сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    AdminPanelServicesPage.clickElementActionBtnByName("Посів технічних та зернових культур", "view");
    AdminPanelServicesPage.verifyServicePopupNameField("Посів технічних та зернових культур");
    AdminPanelServicesPage.clickPopupCloseBtn();
    AdminPanelServicesPage.clickElementActionBtnByName("Посів технічних та зернових культур", "view");
    AdminPanelServicesPage.clickPopupCancelBtn();
  });

  it("C513 The Редагувати сервіс button functionality for Список сервісів page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    AdminPanelServicesPage.clickElementActionBtnByName("Обприскування", "edit");
    AdminPanelServicesPage.verifyEditElementPopupInput("Обприскування");
    AdminPanelServicesPage.fillElementPopupInput("Обприскуванняtest");
    AdminPanelServicesPage.clickServicePopupYesBtn();
    cy.reload();
    AdminPanelServicesPage.verifyTableElement("Обприскуванняtest");
    AdminPanelServicesPage.clickElementActionBtnByName("Обприскуванняtest", "edit");
    AdminPanelServicesPage.fillElementPopupInput("Обприскування");    
  });

  it("C514 The Створити сервіс button functionality for Сервіси page", () => {
    const imagepath = "cypress/fixtures/placeholder-img.jpg";
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    AdminPanelServicesPage.clickCreateBtn();
    AdminPanelServicesPage.fillElementPopupInput("test_service");
    AdminPanelServicesPage.uploadImage(imagepath);
    AdminPanelServicesPage.clickServicePopupYesBtn();
    AdminPanelServicesPage.clickServicePopupYesBtn(); // Needs to be clicked twice for service to be created BG-009
    AdminPanelServicesPage.clickPopupCloseBtn();
    cy.reload();
    AdminPanelServicesPage.fillSearchField("test_");
    AdminPanelServicesPage.verifyTableElement("test_service");
  }); 

  it("C515 The Видалення сервісу button functionality for Сервіси page", () => {
    AdminPanelMainPage.clickServicesBtn();
    AdminPanelMainPage.clickSubItemListServicesBtn();
    AdminPanelServicesPage.fillSearchField("test_");
    AdminPanelServicesPage.verifyTableElement("test_service");
    AdminPanelServicesPage.deleteCategory("test_service");
  });

});