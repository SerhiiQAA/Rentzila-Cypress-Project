# Cypress Automation Testing Project

## 📌 Overview
This project uses **Cypress** for automated testing of web applications. It includes UI and API test cases to ensure application quality.

## 🔧 Installation
To set up the project, run the following commands:

```bash
npm install
npm install cypress --save-dev
```

## 🚀 Running Tests
Run Cypress tests using:

```bash
npx cypress open  # Opens Cypress GUI
npx cypress run   # Runs tests in headless mode
```

🛠️ Available Scripts
You can also use the following scripts for running tests and generating reports:
```bash
"test": "cypress run",                        
"open": "cypress open",
"allure:generate": "allure generate ./allure-results -o ./allure-report",
"allure:open": "allure open ./allure-report",
"allure:run": "npm run test && npm run allure:generate && npm run allure:open"
```

## ✅ Key Features
- UI and API automated testing
- TypeScript support
- Integration with CI/CD pipelines
- Custom commands & plugins