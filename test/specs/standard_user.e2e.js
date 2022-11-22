import LoginPage from  '../pageobjects/login.page';

describe('Login standard_user', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
    });

    it('Should not login with standard_user and empty password', async () => {
        await LoginPage.invalidLogin('standard_user', '', 'Epic sadface: Password is required')
    });

    it('Should not login with standard_user and wrong password', async () => {
        await LoginPage.invalidLogin('standard_user', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should login with valid credentials', async () => {
        await LoginPage.sucessLogin('standard_user', 'secret_sauce');
    });

});