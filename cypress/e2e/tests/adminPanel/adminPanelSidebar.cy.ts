import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import { envs } from "../../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
    cy.wait(2500);
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
  });

  it("C397 The Панель стану menu section functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickQueryAnalyticsDropdown();
    AdminPanelMainPage.elements.title().should("have.text", "Панель стану");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Користувачі");
    AdminPanelMainPage.clickSupportBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Техпідтримка");
    AdminPanelMainPage.clickPanelConditionBtn();
  });

  it("C511 The tabs wrapper are displayed", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickAnnouncementBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Оголошення");
    AdminPanelMainPage.clickTendersBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Teндери");
    AdminPanelMainPage.clickJobRequestsBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Запити на роботу");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Користувачі");
    AdminPanelMainPage.clickSupportBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Техпідтримка");
  });
});
