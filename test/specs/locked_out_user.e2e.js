import LoginPage from  '../pageobjects/login.page';

describe('Login locked_out_user', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
        browser.setWindowSize(1920, 1080)
    });

    it('Should not login with locked_out_user and empty password', async () => {
        await LoginPage.invalidLogin('locked_out_user', '', 'Epic sadface: Password is required')
    });

    it('Should not login with locked_out_user user and valid password', async () => {
        await LoginPage.invalidLogin('locked_out_user', 'secret_sauce', 'Epic sadface: Sorry, this user has been locked out.')
    });

    it('Should not login with locked_out_user and invalid password', async () => {
        await LoginPage.invalidLogin('locked_out_user', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });
});