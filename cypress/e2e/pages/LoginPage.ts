import BasePage from './BasePage';

class LoginPage extends BasePage {

    elements = {
        mailInput: () => cy.get('#email').eq(0),
        passwordInput: () => cy.get('#password'),
        signInBtn: () => cy.get('.LoginForm_form__7G3Zk > div:nth-child(3) > button'),
    };

    typeInMailInput(text: string) {
        this.elements.mailInput().type(text);
    }

    typeInPasswordInput(city: string) {
        this.elements.passwordInput().type(city);
    }

    clickSignInBtn() {
        this.elements.signInBtn().click();
    }

    login(email: string, password: string) {
        this.typeInMailInput(email);
        this.typeInPasswordInput(password);
        this.clickSignInBtn();
    }
}
export default new LoginPage();