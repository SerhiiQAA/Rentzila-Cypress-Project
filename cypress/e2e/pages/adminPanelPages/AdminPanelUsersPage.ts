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
    pagesSort10: () => cy.get('li[data-value="10"]'),
    pagesSort20: () => cy.get('li[data-value="20"]'),
    pagesSort50: () => cy.get('li[data-value="50"]'),
    pagesCountTitle: () => cy.get(".MuiTablePagination-displayedRows"),
    paginationRight: () => cy.get('[data-testid="KeyboardArrowRightIcon"]'),
    paginationLeft: () => cy.get('data-testid="KeyboardArrowLeftIcon"'),
    paginationFirstPage: () => cy.get('[data-testid="FirstPageIcon"]'),
    paginationLastPage: () => cy.get('[data-testid="LastPageIcon"]'),
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

  checkIdValuesAscending() {
    return this.elements.idValues().then(($els) => {
      const values = $els.map((_, el) => +el.innerText).get();
      return expect(values).to.deep.equal([...values].sort((a, b) => a - b));
    });
  }

  checkIdValuesDescending() {
    return this.elements.idValues().then(($els) => {
      const values = $els.map((_, el) => +el.innerText).get();
      return expect(values).to.deep.equal([...values].sort((a, b) => b - a));
    });
  }

  checkLoginValuesAscending() {
    return this.elements.loginValues().then(($els) => {
      let values = $els.map((_, el) => el.innerText.trim()).get();
      values = values.filter((v) => v.length > 0);
      cy.log("Actual values: " + JSON.stringify(values));
      const sortedValues = [...values].sort((a, b) =>
        a
          .toLowerCase()
          .localeCompare(b.toLowerCase(), undefined, { numeric: true })
      );
      cy.log("Expected sorted values: " + JSON.stringify(sortedValues));
      console.log(
        "Character breakdown of actual values:",
        values.map((v) => v.split(""))
      );
      console.log(
        "Character breakdown of expected values:",
        sortedValues.map((v) => v.split(""))
      );

      expect(values).to.deep.equal(sortedValues);
    });
  }

  checkLoginSortBtnStateDescending() {
    return this.elements
      .sortLoginBtnState()
      .should("exist")
      .should("be.visible")
      .should("contain", "sorted descending");
  }

  checkDateValuesAscending() {
    return this.elements.dateValues().then(($els) => {
      const values = $els.map((_, el) => el.innerText.trim()).get();
      const parsedValues = values.map((dateTime) => {
        const [date, time] = dateTime.split(" ");
        const [day, month, year] = date.split(".");
        const [hours, minutes] = time.split(":");
        return `${year}${month}${day}${hours}${minutes}`;
      });
      const sortedValues = [...parsedValues].sort((a, b) => +a - +b);
      expect(parsedValues).to.deep.equal(sortedValues);
    });
  }

  checkDateValuesDescending() {
    return this.elements.dateValues().then(($els) => {
      const values = $els.map((_, el) => el.innerText.trim()).get();
      const parsedValues = values.map((dateTime) => {
        const [date, time] = dateTime.split(" ");
        const [day, month, year] = date.split(".");
        const [hours, minutes] = time.split(":");
        return `${year}${month}${day}${hours}${minutes}`;
      });
      const sortedValues = [...parsedValues].sort((a, b) => +b - +a);
      expect(parsedValues).to.deep.equal(sortedValues);
    });
  }

  checkNameValuesAscending() {
    return this.elements
      .nameValues()
      .should("exist")
      .should("have.length.at.least", 1)
      .then(($els) => {
        const values = $els.map((_, el) => el.innerText.trim()).get();
        expect(values).to.not.be.empty;
        const sortedValues = [...values].sort((a, b) =>
          a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
        );
        expect(values).to.deep.equal(sortedValues);
      });
  }

  checkNameValuesDescending() {
    return this.elements
      .nameValues()
      .should("exist")
      .should("have.length.at.least", 1)
      .then(($els) => {
        let values = $els.map((_, el) => el.innerText.trim()).get();
        values = values.filter((v) => !/^[-\s]+$/.test(v));
        expect(values).to.not.be.empty;
        const sortedValues = [...values].sort((a, b) =>
          b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" })
        );
        expect(values).to.deep.equal(sortedValues);
      });
  }
}

export default new AdminPanelUsersPage();
