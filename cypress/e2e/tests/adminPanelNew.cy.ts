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
    cy.wait(2000);
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
  });

  it("C397 The Панель стану menu section functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickQueryAnalyticsDropdown();
    AdminPanelMainPage.elements.title().should("have.text", "Панель стану");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Користувачі");
    AdminPanelMainPage.clickSupportBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Техпідтримка");
    AdminPanelMainPage.clickPanelConditionBtn();
  });

  it("C511 The tabs wrapper are displayed", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickAnnouncementBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Оголошення");
    AdminPanelMainPage.clickTendersBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Teндери");
    AdminPanelMainPage.clickJobRequestsBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Запити на роботу");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Користувачі");
    AdminPanelMainPage.clickSupportBtn();
    AdminPanelMainPage.elements.title().should("have.text", "Техпідтримка");
  });

  it("C419 Users menu section functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    cy.url().should("include", "/admin/users");
    AdminPanelMainPage.elements.title().should("have.text", "Користувачі");
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

  it("C420 The Додати користувача button functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.clickAddUserBtn();
    AdminPanelAddUserModal.selectDropdownOption("Відділ менеджменту");
    const lastName = faker.person.lastName();
    AdminPanelAddUserModal.fillLastName(lastName);
    AdminPanelAddUserModal.fillFirstName(faker.person.firstName());
    AdminPanelAddUserModal.fillMiddleName(faker.person.middleName());
    const operatorCode = faker.helpers.arrayElement(validOperatorCodes);
    const mobileNumber = `+38 ${operatorCode} ${faker.string.numeric(7)}`;
    AdminPanelAddUserModal.fillMobileNumber(mobileNumber);
    AdminPanelAddUserModal.fillEmail(
      faker.internet.email({ provider: "gmail.com" })
    );
    AdminPanelAddUserModal.fillPassword(
      faker.internet.password({ length: 10, pattern: /[A-Za-z0-9]/ }) + "1Aa"
    );
    AdminPanelAddUserModal.clickSubmitBtn();
    AdminPanelUsersPage.fillSearchField(lastName);
    AdminPanelUsersPage.elements.nameValues().should("contain.text", lastName);
  });

  it("C421 The Всі користувачі filter button functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.selectDropdownOption("Клієнт");
    AdminPanelUsersPage.elements
      .groupeValues()
      .should("contain.text", "Клієнт");
  });

  it("C422 The Знайти по назві search field functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.fillSearchField("Anton");
    AdminPanelUsersPage.elements.nameValues().should("contain.text", "Anton");
  });

  it("C425 The Редагування даних користувача button functionality Blocker phone number field", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.clickActEditBtn();
    AdminPanelEditUserPage.elements
      .title()
      .should("contain.text", "Редагування даних користувача");
    AdminPanelEditUserPage.selectDropdownOption("Клієнт");
    const lastName = faker.person.lastName();
    const operatorCode = faker.helpers.arrayElement(validOperatorCodes);
    const mobileNumber = `+38 ${operatorCode} ${faker.string.numeric(7)}`;
    AdminPanelEditUserPage.fillLastName(lastName);
    AdminPanelEditUserPage.fillFirstName(faker.person.firstName());
    AdminPanelEditUserPage.fillMobileNumber(mobileNumber);
    // The email field is not available for editing manually (Web in browsers Chrome, Edge, Firefox), bug
    // For now, the next steps are commented:
    // AdminPanelEditUserPage.fillEmail(
    //   faker.internet.email({ provider: "gmail.com" })
    // );
    // AdminPanelEditUserPage.clickSubmitBtn();
    // AdminPanelMainPage.verifyCurrentUrl("admin/users");
    // AdminPanelUsersPage.fillSearchField(lastName);
    // AdminPanelUsersPage.elements.nameValues().should("contain.text", lastName);
  });

  it('C426 The "Видалити користувача" button functionality', () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.clickAddUserBtn();
    const lastName = faker.person.lastName();
    const operatorCode = faker.helpers.arrayElement(validOperatorCodes);
    const mobileNumber = `+38 ${operatorCode} ${faker.string.numeric(7)}`;
    const email = faker.internet.email({ provider: "gmail.com" });
    AdminPanelAddUserModal.createNewUser({
      lastName: lastName,
      firstName: faker.person.firstName(),
      mobile: mobileNumber,
      email: email,
      password:
        faker.internet.password({ length: 10, pattern: /[A-Za-z0-9]/ }) + "1Aa",
      optionName: "Клієнт",
    });
    AdminPanelUsersPage.fillSearchField(email);
    AdminPanelUsersPage.elements.loginValues().should("contain.text", email);
    AdminPanelUsersPage.clickActDeleteBtn();
    AdminPanelUsersPage.elements
      .deleteUserModalText()
      .should("contain.text", "Ви впевнені, що хочете видалити користувача");
    AdminPanelUsersPage.clickDeleteUserModalOkBtn();
    AdminPanelMainPage.verifyCurrentUrl("admin/users");
    AdminPanelUsersPage.fillSearchField(email);
    AdminPanelUsersPage.elements.loginValues().should("not.exist");
  });

  it("C431 Equipment menu section functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickMachineryBtn();
    AdminPanelMainPage.elements
      .subCategoryMachinery()
      .should("have.length", 2);
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

  it("C432 The Створити категорію button functionality for the Категорії техніки page", () => {
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
