import { config } from '../../../config';
import BasePage from '../pages/BasePage';
import Header from '../components/Header';

describe('Base Page Test', () => {
  it('should visit the homepage', () => {
    cy.viewport(config.viewportWidth, config.viewportHeight);
    BasePage.visit(); 
  });
});
