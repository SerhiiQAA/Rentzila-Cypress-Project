import BasePage from "../BasePage";

class AdminPanelUserInfoPage extends BasePage {
  elements = {
    title: () => cy.get("div.AdminLayout_title__lqIgo"),
    allUserFields: () => cy.get("div.AdminUserInfo_field__6X4_F"),
    closeBtn: () => cy.get('[data-testid="closeBtn"]'),
    deleteBtn: () =>
      cy.get(".AdminUserInfo_buttons_wrapper__qgJVi button:last-child"),
  };

  clickCloseBtn() {
    this.elements.closeBtn().scrollIntoView().click();
  }

  clickDeleteBtn() {
    this.elements.deleteBtn().click();
  }
}

export default new AdminPanelUserInfoPage();
