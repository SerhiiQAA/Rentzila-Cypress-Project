import AdminPanelMainPage from "../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelUsersPage from "../pages/adminPanelPages/AdminPanelUsersPage";
import { envs } from "../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
  });

  it("C399 The Аналітика menu functionality", () => {
    AdminPanelMainPage.clickQueryAnalyticsDropdown();
    AdminPanelMainPage.clickAnalyticsOfUsers();
    AdminPanelMainPage.elements
      .queryAnalyticsDropdown()
      .should("have.text", "Аналітика користувачів");
    AdminPanelMainPage.clickQueryAnalyticsDropdown();
    AdminPanelMainPage.clickAnalyticsOfAd();
    AdminPanelMainPage.elements
      .queryAnalyticsDropdown()
      .should("have.text", "Аналітика оголошень");
    AdminPanelMainPage.clickQueryAnalyticsDropdown();
    AdminPanelMainPage.clickAnalyticsOfTenders();
    AdminPanelMainPage.elements
      .queryAnalyticsDropdown()
      .should("have.text", "Аналітика тендерів");
    AdminPanelMainPage.clickQueryAnalyticsDropdown();
    AdminPanelMainPage.clickAnalyticsOfQuery();
    AdminPanelMainPage.elements
      .queryAnalyticsDropdown()
      .should("have.text", "Аналітика запитів");
  });

  it("C423 The ID, Логін, Ім'я користувача and Дата реєстрації filter buttons functionality", () => {
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.checkIdValuesAscending();
    AdminPanelUsersPage.clickIdSort();
    cy.wait(500);
    AdminPanelUsersPage.clickIdSort();
    cy.wait(1000);
    AdminPanelUsersPage.checkIdValuesDescending();
    AdminPanelUsersPage.clickIdSort();
    cy.wait(500);
    AdminPanelUsersPage.checkIdValuesAscending();
    cy.wait(3000);

    // AdminPanelUsersPage.clickLoginSort();
    // cy.wait(5000);
    // AdminPanelUsersPage.clickLoginSort();
    // AdminPanelUsersPage.clickLoginSort();
    // AdminPanelUsersPage.checkLoginValuesAscending();
    // AdminPanelUsersPage.clickLoginSort();
    // cy.wait(3000);
    // AdminPanelUsersPage.checkLoginSortBtnStateDescending();
    // cy.wait(1000);
    // AdminPanelUsersPage.clickLoginSort();
    // cy.wait(2000);
    // AdminPanelUsersPage.checkLoginValuesAscending();

    AdminPanelUsersPage.clickDateSort();
    cy.wait(1000);
    AdminPanelUsersPage.checkDateValuesDescending();
    cy.wait(1000);
    AdminPanelUsersPage.clickDateSort();
    cy.wait(1000);
    AdminPanelUsersPage.checkDateValuesAscending();
    
    cy.wait(500);
    AdminPanelUsersPage.clickNameSort();
    cy.wait(1000);
    AdminPanelUsersPage.checkNameValuesAscending();
    cy.wait(1000);
    AdminPanelUsersPage.clickNameSort();
    cy.wait(1000);
    AdminPanelUsersPage.checkNameValuesDescending();
  });

  it("C427 The number of users on the page functionality", () => {
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.elements
      .rowsNumberInTable()
      .its("length")
      .should("eq", 10);
    AdminPanelUsersPage.clickPagesDropdown();
    AdminPanelUsersPage.verifyDropdownOptions("10", "20", "50");
    AdminPanelUsersPage.clickPagesSort20();
    AdminPanelUsersPage.elements
      .rowsNumberInTable()
      .its("length")
      .should("eq", 20);
    AdminPanelUsersPage.clickPagesDropdown();
    AdminPanelUsersPage.clickPagesSort50();
    AdminPanelUsersPage.elements
      .rowsNumberInTable()
      .its("length")
      .should("eq", 50);
    // Bug there 52 rows in the table
  });
});
