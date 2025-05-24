import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import { envs } from "../../utils/testData";

describe("Admin functionality", () => {
  it("C399 The Аналітика menu functionality", () => {
    AdminPanelMainPage.visit("admin/");
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
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
});
