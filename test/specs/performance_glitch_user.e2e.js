import LoginPage from  '../pageobjects/login.page';

describe('Login performance_glitch_user', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
    });

    it('Should not login with performance_glitch_user and invalid password', async () => {
        await LoginPage.invalidLogin('performance_glitch_user', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with performance_glitch_user and empty password', async () => {
        await LoginPage.invalidLogin('performance_glitch_user', '', 'Epic sadface: Password is required')
    });

    it('Should login with valid credentials (user: performance_glitch_user)', async () => {
        await LoginPage.sucessLogin('performance_glitch_user', 'secret_sauce');
    });
});