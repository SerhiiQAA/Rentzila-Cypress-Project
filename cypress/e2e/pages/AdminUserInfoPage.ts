import BasePage from "./BasePage";

class AdminUserInfoPage extends BasePage {
  elements = {
    entityTypeInput: () => this.getFieldElement("Тип особи"),
    legalEntityTypeInput: () => this.getFieldElement("Тип юридичної особи"),
    privateEntityIdInput: () =>
      this.getFieldElement("ЄДРПОУ для юридичних осіб"),
    individualEntrepreneurIdInput: () =>
      this.getFieldElement("РНОКПП (ІПН) для ФОП"),
    legalEntityIdInput: () =>
      this.getFieldElement("ЄДРПОУ для юридичних осіб"),
    legalEntityNameInput: () => this.getFieldElement("Назва компанії"),
    lastNameInput: () => this.getFieldElement("Прізвище"),
    nameInput: () => this.getFieldElement("Ім'я"),
    patronimInput: () => this.getFieldElement("По-батькові"),
    cityInput: () => this.getFieldElement("Місто"),
    profileNumberInput: () => this.getFieldElement("Номер телефону"),
    profileEmailInput: () => this.getFieldElement("Емейл"),
    viberInput: () => this.getFieldElement("Viber"),
    telegramInput: () => this.getFieldElement("Telegram"),
  };

  getFieldElement(title: string) {
    return cy.contains(title).parent().find(".AdminUserInfo_field__6X4_F");
  }

  verifyUserData(
    lastName,
    name,
    patronim,
    city,
    entityType,
    telegram?,
    viber?,
    legalEntityType?,
    privateEntityId?,
    individualEntrepreneurId?,
    legalEntityId?,
    legalEntityName?
  ) {
    this.elements.entityTypeInput().should("contain.text", entityType);
    legalEntityType &&
      this.elements
        .legalEntityTypeInput()
        .should("contain.text", legalEntityType);
    privateEntityId &&
      this.elements
        .privateEntityIdInput()
        .should("contain.text", privateEntityId);
    individualEntrepreneurId &&
      this.elements
        .individualEntrepreneurIdInput()
        .should("contain.text", individualEntrepreneurId);
    legalEntityId &&
      this.elements.legalEntityIdInput().should("contain.text", legalEntityId);
    legalEntityName &&
      this.elements
        .legalEntityNameInput()
        .should("contain.text", legalEntityName);
    this.elements.lastNameInput().should("contain.text", lastName);
    this.elements.nameInput().should("contain.text", name);
    this.elements.patronimInput().should("contain.text", patronim);
    this.elements.cityInput().should("contain.text", city);
    this.elements.viberInput().should("contain.text", viber);
    this.elements.telegramInput().should("contain.text", telegram);
  }
}
export default new AdminUserInfoPage();
