const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,

    setupNodeEvents(on, config) {
      allureCypress(on, config);
      config.env = { ...config.env, ...process.env };

      // 🔹 Додамо `cy.task()` тут
      on('task', {
        logMessage(message) {
          console.log("LOG from Cypress task:", message);
          return null;
        },
      });

      return config;
    },

    baseUrl: "https://dev.rentzila.com.ua/",
  },
});
