export const envs = {
  email: Cypress.env("USER_EMAIL"),
  password: Cypress.env("USER_PASSWORD"),
  email_admin: Cypress.env("ADMIN_EMAIL"),
  password_admin: Cypress.env("ADMIN_PASSWORD"),
  phone: Cypress.env("USER_PHONE"),
  email_regMail: Cypress.env("USER_EMAIL_MAIL_REG"),
  pass_regMail: Cypress.env("USER_PASSWORD_MAIL_REG"),
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

export const validOperatorCodes = [
  "050", "066", "095", "099", 
  "067", "068", "096", "097", "098", 
  "063", "073", "093", "091", "092", "094"
];

export const symbols = ["[]", "#", "(", ")", "!", "+", "/", "123"];

