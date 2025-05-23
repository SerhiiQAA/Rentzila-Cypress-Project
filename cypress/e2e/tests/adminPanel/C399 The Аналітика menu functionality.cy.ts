import AdminPanelPage from "../../pages/AdminPanelPage";
import LoginPage from "../../pages/LoginPage";
import HeaderPage from "../../components/Header";

describe("Test", () => {
  it("ClickDifBtn", () => {
    AdminPanelPage.visit();
    HeaderPage.clickSignInBtn();
    LoginPage.login("txt2021@ukr.net", "Qwerty123+");
    cy.wait(1000);
    cy.reload();
    HeaderPage.clickSettingsBtn();
    cy.wait(1000);
    AdminPanelPage.clickQueryAnalyticsDropdown();
    AdminPanelPage.clickAnalyticsOfUsers();
    AdminPanelPage.elements
      .graphArea()
      .should("have.attr", "aria-label", "Створені оголошення за день");
      cy.wait(1000);
    AdminPanelPage.clickQueryAnalyticsDropdown();
    AdminPanelPage.clickAnalyticsOfAd();
    AdminPanelPage.elements
      .graphArea()
      .should("have.text", "Створені оголошення за день");
    AdminPanelPage.clickQueryAnalyticsDropdown();
    AdminPanelPage.clickAnalyticsOfTenders();
    AdminPanelPage.elements
      .graphArea()
      .should("have.text", "Створені тендери за день");
  });
});
