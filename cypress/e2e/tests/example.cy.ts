import { config } from '../../../config';
import BasePage from '../pages/basePage';
import Header from '../components/Header';

describe('Base Page Test', () => {
  it('should visit the homepage', () => {
    const basePage = new BasePage();
    basePage.visit(); 
  });
});
