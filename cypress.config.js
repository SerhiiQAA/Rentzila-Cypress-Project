const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter"); 

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev.rentzila.com.ua/",
    viewportWidth: 1280,

    setupNodeEvents(on, config) {
      allureCypress(on, config); 
      return config;
    },
  },
});