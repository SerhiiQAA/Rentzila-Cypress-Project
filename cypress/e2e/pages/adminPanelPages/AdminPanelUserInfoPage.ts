import BasePage from "../BasePage";

class AdminUserInfoPage extends BasePage {
  elements = {
    entityTypeInput: () => this.getFieldElement("Тип особи"),
    legalEntityTypeInput: () => this.getFieldElement("Тип юридичної особи"),
    privateEntityIdInput: () =>
      this.getFieldElement("ЄДРПОУ для юридичних осіб"),
    individualEntrepreneurIdInput: () =>
      this.getFieldElement("РНОКПП (ІПН) для ФОП"),
    legalEntityIdInput: () => this.getFieldElement("ЄДРПОУ для юридичних осіб"),
    legalEntityNameInput: () => this.getFieldElement("Назва компанії"),
    lastNameInput: () => this.getFieldElement("Прізвище"),
    nameInput: () => this.getFieldElement("Ім'я"),
    patronimInput: () => this.getFieldElement("По-батькові"),
    cityInput: () => this.getFieldElement("Місто"),
    profileNumberInput: () => this.getFieldElement("Номер телефону"),
    profileEmailInput: () => this.getFieldElement("Емейл"),
    viberInput: () => this.getFieldElement("Viber"),
    telegramInput: () => this.getFieldElement("Telegram"),
    title: () => cy.get('div[class*="AdminLayout_title"]'),
    allUserFields: () => cy.get('div[class*="AdminUserInfo_field"]'),
    closeBtn: () => cy.get('[data-testid="closeBtn"]'),
    deleteBtn: () =>
      cy.get('[class*="AdminUserInfo_buttons_wrapper"] button:last-child'),
  };

  getFieldElement(title: string) {
    return cy.contains(title).parent().find('[class*="AdminUserInfo_field"]');
  }

  verifyUserData(user: {
    lastName: string;
    name: string;
    patronim: string;
    city: string;
    entityType: string;
    telegram?: string;
    viber?: string;
    legalEntityType?: string;
    privateEntityId?: string;
    individualEntrepreneurId?: string;
    legalEntityId?: string;
    legalEntityName?: string;
  }) {
    this.elements.entityTypeInput().should("contain.text", user.entityType);
    user.legalEntityType &&
      this.elements
        .legalEntityTypeInput()
        .should("contain.text", user.legalEntityType);
    user.privateEntityId &&
      this.elements
        .privateEntityIdInput()
        .should("contain.text", user.privateEntityId);
    user.individualEntrepreneurId &&
      this.elements
        .individualEntrepreneurIdInput()
        .should("contain.text", user.individualEntrepreneurId);
    user.legalEntityId &&
      this.elements
        .legalEntityIdInput()
        .should("contain.text", user.legalEntityId);
    user.legalEntityName &&
      this.elements
        .legalEntityNameInput()
        .should("contain.text", user.legalEntityName);
    this.elements.lastNameInput().should("contain.text", user.lastName);
    this.elements.nameInput().should("contain.text", user.name);
    this.elements.patronimInput().should("contain.text", user.patronim);
    this.elements.cityInput().should("contain.text", user.city);
    this.elements.viberInput().should("contain.text", user.viber);
    this.elements.telegramInput().should("contain.text", user.telegram);
  }

  clickCloseBtn() {
    this.elements.closeBtn().scrollIntoView().click();
  }

  clickDeleteBtn() {
    this.elements.deleteBtn().click();
  }
}

export default new AdminUserInfoPage();
