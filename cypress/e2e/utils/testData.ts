import { faker } from "@faker-js/faker";

export const envs = {
  email: Cypress.env("USER_EMAIL"),
  password: Cypress.env("USER_PASSWORD"),
  phone: Cypress.env("USER_PHONE"),
  email_regMail: Cypress.env("USER_EMAIL_MAIL_REG"),
  pass_regMail: Cypress.env("USER_PASSWORD_MAIL_REG"),
  adminEmail: Cypress.env("ADMIN_EMAIL"),
  adminPassword: Cypress.env("ADMIN_PASSWORD"),
};

export const userFullData = {
  individualEntrepreneur: "ФОП",
  legalEntity: "Юридична особа",
  legalrEntityTypes: ["ТОВ", "ВАТ", "ЗАТ"],
  privateEntity: "Приватна особа",
  legalEntityId: faker.string.numeric(8),
  privateEntityId: faker.string.numeric(10),
  legalEntityIdInvalid: ["   ", "!^*", "test"],
  lastName: faker.person.lastName(),
  name: faker.person.firstName(),
  patronim: faker.person.middleName(),
  viber: "+380506743060",
  telegram: faker.word.noun({ length: { min: 5, max: 10 } }),
  city: "Комсомольське",
  email: envs.email,
};

export const invalidEmails = [
  "testuser rentzila@gmail.com",
  "еуіегіуккутеяшдф",
  "testuserrentzilagmail.com",
  "testuserrentzila@gmailcom",
  "testuserrentzila@gmail",
  "testuserrentzila@.com",
  "testuserrentzila",
  "testuserrentzila@@gmail.com",
];

export const invalidPasswords = [
  "Testuser10   ",
  "   Testuser10",
  "testuser10",
  "TESTUSER10",
  "Еуіегіук10",
];

export const invalidNumbers = [
  "506743060",
  "050674306",
  "+380-50-674-3060",
  " +380 50 674 3060",
  "+380(50)6743060",
  "(50)6743060",
  "05067430600",
  "+10506743060",
  "+0506743060",
];

export const symbols = ["[]", "#", "(", ")", "!", "+", "/", "123"];
