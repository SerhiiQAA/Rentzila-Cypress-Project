import BasePage from "../BasePage";

class AdminPanelMainPage extends BasePage {
  elements = {
    logoBtn: () => cy.get('img[alt="rentzila"]'),
    homeBtn: () => cy.get('[data-testid="homeButton"]'),
    title: () => cy.get('div[class*="AdminLayout_title"]'),
    panelConditionBtn: () =>
      cy
        .get('div[class*="AdminNavigationLink_iconWithTitle"]')
        .contains("Панель стану"),
    usersBtn: () =>
      cy
        .get('div[class*="AdminNavigationLink_iconWithTitle"]')
        .contains("Користувачі"),
    machineryBtn: () =>
      cy.get('div[data-testid="linksContainer"]').contains("Техніка"),
    servicesBtn: () =>
      cy.get('div[data-testid="linksContainer"]').contains("Сервіси"),
    announcementBtn: () =>
      cy
        .get('div[class*="AdminNavigationLink_iconWithTitle"]')
        .contains("Оголошення"),
    tendersBtn: () =>
      cy
        .get('div[class*="AdminNavigationLink_iconWithTitle"]')
        .contains("Тендери"),
    jobRequestsBtn: () =>
      cy
        .get('div[class*="AdminNavigationLink_iconWithTitle"]')
        .contains("Запити на роботу"),
    supportBtn: () =>
      cy.get('div[class*="AdminNavigationLink_iconWithTitle"]').eq(5),
    logoutBtn: () => cy.get('div[class*="AdminNavigation_button_wrapper"]'),
    switcherNowOrAllTime: () => cy.get('[data-testid="switcher"]'),
    subItemCategoryMachineryBtn: () =>
      cy
        .get('li li [class*="AdminNavigationLink_button"]')
        .contains("Категорії техніки"),
    subCategoryMachineryBtn: () =>
      cy
        .get('li li [class*="AdminNavigationLink_button"]')
        .contains("Категорії техніки"),
    subCategoryMachineryArea: () =>
      cy.get('[data-testid="linkListsComponent"]'),
    subCategoryMachinery: () => cy.get('[data-testid="linkListsComponent"] a'),
    subItemProducerMachineryBtn: () =>
      cy
        .get('li li [class*="AdminNavigationLink_button"]')
        .contains("Виробники техніки"),
    subItemCategoryServicesBtn: () =>
      cy
        .get('li li [class*="AdminNavigationLink_button"]')
        .contains("Категорії сервісів"),
    subItemListServicesBtn: () =>
      cy
        .get('li li [class*="AdminNavigationLink_button"]')
        .contains("Список сервісів"),
    queryAnalyticsDropdown: () =>
      cy.get('span[class*="AdminPanelSelect_value"]'),
    analyticsOfUsers: () =>
      cy.get('[data-testid="selectedItem"]').contains("Аналітика користувачів"),
    analyticsOfAd: () =>
      cy.get('[data-testid="selectedItem"]').contains("Аналітика оголошень"),
    analyticsOfTenders: () =>
      cy.get('[data-testid="selectedItem"]').contains("Аналітика тендерів"),
    analyticsOfQuery: () =>
      cy.get('[data-testid="selectedItem"]').contains("Аналітика запитів"),
    graphArea: () => cy.get('div[class*="AdminPanel_chart_wrapper"]'),
    loginEmail: () =>
      cy.get(
        ':nth-child(3) > [data-testid="authorizationContainer"] > [class*="Authorization_wrapper"] > [class*="LoginForm_form"] > :nth-child(1) > [class*="CustomReactHookInput_input_wrapper"] > [data-testid="reactHookInput"]'
      ),
    loginPassword: () =>
      cy.get(
        ':nth-child(3) > [data-testid="authorizationContainer"] > [class*="Authorization_wrapper"] > [class*="LoginForm_form"] > :nth-child(2) > [class*="CustomReactHookInput_field"] > [class*="CustomReactHookInput_input_wrapper"] > [data-testid="reactHookInput"]'
      ),
    loginSignInBtn: () =>
      cy.get(
        ':nth-child(3) > [data-testid="authorizationContainer"] > [class*="Authorization_wrapper"] > [class*="LoginForm_form"] > [class*="ItemButtons_wrapper"] > [class*="ItemButtons_darkBlueRoundBtn"]'
      ),
    calendarBtn: () => cy.get('div[class*="AdminPanel_calendar"]'),
    calendarCurrentMonth: () =>
      cy.get(".react-datepicker .react-datepicker__month-container").first(),
    calendarNextMonth: () =>
      cy.get(".react-datepicker .react-datepicker__month-container:last-child"),
    calendarDate: () => cy.get(".react-datepicker__day"),
  };

  visit(path?: string): void {
    super.visit("/admin/");
  }

  clickPanelConditionBtn() {
    this.elements.panelConditionBtn().click();
  }

  clickHomeBtn() {
    this.elements.homeBtn().click();
  }

  clickLogoBtn() {
    this.elements.logoBtn().click();
  }

  clickUsersBtn() {
    this.elements.usersBtn().click();
  }

  clickMachineryBtn() {
    this.elements.machineryBtn().click();
  }

  clickServicesBtn() {
    this.elements.servicesBtn().click();
  }

  clickAnnouncementBtn() {
    this.elements.announcementBtn().click();
  }

  clickTendersBtn() {
    this.elements.tendersBtn().click();
  }

  clickJobRequestsBtn() {
    this.elements.jobRequestsBtn().click();
  }

  clickSupportBtn() {
    this.elements.supportBtn().click();
  }

  clickLogoutBtn() {
    this.elements.logoutBtn().click();
  }

  clickSwitcherNowOrAllTime() {
    this.elements.switcherNowOrAllTime().click();
  }

  clickQueryAnalyticsDropdown() {
    this.elements.queryAnalyticsDropdown().click();
  }

  clickAnalyticsOfUsers() {
    this.clickQueryAnalyticsDropdown();
    this.elements.analyticsOfUsers().click();
  }

  clickAnalyticsOfAd() {
    this.clickQueryAnalyticsDropdown();
    this.elements.analyticsOfAd().click();
  }

  clickAnalyticsOfTenders() {
    this.clickQueryAnalyticsDropdown();
    this.elements.analyticsOfTenders().click();
  }

  clickAnalyticsOfQuery() {
    this.clickQueryAnalyticsDropdown();
    this.elements.analyticsOfQuery().click();
  }

  clickSubItemCategoryMachineryBtn() {
    this.elements.subCategoryMachineryBtn().click();
  }

  clickSubItemCategoriesMachineryBtn() {
    this.elements.subItemCategoryMachineryBtn().click();
  }

  clickSubItemProducerMachineryBtn() {
    this.elements.subItemProducerMachineryBtn().click();
  }

  clickSubItemCategoryServicesBtn() {
    this.elements.subItemCategoryServicesBtn().click();
  }

  clickSubItemListServicesBtn() {
    this.elements.subItemListServicesBtn().click();
  }

  clickCalendarBtn() {
    this.elements.calendarBtn().click();
  }

  selectDateInCurrentMonth(day) {
    this.elements.calendarCurrentMonth().within(() => {
      this.elements.calendarDate().contains(day).click();
    });
  }

  selectDateInNextMonth(day) {
    this.elements.calendarNextMonth().within(() => {
      this.elements.calendarDate().contains(day).click();
    });
  }

  verifyChangeDateColorCurrentMonth(day) {
    this.elements
      .calendarCurrentMonth()
      .find(".react-datepicker__day")
      .contains(day)
      .should("have.css", "background-color", "rgb(206, 255, 123)");
  }

  verifyChangeDateColorNextMonth(day) {
    this.elements
      .calendarNextMonth()
      .find(".react-datepicker__day")
      .contains(day)
      .should("have.css", "background-color", "rgb(206, 255, 123)");
  }

  login(email: string, password: string) {
    this.elements
      .loginEmail()
      .should("exist", { timeout: 15000 })
      .should("be.visible")
      .type(email);

    this.elements
      .loginPassword()
      .should("exist", { timeout: 15000 })
      .should("be.visible")
      .type(password, { log: false });

    this.elements.loginSignInBtn().should("be.visible").click();
  }
}

export default new AdminPanelMainPage();
