import LoginPage from  '../pageobjects/login.page';

describe('Login', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
    })

    it('Should not login with empty fields', async () => {
        await LoginPage.login('', '');
        await invalidLogin('Epic sadface: Username is required')
    });

    it('Should not login with invalid user and empty password', async () =>{
        await LoginPage.login('invalidUser','');
        await invalidLogin('Epic sadface: Password is required')
    });

    it('Should not login with standard_user and empty password', async () => {
        await LoginPage.login('standard_user', '');
        await invalidLogin('Epic sadface: Password is required')
    });

    it('Should not login with standard_user and wrong password', async () => {
        await LoginPage.login('standard_user', 'test');
        await invalidLogin('Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with wrong user and valid password', async () => {
        await LoginPage.login('test', 'secret_sauce');
        await invalidLogin('Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with empty user name and correct password', async () => {
        await LoginPage.login('', 'secret_sauce');
        await invalidLogin('Epic sadface: Username is required')
    });

    it('Should not login with locked_out_user and empty password', async () => {
        await LoginPage.login('locked_out_user', '');
        await invalidLogin('Epic sadface: Password is required')
    });

    it('Should not login with locked_out_user user and valid password', async () => {
        await LoginPage.login('locked_out_user', 'secret_sauce');
        await invalidLogin('Epic sadface: Sorry, this user has been locked out.')
    });

    it('Should not login with locked_out_user and invalid password', async () => {
        await LoginPage.login('locked_out_user', 'test');
        await invalidLogin('Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with problem_user and empty password', async () => {
        await LoginPage.login('problem_user', '');
        await invalidLogin('Epic sadface: Password is required')
    });

    it('Should not login with problem_user and invalid password', async () => {
        await LoginPage.login('problem_user', 'test');
        await invalidLogin('Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with performance_glitch_user and invalid password', async () => {
        await LoginPage.login('performance_glitch_user', 'test');
        await invalidLogin('Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with performance_glitch_user and empty password', async () => {
        await LoginPage.login('performance_glitch_user', '');
        await invalidLogin('Epic sadface: Password is required')
    });

    it('Should login with valid credentials (user: standard_user)', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await sucessLogin();
    });

    it('Should login with valid credentials (user: problem_user)', async () => {
        await LoginPage.login('problem_user', 'secret_sauce');
        await sucessLogin();
    });

    it('Should login with valid credentials (user: performance_glitch_user)', async () => {
        await LoginPage.login('performance_glitch_user', 'secret_sauce');
        await sucessLogin();
    });
});


let sucessLogin = async () => {
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(LoginPage.title).toExist();
    await expect(LoginPage.title).toHaveTextContaining('PRODUCTS');
    await expect (LoginPage.menuIcon).toBeDisplayed();
    await LoginPage.menuIcon.click();
    await expect(LoginPage.btnLogout).toBeDisplayed();
    await browser.pause(1000)
    await LoginPage.btnLogout.click();
}

let invalidLogin = async (message) => {
    await LoginPage.errorMessage.waitForDisplayed();
    await expect(LoginPage.errorMessage).toBeDisplayed();
    await expect(LoginPage.errorMessage).toHaveText(message);
    await expect(LoginPage.closeIcon).toBeClickable();
    await browser.refresh();
}