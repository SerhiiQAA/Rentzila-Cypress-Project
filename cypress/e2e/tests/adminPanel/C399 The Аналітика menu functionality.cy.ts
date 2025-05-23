import AdminPanelPage from "../../pages/AdminPanelPage";
import LoginPage from "../../pages/LoginPage";
import HeaderPage from "../../components/Header";
import { envs } from "../../utils/testData";

describe("Admin functionality", () => {
  it("C399 The Аналітика menu functionality", () => {
    AdminPanelPage.visit();
    HeaderPage.clickSignInBtn();
    LoginPage.login(envs.email_admin, envs.password_admin);
    cy.wait(1000);
    cy.reload();
    HeaderPage.clickSettingsBtn();
    AdminPanelPage.clickQueryAnalyticsDropdown();
    AdminPanelPage.clickAnalyticsOfUsers();
    AdminPanelPage.elements
      .queryAnalyticsDropdown()
      .should("have.text", "Аналітика користувачів");
    AdminPanelPage.clickQueryAnalyticsDropdown();
    AdminPanelPage.clickAnalyticsOfAd();
    AdminPanelPage.elements
      .queryAnalyticsDropdown()
      .should("have.text", "Аналітика оголошень");
    AdminPanelPage.clickQueryAnalyticsDropdown();
    AdminPanelPage.clickAnalyticsOfTenders();
    AdminPanelPage.elements
      .queryAnalyticsDropdown()
      .should("have.text", "Аналітика тендерів");
    AdminPanelPage.clickQueryAnalyticsDropdown();
    AdminPanelPage.clickAnalyticsOfQuery();
    AdminPanelPage.elements
      .queryAnalyticsDropdown()
      .should("have.text", "Аналітика запитів");
  });
});
