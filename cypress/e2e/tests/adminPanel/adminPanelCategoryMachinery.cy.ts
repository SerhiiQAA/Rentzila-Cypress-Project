import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelUsersPage from "../../pages/adminPanelPages/AdminPanelUsersPage";
import AdminPanelMachineryPage from "../../pages/adminPanelPages/AdminPanelMachineryPage";
import { faker } from "@faker-js/faker";
import { envs } from "../../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
    cy.wait(2500);
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
  });

  it("C431 Equipment menu section functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.elements.subCategoryMachinery().should("have.length", 2);
    AdminPanelMainPage.elements
      .subCategoryMachineryArea()
      .should("contain.text", "Категорії техніки");
    AdminPanelMainPage.elements
      .subCategoryMachineryArea()
      .should("contain.text", "Виробники техніки");
    AdminPanelMainPage.clickSubItemCategoriesMachineryBtn();
    AdminPanelMainPage.verifyCurrentUrl("categories/");
    AdminPanelMainPage.elements
      .title()
      .should("contain.text", "Категорії техніки");
    AdminPanelMainPage.clickSubItemProducerMachineryBtn();
    AdminPanelMainPage.verifyCurrentUrl("manufacturers/");
    AdminPanelMainPage.elements
      .title()
      .should("contain.text", "Виробники техніки");
  });

  it.skip("C432 The Створити категорію button functionality for the Категорії техніки page", () => {
    // Tests with data changes are temporarily disabled, we are working on the admin panel
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemCategoriesMachineryBtn();
    AdminPanelMainPage.verifyCurrentUrl("admin/categories/");
    AdminPanelMachineryPage.clickCreateBtn();
    AdminPanelMachineryPage.elements
      .createCategoryModalTitle()
      .should("have.text", "Створити категорію");
    const randomNumber = faker.string.numeric(5);
    const categoryName = `Категорія 1 ${randomNumber}`;
    AdminPanelMachineryPage.fillCreatCategoryModalNameField(categoryName);
    AdminPanelMachineryPage.selectCategoryModalDropdownOption(
      "Складська техніка"
    );
    AdminPanelMachineryPage.clickCreatCategoryModalSavelBtn();
    AdminPanelMainPage.verifyCurrentUrl("admin/categories/");
    AdminPanelMachineryPage.fillSearchField(categoryName);
    AdminPanelMachineryPage.elements
      .nameValue()
      .should("contain.text", categoryName);
  });

  it("C433 The ID and Назва filters functionality for the Категорії техніки page", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemCategoriesMachineryBtn();
    AdminPanelMachineryPage.verifyCurrentUrl("admin/categories/");
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
    // To sort by name, you need to specify the requirements
  });

  it("C434 The numbers of service categories on the page functionality for the Категорії техніки page", () => {
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemCategoryMachineryBtn();
    AdminPanelUsersPage.elements
      .rowsNumberInTable()
      .its("length")
      .should("eq", 10);
    AdminPanelUsersPage.clickPagesDropdown();
    AdminPanelUsersPage.verifyDropdownOptions("10", "20", "50");
    AdminPanelUsersPage.clickPagesSort20();
    AdminPanelUsersPage.elements
      .rowsNumberInTable()
      .its("length")
      .should("eq", 20);
    AdminPanelUsersPage.clickPagesDropdown();
    AdminPanelUsersPage.clickPagesSort50();
    AdminPanelUsersPage.elements
      .rowsNumberInTable()
      .its("length")
      .should("eq", 50);
  });

  it("C435 The Перегляд категорії button functionality for the Категорії техніки page", () => {
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemCategoryMachineryBtn();
    AdminPanelUsersPage.elements.actEyeBtn().first().click();
    AdminPanelMachineryPage.elements
      .viewMachineryModalTitle()
      .should("have.text", "Перегляд категорії");
    AdminPanelMachineryPage.clickViewMachineryModalCancelBtn();
    AdminPanelMachineryPage.verifyCurrentUrl("categories/");
  });

  it.skip("C436 The Редагувати категорію button functionality for the Категорії техніки page", () => {
    // Tests with data changes are temporarily disabled, we are working on the admin panel
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemCategoryMachineryBtn();
    AdminPanelUsersPage.elements.actEditBtn().first().click();
    AdminPanelMachineryPage.elements
      .viewMachineryModalTitle()
      .should("have.text", "Редагувати категорію");
    const randomNumber = faker.string.numeric(5);
    const categoryName = `Категорія 1 ${randomNumber}`;
    AdminPanelMachineryPage.fillEditMachineryModalNameField(categoryName);
    AdminPanelMachineryPage.selectCategoryEditMachineryModalDropdown(
      "Комунальна техніка"
    );
    AdminPanelMachineryPage.clickEditMachineryModalSubmitBtn();
    AdminPanelMachineryPage.fillSearchField(categoryName);
    AdminPanelMachineryPage.elements
      .nameValue()
      .eq(1)
      .should("have.text", categoryName);
  });

  it.skip("C437 The Видалення категорії button functionality for the Категорії техніки page", () => {
    // Tests with data changes are temporarily disabled, we are working on the admin panel
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemCategoryMachineryBtn();
    AdminPanelMachineryPage.clickCreateBtn();
    AdminPanelMachineryPage.elements
      .createCategoryModalTitle()
      .should("have.text", "Створити категорію");
    const randomNumber = faker.string.numeric(5);
    const categoryName = `Категорія 1 ${randomNumber}`;
    AdminPanelMachineryPage.fillCreatCategoryModalNameField(categoryName);
    AdminPanelMachineryPage.selectCategoryModalDropdownOption(
      "Складська техніка"
    );
    AdminPanelMachineryPage.clickCreatCategoryModalSavelBtn();
    AdminPanelMachineryPage.fillSearchField(categoryName);
    cy.wait(500);
    AdminPanelUsersPage.elements.actDeleteBtn().first().click();
    AdminPanelMachineryPage.elements
      .viewMachineryModalTitle()
      .should("have.text", "Видалення категорії");
    AdminPanelMachineryPage.clickDeleteMachineryModalSubmitBtn();
    AdminPanelMachineryPage.fillSearchField(categoryName);
    AdminPanelMachineryPage.elements.nameValue().eq(1).should("not.exist");
  });

  it("C499 The Знайти по назві search field functionality for the Категорії техніки page", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemCategoriesMachineryBtn();
    AdminPanelMachineryPage.verifyCurrentUrl("admin/categories/");
    AdminPanelMachineryPage.clickSortByIdBtn();
    AdminPanelMachineryPage.fillSearchField("Категорія 1 17235");
    AdminPanelMachineryPage.elements
      .nameValue()
      .should("contain.text", "Категорія 1 17235");
  });
});
