import LoginPage from  '../pageobjects/login.page';

describe('Login', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
    })

    it('Should not login with empty fields', async () => {
        await invalidLogin('', '', 'Epic sadface: Username is required')
    });

    it('Should not login with invalid user and empty password', async () =>{
        await invalidLogin('invalidUser','', 'Epic sadface: Password is required')
    });

    it('Should not login with standard_user and empty password', async () => {
        await invalidLogin('standard_user', '', 'Epic sadface: Password is required')
    });

    it('Should not login with standard_user and wrong password', async () => {
        await invalidLogin('standard_user', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with wrong user and valid password', async () => {
        await invalidLogin('test', 'secret_sauce', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with empty user name and correct password', async () => {
        await invalidLogin('', 'secret_sauce', 'Epic sadface: Username is required')
    });

    it('Should not login with locked_out_user and empty password', async () => {
        await invalidLogin('locked_out_user', '', 'Epic sadface: Password is required')
    });

    it('Should not login with locked_out_user user and valid password', async () => {
        await invalidLogin('locked_out_user', 'secret_sauce', 'Epic sadface: Sorry, this user has been locked out.')
    });

    it('Should not login with locked_out_user and invalid password', async () => {
        await invalidLogin('locked_out_user', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with problem_user and empty password', async () => {
        await invalidLogin('problem_user', '', 'Epic sadface: Password is required')
    });

    it('Should not login with problem_user and invalid password', async () => {
        await invalidLogin('problem_user', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with performance_glitch_user and invalid password', async () => {
        await invalidLogin('performance_glitch_user', 'test', 'Epic sadface: Username and password do not match any user in this service')
    });

    it('Should not login with performance_glitch_user and empty password', async () => {
        await invalidLogin('performance_glitch_user', '', 'Epic sadface: Password is required')
    });

    it('Should login with valid credentials (user: standard_user)', async () => {
        await sucessLogin('standard_user', 'secret_sauce');
    });

    it('Should login with valid credentials (user: problem_user)', async () => {
        await sucessLogin('problem_user', 'secret_sauce');
    });

    it('Should login with valid credentials (user: performance_glitch_user)', async () => {
        await sucessLogin('performance_glitch_user', 'secret_sauce');
    });
});

let sucessLogin = async (username, password) => {
    await LoginPage.login(username, password);
    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    await expect(LoginPage.title).toExist();
    await expect(LoginPage.title).toHaveTextContaining('PRODUCTS');
    await expect (LoginPage.menuIcon).toBeDisplayed();
    await LoginPage.menuIcon.click();
    await expect(LoginPage.btnLogout).toBeDisplayed();
    await browser.pause(1000)
    await LoginPage.btnLogout.click();
}

let invalidLogin = async (username, password, message) => {
    await LoginPage.login(username, password);
    await LoginPage.errorMessage.waitForDisplayed();
    await expect(LoginPage.errorMessage).toBeDisplayed();
    await expect(LoginPage.errorMessage).toHaveText(message);
    await expect(LoginPage.closeIcon).toBeClickable();
    await browser.refresh();
}