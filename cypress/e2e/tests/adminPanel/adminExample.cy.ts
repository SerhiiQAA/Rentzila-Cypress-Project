import AdminPanelPage from "../../pages/AdminPanelPage";
import LoginPage from "../../pages/LoginPage";
import HeaderPage from "../../components/Header";

describe("Test", () => {
  it("ClickDifBtn", () => {
    AdminPanelPage.visit();
    HeaderPage.clickSignInBtn();
    // adminPanel.visit("/admin"); // Перехід на сторінку адмін-панелі
    LoginPage.login("txt2021@ukr.net", "Qwerty123+");
    cy.wait(1000);
    cy.reload();
    // HeaderPage.clickSettingsBtn();
    cy.wait(1000);
    // LoginPage.login("testuserrentzila@gmail.com", "Testuser10");
    // AdminPanelPage.clickHomeBtn();
    // AdminPanelPage.clickLogoBtn();
    // AdminPanelPage.clickPanelConditionBtn();
    // AdminPanelPage.clickUsersBtn();
    AdminPanelPage.clickMachineryBtn();
    // AdminPanelPage.clickSubItemByText('Категорії техніки');
    // AdminPanelPage.clickServicesBtn();
    // AdminPanelPage.clickAnnouncementBtn();
    // AdminPanelPage.clickTendersBtn();
    // AdminPanelPage.clickJobRequestsBtn();
    // AdminPanelPage.clickSupportBtn();
    // AdminPanelPage.clickSwitcherNowOrAllTime();
    // AdminPanelPage.clickSubItemCategoryMachineryBtn();
    AdminPanelPage.clickSubItemProducerMachineryBtn();
    // AdminPanelPage.clickSubItemCategoryServicesBtn();
    // AdminPanelPage.clickSubItemListServicesBtn();
    // AdminPanelPage.clickSubItemByText('Список сервісів');
    // cy.url().should("include", "/admin");
  });
});
