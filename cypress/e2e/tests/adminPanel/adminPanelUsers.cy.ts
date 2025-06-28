import AdminPanelMainPage from "../../pages/adminPanelPages/AdminPanelMainPage";
import AdminPanelUsersPage from "../../pages/adminPanelPages/AdminPanelUsersPage";
import AdminPanelAddUserModal from "../../pages/adminPanelPages/AdminPanelAddUserModal";
import AdminPanelEditUserPage from "../../pages/adminPanelPages/AdminPanelEditUserPage";
import AdminUserInfoPage from "../../pages/adminPanelPages/AdminPanelUserInfoPage";
import { envs } from "../../utils/testData";
import { faker } from "@faker-js/faker";
import { validOperatorCodes } from "../../utils/testData";

describe("Admin functionality", () => {
  beforeEach(() => {
    AdminPanelMainPage.visit("admin/");
    AdminPanelMainPage.login(envs.email_admin, envs.password_admin);
  });

  it("C419 Users menu section functionality", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    cy.url().should("include", "/admin/users");
    AdminPanelMainPage.elements.title().should("have.text", "Користувачі");
  });

  it.skip("C420 The Додати користувача button functionality", () => {
    // Tests with data changes are temporarily disabled, we are working on the admin panel
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.clickAddUserBtn();
    AdminPanelAddUserModal.selectDropdownOption("Відділ менеджменту");
    const lastName = faker.person.lastName();
    const operatorCode = faker.helpers.arrayElement(validOperatorCodes);
    const mobileNumber = `+38 ${operatorCode} ${faker.string.numeric(7)}`;
    AdminPanelAddUserModal.fillLastName(lastName);
    AdminPanelAddUserModal.fillFirstName(faker.person.firstName());
    AdminPanelAddUserModal.fillMiddleName(faker.person.middleName());
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

  it("C423 The ID, Логін, Ім'я користувача and Дата реєстрації filter buttons functionality", () => {
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.clickIdSort();
    AdminPanelUsersPage.verifyIdValues("asc");
    AdminPanelUsersPage.clickIdSort();
    AdminPanelUsersPage.verifyIdValues("desc");
    AdminPanelUsersPage.clickIdSort();
    AdminPanelUsersPage.verifyIdValues("asc");
    AdminPanelUsersPage.clickLoginSort();
    AdminPanelUsersPage.verifyLoginValues("asc");
    AdminPanelUsersPage.clickLoginSort();
    AdminPanelUsersPage.verifyLoginSortBtnStateDescending();
    AdminPanelUsersPage.clickDateSort();
    AdminPanelUsersPage.verifyDateValues("asc");
    AdminPanelUsersPage.clickDateSort();
    AdminPanelUsersPage.verifyDateValues("desc");
    AdminPanelUsersPage.clickNameSort();
    AdminPanelUsersPage.verifyNameValues("asc");
    AdminPanelUsersPage.clickNameSort();
    AdminPanelUsersPage.verifyNameValues("desc");
  });

  it("C424 The Редагування даних користувача button functionality Blocker phone number field", () => {
    AdminPanelMainPage.verifyCurrentUrl("admin/");
    AdminPanelMainPage.clickUsersBtn();
    AdminPanelUsersPage.clickActEyeBtn();
    AdminUserInfoPage.elements
      .title()
      .should("contain.text", "Перегляд користувача");
    AdminUserInfoPage.elements.allUserFields().each(($field) => {
      cy.wrap($field).find("input, textarea, select").should("not.exist");
    });
    AdminUserInfoPage.clickCloseBtn();
    AdminPanelMainPage.verifyCurrentUrl("/admin/users");
    AdminUserInfoPage.elements
      .title()
      .should("contain.text", "Користувачі");
  });

  it.skip("C425 The Редагування даних користувача button functionality Blocker phone number field", () => {
    // Tests with data changes are temporarily disabled, we are working on the admin panel
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

  it.skip('C426 The "Видалити користувача" button functionality', () => {
    // Tests with data changes are temporarily disabled, we are working on the admin panel
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

  it("C427 The number of users on the page functionality", () => {
    AdminPanelMainPage.clickUsersBtn();
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
    // Bug there 52 rows in the table
  });
});
