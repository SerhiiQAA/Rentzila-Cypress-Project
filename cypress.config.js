const { defineConfig } = require("cypress");
require("dotenv").config();
const { allureCypress } = require("allure-cypress/reporter"); 

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1280,
    experimentalInteractiveRunEvents: true,
    setupNodeEvents(on, config) {
      allureCypress(on, config); 
      config.env = { ...config.env, ...process.env };
      return config;
    },
    baseUrl: process.env.UI_BASE_URL || "https://dev.rentzila.com.ua/",
  },
});