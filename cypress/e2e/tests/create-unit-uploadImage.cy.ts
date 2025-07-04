// / <reference types="Cypress" />

import BasePage from "../pages/BasePage";
import MainPage from "../pages/MainPage";
import header from "../components/Header";
import loginPage from "../pages/LoginPage";
import createUnitPage from "../pages/CreateUnitPage";
import { createUnitData } from "../utils/createUnitData";
import { should } from "chai";

const basePage = new BasePage();
const mainPage = new MainPage();

describe("Create Unit page tests", () => {

  beforeEach(() => {
    basePage.visit();
    mainPage.closeTelegramModal();
    header.clickAdAnnouncementBtn();
    loginPage.login(Cypress.env("USER_EMAIL"), Cypress.env("USER_PASSWORD"));
    createUnitPage.fillAllValidData();
    createUnitPage.clickNextBtn();
  });

  it("C367 - Verify image upload panels", () => {
    createUnitPage.elements
      .imageUploadTitle()
      .should("be.visible")
      .and("have.text", "Фото технічного засобу *");
    createUnitPage.elements
      .clueImageLine()
      .should("be.visible")
      .and("have.text", createUnitData.clueLineText);
    createUnitData.imageFiles.forEach((fileName, index) => {
      createUnitPage.elements.imageUploadBlock().eq(index).click();
      createUnitPage.uploadImage(fileName);
    });

    createUnitPage.elements
      .mainImageLabel()
      .should("be.visible")
      .and("have.text", "Головне");
    createUnitPage.dragImage(1, 0);
    createUnitPage.elements.unitImage().each(($el, index) => {
      cy.wrap($el).realHover();
      createUnitPage.elements.deleteImageIcon().eq(index).should("be.visible");
    });
    for (let i = 11; i >= 0; i--) {
      createUnitPage.elements.unitImage().eq(i).realHover();
      createUnitPage.elements.deleteImageIcon().eq(i).click();
      createUnitPage.elements.unitImage().eq(i).should("not.be.visible");
    }
  });

  it("C384 - Verify same images uploading", () => {
    createUnitPage.elements.imageUploadBlock().eq(0).click();
    createUnitPage.uploadImage("image-1.jpg");
    createUnitPage.elements.imageUploadBlock().eq(1).click();
    createUnitPage.uploadImage("image-1.jpg");
    createUnitPage.elements
      .invalidImagePopup()
      .should("exist")
      .and("be.visible")
      .and("contain.text", "Ви не можете завантажити двічі один файл.");

    createUnitPage.clickCrossIconInvalidImagePopup();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("have.length", 1);
    createUnitPage.elements.imageUploadBlock().eq(1).click();
    createUnitPage.uploadImage("image-1.jpg");
    createUnitPage.elements
      .invalidImagePopupBtn()
      .should("be.visible")
      .and("have.text", "Зрозуміло");
    createUnitPage.clickInvalidImagePopupBtn();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("have.length", 1);
    createUnitPage.elements.imageUploadBlock().eq(1).click();
    createUnitPage.uploadImage("image-1.jpg");
    createUnitPage.clickOutsidePopup();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("have.length", 1);
  });

  it("C401 - Verify uploading of invalid file type", () => {
    createUnitPage.elements.imageUploadBlock().eq(0).click();
    createUnitPage.uploadImage("Lorem ipsum.docx");
    createUnitPage.elements
      .invalidImagePopup()
      .should("exist")
      .and("be.visible")
      .and("contain.text", createUnitData.imagePopupText);
    createUnitPage.clickCrossIconInvalidImagePopup();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("not.exist");
    createUnitPage.elements.imageUploadBlock().eq(0).click();
    createUnitPage.uploadImage("Lorem ipsum.docx");
    createUnitPage.elements
      .invalidImagePopupBtn()
      .should("be.visible")
      .and("have.text", "Зрозуміло");
    createUnitPage.clickInvalidImagePopupBtn();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("not.exist");
    createUnitPage.elements.imageUploadBlock().eq(0).click();
    createUnitPage.uploadImage("Lorem ipsum.docx");
    createUnitPage.clickOutsidePopup();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("not.exist");
  });

  it("C405  -  Verify uploading of invalid size file", () => {
    createUnitPage.elements.imageUploadBlock().eq(0).click();
    createUnitPage.uploadImage("bigFile.mp4");
    createUnitPage.elements
      .invalidImagePopup()
      .should("exist")
      .and("be.visible")
      .and("contain.text", createUnitData.imagePopupText);
    createUnitPage.clickCrossIconInvalidImagePopup();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("not.exist");

    createUnitPage.elements.imageUploadBlock().eq(0).click();
    createUnitPage.uploadImage("bigFile.mp4");
    createUnitPage.elements
      .invalidImagePopupBtn()
      .should("be.visible")
      .and("have.text", "Зрозуміло");
    createUnitPage.clickInvalidImagePopupBtn();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("not.exist");

    createUnitPage.elements.imageUploadBlock().eq(0).click();
    createUnitPage.uploadImage("bigFile.mp4");
    createUnitPage.clickOutsidePopup();
    createUnitPage.elements.invalidImagePopup().should("not.exist");
    createUnitPage.elements.upoloadedImage().should("not.exist");
  });

  it("C390 - Verify 'Назад' button", () => {
    createUnitPage.elements.cancelBtn().should("have.text", "Назад");
    createUnitPage.clickCancelBtn();
    createUnitPage.elements
      .createUnitPageTitle()
      .should("be.visible")
      .and("have.text", "Створити оголошення");
    createUnitPage.elements.tabsCreateUnit().each((tab, index) => {
      if (index === 0) {
        cy.wrap(tab).should("have.attr", "aria-selected", "true");
      } else {
        cy.wrap(tab).should("have.attr", "aria-selected", "false");
      }
    });
  });

  it("C393 - Verify 'Далі' button", () => {
    createUnitPage.elements.nextBtn().should("have.text", "Далі");
    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .imageUploadTitle()
      .should("be.visible")
      .and("have.text", "Фото технічного засобу *");
    createUnitPage.elements
      .clueImageLine()
      .should("have.text", createUnitData.clueLineText)
      .and("have.css", "color", "rgb(247, 56, 89)");
    createUnitPage.elements.imageUploadBlock().eq(0).click();
    createUnitPage.uploadImage("image-1.jpg");
    createUnitPage.clickNextBtn();
    createUnitPage.elements
      .createUnitPageTitle()
      .should("have.text", "Створити оголошення");
    createUnitPage.elements.sericesTabTitle().should("have.text", "Послуги");
    createUnitPage.elements.tabsTitles().each((tab, index) => {
      cy.wrap(tab).should("have.text", createUnitData.tabTitles[index]);
    });
    createUnitPage.elements.tabsCreateUnit().each((tab, index) => {
      if (index === 2) {
        cy.wrap(tab).should("have.attr", "aria-selected", "true");
      } else {
        cy.wrap(tab).should("have.attr", "aria-selected", "false");
      }
    });
  });
});
