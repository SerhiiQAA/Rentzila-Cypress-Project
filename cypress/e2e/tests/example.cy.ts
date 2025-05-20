import { config } from '../../../config';
import BasePage from '../pages/BasePage';

describe('Base Page Test', () => {
  it('should visit the homepage', () => {
    cy.viewport(config.viewportWidth, config.viewportHeight);
    const basePage = new BasePage();
    basePage.visit(); 
  });
});
