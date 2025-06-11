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
    queryAnalyticsDropdown: () => cy.get('span[class*="AdminPanelSelect_value"]'),
    analyticsOfUsers: () =>
      cy.get('[data-testid="selectedItem"]').contains("Аналітика користувачів"),
    analyticsOfAd: () =>
      cy.get('[data-testid="selectedItem"]').contains("Аналітика оголошень"),
    analyticsOfTenders: () =>
      cy.get('[data-testid="selectedItem"]').contains("Аналітика тендерів"),
    analyticsOfQuery: () =>
      cy.get('[data-testid="selectedItem"]').contains("Аналітика запитів"),
    graphArea: () => cy.get('div[class*="AdminPanel_chart_wrapper__enxhw"]'),
    loginEmail: () =>
      cy.get(
        ':nth-child(3) > [data-testid="authorizationContainer"] > .Authorization_wrapper__Q_bZP > .LoginForm_form__7G3Zk > :nth-child(1) > .CustomReactHookInput_input_wrapper__UTXCw > [data-testid="reactHookInput"]'
      ),
    loginPassword: () =>
      cy.get(
        ':nth-child(3) > [data-testid="authorizationContainer"] > .Authorization_wrapper__Q_bZP > .LoginForm_form__7G3Zk > :nth-child(2) > .CustomReactHookInput_field__ys1mK > .CustomReactHookInput_input_wrapper__UTXCw > [data-testid="reactHookInput"]'
      ),
    loginSignInBtn: () =>
      cy.get(
        ':nth-child(3) > [data-testid="authorizationContainer"] > .Authorization_wrapper__Q_bZP > .LoginForm_form__7G3Zk > .ItemButtons_wrapper__bOHMs > .ItemButtons_darkBlueRoundBtn___4GDw'
      ),
  };

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

  login(email: string, password: string) {
    this.elements.loginEmail().should("exist").should("be.visible").type(email);
    this.elements
      .loginPassword()
      .should("exist")
      .should("be.visible")
      .type(password, { log: false });
    this.elements.loginSignInBtn().should("be.visible").click();
  }
}

export default new AdminPanelMainPage();
