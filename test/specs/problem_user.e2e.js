import LoginPage from  '../pageobjects/login.page';

describe('Login problem_user', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
    });

    it('Should not login with problem_user and empty password', async () => {
        await LoginPage.invalidLogin('problem_user', '', 'Epic sadface: Password is required')
    });

    it('Should not login with problem_user and invalid password', async () => {
        await LoginPage.invalidLogin('problem_user', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should login with valid credentials (user: problem_user)', async () => {
        await LoginPage.sucessLogin('problem_user', 'secret_sauce');
    });
});