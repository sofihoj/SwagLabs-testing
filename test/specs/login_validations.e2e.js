import LoginPage from  '../pageobjects/login.page';

describe('Login validations', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
    })

    it('Should not login with empty fields', async () => {
        await LoginPage.invalidLogin('', '', 'Epic sadface: Username is required')
    });

    it('Should not login with invalid user and empty password', async () =>{
        await LoginPage.invalidLogin('invalidUser','', 'Epic sadface: Password is required')
    });

    it('Should not login with empty user name and correct password', async () => {
        await LoginPage.invalidLogin('', 'secret_sauce', 'Epic sadface: Username is required')
    });

    it('Should not login with wrong user and valid password', async () => {
        await LoginPage.invalidLogin('test', 'secret_sauce', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with invalid user and password', async () => {
        await LoginPage.invalidLogin('test', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });
});