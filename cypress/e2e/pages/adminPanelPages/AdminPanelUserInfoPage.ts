import BasePage from "../BasePage";

class AdminPanelUserInfoPage extends BasePage {
  elements = {
    title: () => cy.get('div[class*="AdminLayout_title"]'),
    allUserFields: () => cy.get('div[class*="AdminUserInfo_field"]'),
    closeBtn: () => cy.get('[data-testid="closeBtn"]'),
    deleteBtn: () =>
      cy.get('[class*="AdminUserInfo_buttons_wrapper"] button:last-child'),
  };

  clickCloseBtn() {
    this.elements.closeBtn().scrollIntoView().click();
  }

  clickDeleteBtn() {
    this.elements.deleteBtn().click();
  }
}

export default new AdminPanelUserInfoPage();
