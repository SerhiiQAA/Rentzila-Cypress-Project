import BasePage from '../pages/basePage';

describe('Base Page Test', () => {
  it('should visit the homepage', () => {
    const basePage = new BasePage();
    basePage.visit(); 
  });
});
