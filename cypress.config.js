const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://dev.rentzila.com.ua/",
    viewportWidth: 1280,  
     
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
