import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelUsersPage from "../../pages/adminPanelPages/AdminPanelUsersPage";
import { envs } from "../../utils/testData";

describe("Admin functionality", () => {
  it("C423 The ID, Логін, Ім'я користувача and Дата реєстрації filter buttons functionality", () => {
    AdminPanelMainPage.visit("admin/");
    cy.wait(2000);
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
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
});
