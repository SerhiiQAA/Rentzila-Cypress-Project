import BasePage from "../BasePage";

class AdminPanelUsersPage extends BasePage {
  elements = {
    adUserBtn: () => cy.get("button.AdminCustomButton_button_wrapper__KXN18"),
    allUsersDropdown: () => cy.get('[data-testid="div_CustomSelect"]'),
    searchField: () => cy.get('[data-testid="input"]'),
    subCategoryAllUsers: () =>
      cy.get('[data-testid="span-customSelect"]').contains("Всі користувачі"),
    subCategoryManagement: () =>
      cy
        .get('[data-testid="span-customSelect"]')
        .contains("Відділ менеджменту"),
    subCategoryCallCentre: () =>
      cy.get('[data-testid="span-customSelect"]').contains("Call-центр"),
    subCategoryIt: () =>
      cy.get('[data-testid="span-customSelect"]').contains("IT-відділ"),
    subCategoryLegalDep: () =>
      cy.get('[data-testid="span-customSelect"]').contains("Юридичний відділ"),
    subCategoryClient: () =>
      cy.get('[data-testid="span-customSelect"]').contains("Клієнт"),
    subCategoryAdmin: () =>
      cy.get('[data-testid="span-customSelect"]').contains("Адміністратор"),
    sortIdBtn: () => cy.get(".MuiTableRow-head").contains("ID"),
    sortLoginBtn: () => cy.get(".MuiTableRow-head").contains("Логін"),
    sortLoginBtnState: () => cy.get("span.css-trfuzi"),
    sortNameBtn: () => cy.get(".MuiTableRow-head").contains("Ім'я користувача"),
    sortGroupeBtn: () =>
      cy.get(".MuiTableRow-head").contains("Група користувача"),
    sortDateBtn: () => cy.get(".MuiTableRow-head").contains("Дата реєстрації"),
    sortActionBtn: () => cy.get(".MuiTableRow-head").contains("Дія"),
    actEyeBtn: () => cy.get('[data-testid="adminOkoButton"]'),
    actEditBtn: () => cy.get('[data-testid="adminPenBtn"]'),
    actDeleteBtn: () => cy.get('[data-testid="bucketBtn"]'),
    idValues: () => cy.get("tbody tr th"),
    loginValues: () => cy.get("tbody tr td:nth-child(2)"),
    nameValues: () => cy.get("tbody tr td:nth-child(3)"),
    groupeValues: () => cy.get("tbody tr td:nth-child(4)"),
    dateValues: () => cy.get("tbody tr td:nth-child(5)"),
    actValues: () => cy.get("tbody tr td:nth-child(6)"),
    pagesDropdown: () => cy.get(".MuiSelect-select"),
    pagesDropdownList: () => cy.get(".MuiMenu-list"),
    pagesSort10: () => cy.get('li[data-value="10"]'),
    pagesSort20: () => cy.get('li[data-value="20"]'),
    pagesSort50: () => cy.get('li[data-value="50"]'),
    rowsNumberInTable: () => cy.get("tbody tr"),
    pagesCountTitle: () => cy.get(".MuiTablePagination-displayedRows"),
    paginationRight: () => cy.get('[data-testid="KeyboardArrowRightIcon"]'),
    paginationLeft: () => cy.get('data-testid="KeyboardArrowLeftIcon"'),
    paginationFirstPage: () => cy.get('[data-testid="FirstPageIcon"]'),
    paginationLastPage: () => cy.get('[data-testid="LastPageIcon"]'),
    // may be removed while conflict solving
    searchInput: () => cy.get("[class*='AdminSearchInput_input']"),
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

  clickIdSort() {
    this.elements.sortIdBtn().find("svg").click({ force: true });
  }

  clickLoginSort() {
    this.elements.sortLoginBtn().click();
  }

  clickNameSort() {
    this.elements.sortNameBtn().click();
  }

  clickGroupeSort() {
    this.elements.sortGroupeBtn().click();
  }

  clickDateSort() {
    this.elements.sortDateBtn().click();
  }

  clickActionSort() {
    this.elements.sortActionBtn().click();
  }

  clickPagesDropdown() {
    this.elements.pagesDropdown().click();
  }

  clickPagesSort10() {
    this.elements.pagesSort10().click();
  }
  clickPagesSort20() {
    this.elements.pagesSort20().click();
  }
  clickPagesSort50() {
    this.elements.pagesSort50().click();
  }

  verifyDropdownOptions(...expectedOptions) {
    return this.elements
      .pagesDropdownList()
      .children()
      .each((option, index) => {
        cy.wrap(option).should("have.text", expectedOptions[index]);
      });
  }

  verifyIdValues(order = "asc") {
    return this.elements
      .idValues()
      .should("be.visible")
      .should("have.length.at.least", 2)
      .then(($els) => {
        const values = $els.map((_, el) => +Cypress.$(el).text().trim()).get();
        const sortedValues =
          order === "desc"
            ? [...values].sort((a, b) => b - a)
            : [...values].sort((a, b) => a - b);
        console.log("Actual values:", values);
        console.log("Expected sorted values:", sortedValues);
        expect(values).to.deep.equal(sortedValues);
      });
  }

  verifyLoginSortBtnStateDescending() {
    return this.elements
      .sortLoginBtnState()
      .should("be.visible")
      .should("contain", "sorted descending");
  }

  verifyLoginValues(order = "asc") {
    return this.elements
      .loginValues()
      .should("be.visible")
      .should("have.length.at.least", 1)
      .then(($els) => {
        let values = $els.map((_, el) => el.innerText.trim()).get();
        values = values.filter((v) => v.length > 0);
        expect(values).to.not.be.empty;
        const sortedValues =
          order === "desc"
            ? [...values].sort((a, b) =>
                b
                  .toLowerCase()
                  .localeCompare(a.toLowerCase(), undefined, { numeric: true })
              )
            : [...values].sort((a, b) =>
                a
                  .toLowerCase()
                  .localeCompare(b.toLowerCase(), undefined, { numeric: true })
              );
        cy.log("Actual values: " + JSON.stringify(values));
        cy.log("Expected sorted values: " + JSON.stringify(sortedValues));
        cy.log(
          "Character breakdown of actual values:",
          values.map((v) => v.split(""))
        );
        cy.log(
          "Character breakdown of expected values:",
          sortedValues.map((v) => v.split(""))
        );
      });
  }

  verifyDateValues(order = "asc") {
    return this.elements
      .dateValues()
      .should("be.visible")
      .should("have.length.at.least", 1)
      .then(($els) => {
        const values = $els.map((_, el) => el.innerText.trim()).get();
        const parsedValues = values.map((dateTime) => {
          const [date, time] = dateTime.split(" ");
          const [day, month, year] = date.split(".");
          const [hours, minutes] = time.split(":");
          return Number(
            `${year}${month.padStart(2, "0")}${day.padStart(
              2,
              "0"
            )}${hours}${minutes}`
          );
        });
        const sortedValues =
          order === "desc"
            ? [...parsedValues].sort((a, b) => b - a)
            : [...parsedValues].sort((a, b) => a - b);
        cy.log("Actual values:", parsedValues);
        cy.log("Expected sorted values:", sortedValues);
        expect(parsedValues).to.deep.equal(sortedValues);
      });
  }

  verifyNameValues(order = "asc") {
    return this.elements
      .nameValues()
      .should("be.visible")
      .should("have.length.at.least", 1)
      .should(($els) => {
        let values = $els.map((_, el) => el.innerText.trim()).get();
        values = values.filter((v) => !/^[-\s]+$/.test(v));
        const sortedValues =
          order === "desc"
            ? [...values].sort((a, b) =>
                b.localeCompare(a, undefined, {
                  numeric: true,
                  sensitivity: "base",
                })
              )
            : [...values].sort((a, b) =>
                a.localeCompare(b, undefined, {
                  numeric: true,
                  sensitivity: "base",
                })
              );
        console.log("Actual values:", values);
        console.log("Expected sorted values:", sortedValues);
        expect(values).to.deep.equal(sortedValues);
      });
  }

   searchUser(username: string) {
    this.elements.searchInput().type(username + "{enter}");
  }

  viewUserData(username: string) {
    this.searchUser(username);
    this.elements.userInfoButton(username).click();
  }

  editUserData(username: string) {
    this.searchUser(username);
    this.elements.editUserInfoButton(username).click();
  }

  visit(path?: string): void {
    super.visit("/admin/users/");
  }
}

export default new AdminPanelUsersPage();
