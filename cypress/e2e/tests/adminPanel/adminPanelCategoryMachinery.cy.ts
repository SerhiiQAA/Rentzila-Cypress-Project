import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelUsersPage from "../../pages/adminPanelPages/AdminPanelUsersPage";
import AdminPanelMachineryPage from "../../pages/adminPanelPages/AdminPanelMachineryPage";
import { envs } from "../../utils/testData";
import { categoryName } from "../../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
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
    const generatedCategoryName = categoryName();
    AdminPanelMachineryPage.fillCreateCategoryModalNameField(
      generatedCategoryName
    );
    AdminPanelMachineryPage.selectCategoryModalDropdownOption(
      "Складська техніка"
    );
    AdminPanelMachineryPage.clickCreatCategoryModalSavelBtn();
    AdminPanelMainPage.verifyCurrentUrl("admin/categories/");
    AdminPanelMachineryPage.fillSearchField(generatedCategoryName);
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
    AdminPanelUsersPage.selectPagesSortingOption(50);
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
    const generatedCategoryName = categoryName();
    AdminPanelMachineryPage.fillEditMachineryModalNameField(
      generatedCategoryName
    );
    AdminPanelMachineryPage.selectCategoryEditMachineryModalDropdown(
      "Комунальна техніка"
    );
    AdminPanelMachineryPage.clickEditMachineryModalSubmitBtn();
    AdminPanelMachineryPage.fillSearchField(generatedCategoryName);
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
    const generatedCategoryName = categoryName();
    AdminPanelMachineryPage.fillCreateCategoryModalNameField(
      generatedCategoryName
    );
    AdminPanelMachineryPage.selectCategoryModalDropdownOption(
      "Складська техніка"
    );
    AdminPanelMachineryPage.clickCreatCategoryModalSavelBtn();
    AdminPanelMachineryPage.fillSearchField(generatedCategoryName);
    cy.wait(500);
    AdminPanelUsersPage.elements.actDeleteBtn().first().click();
    AdminPanelMachineryPage.elements
      .viewMachineryModalTitle()
      .should("have.text", "Видалення категорії");
    AdminPanelMachineryPage.clickDeleteMachineryModalSubmitBtn();
    AdminPanelMachineryPage.fillSearchField(generatedCategoryName);
    AdminPanelMachineryPage.elements.nameValue().eq(1).should("not.exist");
  });

  it("C499 The Знайти по назві search field functionality for the Категорії техніки page", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.clickSubItemCategoriesMachineryBtn();
    AdminPanelMachineryPage.verifyCurrentUrl("admin/categories/");
    AdminPanelMachineryPage.fillSearchField("стелажі складські");
    AdminPanelMachineryPage.elements
      .nameValue()
      .should("contain.text", "стелажі складські");
  });
});
