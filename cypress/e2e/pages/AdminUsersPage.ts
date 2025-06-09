import { base } from "@faker-js/faker/.";
import BasePage from "./BasePage";

class AdminUsersPage extends BasePage {
  elements = {
    searchInput: () => cy.get(".AdminSearchInput_input__5oJIu"),
    userInfoButton: (username) =>
      cy
        .get('[data-testid="adminRowContainer"]')
        .contains(username)
        .parent()
        .find('[data-testid="adminOkoButton"]'),
    editUserInfoButton: (username) =>
      cy
        .get('[data-testid="adminRowContainer"]')
        .contains(username)
        .parent()
        .find('[data-testid="adminPenBtn"]'),
  };

  searchUser(username: string) {
    this.elements.searchInput().type(username + "{enter}");
  }

  viewUserData(username: string) {
    this.searchUser(username);
    this.elements.userInfoButton(username).click();
  }

  editUserData(username: string){
    this.searchUser(username);
    this.elements.editUserInfoButton(username).click();
  }

  visit(path?: string): void {
    super.visit("/admin/users/");
  }
}
export default new AdminUsersPage();
