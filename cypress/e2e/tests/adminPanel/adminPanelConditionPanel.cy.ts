import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import { envs } from "../../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
    cy.wait(2000);
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

  it("C400 The filter buttons functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickCalendarBtn();
    AdminPanelMainPage.selectDateInCurrentMonth(1);
    AdminPanelMainPage.selectDateInCurrentMonth(10);
    // Steps starting with: 5. Click on the “”Month“” filter button outdated
    AdminPanelMainPage.clickCalendarBtn();
    AdminPanelMainPage.verifyChangeDateColorCurrentMonth(1);
    AdminPanelMainPage.verifyChangeDateColorCurrentMonth(5);
    AdminPanelMainPage.verifyChangeDateColorCurrentMonth(10);
  });
});
