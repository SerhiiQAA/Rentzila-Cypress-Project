import AdminPanelMainPage from "../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelUsersPage from "../pages/adminPanelPages/AdminPanelUsersPage";
import AdminPanelAddUserModal from "../pages/adminPanelPages/AdminPanelAddUserModal";
import AdminPanelEditUserPage from "../pages/adminPanelPages/AdminPanelEditUserPage";
import AdminPanelMachineryPage from "../pages/adminPanelPages/AdminPanelMachineryPage";
import { faker } from "@faker-js/faker";
import { envs } from "../utils/testData";
import { validOperatorCodes } from "../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
    cy.wait(2500);
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
  });

  it("C438 The Створити виробника button functionality for the Виробники техніки page", () => {
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemProducerMachineryBtn();
    AdminPanelMachineryPage.verifyCurrentUrl("manufacturers/");
    AdminPanelMachineryPage.clickCreateBtn();
    const randomNumber = faker.string.numeric(5);
    const categoryName = `Категорія 1 ${randomNumber}`;
    AdminPanelMachineryPage.fillCreatCategoryModalNameField(categoryName);
    AdminPanelMachineryPage.clickCreateManufactureModalSubmitBtn();
    AdminPanelMachineryPage.elements
      .title()
      .should("have.text", "Виробники техніки");
    AdminPanelMachineryPage.fillSearchField(categoryName);
    AdminPanelMachineryPage.elements
      .nameValue()
      .should("contain.text", categoryName);
  });

  it.only("C439 The ID and Назва filter functionality for the Виробники техніки page", () => {
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemProducerMachineryBtn();
    AdminPanelMachineryPage.verifyCurrentUrl("manufacturers/");
    AdminPanelMachineryPage.clickSortByIdBtn();
    AdminPanelMachineryPage.elements.idValue().then((elements) => {
      const ids = Array.from(elements, (el) => parseInt(el.innerText));
      const sortedIdsAsc = [...ids].sort((a, b) => a - b);
      expect(ids).to.deep.equal(sortedIdsAsc);
    });
    AdminPanelMachineryPage.clickSortByIdBtn();
    AdminPanelMachineryPage.elements.idValue().then((elements) => {
      const ids = Array.from(elements, (el) => parseInt(el.innerText));
      const sortedIdsDesc = [...ids].sort((a, b) => b - a);
      expect(ids).to.deep.equal(sortedIdsDesc);
    });
    AdminPanelMachineryPage.clickSortByNameBtn();
    // AdminPanelMachineryPage.clickSortByNameBtn();
AdminPanelMachineryPage.elements.nameValue().then((elements) => {
  const names = Array.from(elements, (el) => el.innerText.trim());
  
  // Алфавітне сортування (з урахуванням регістру)
  const sortedNamesAsc = [...names].sort((a, b) => a.localeCompare(b, 'uk', { numeric: true }));
  
  expect(names).to.deep.equal(sortedNamesAsc);
});

// Зворотне сортування
// AdminPanelMachineryPage.clickSortByNameBtn();
// AdminPanelMachineryPage.elements.nameValue().then((elements) => {
//   const names = Array.from(elements, (el) => el.innerText.trim());
  
//   // Сортування у зворотному порядку
//   const sortedNamesDesc = [...names].sort((a, b) => b.localeCompare(a, 'uk', { numeric: true }));
  
//   expect(names).to.deep.equal(sortedNamesDesc);
//   });
})
});
