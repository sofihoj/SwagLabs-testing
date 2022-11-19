import LoginPage from  '../pageobjects/login.page';

describe('Login', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
    })

    it('Should not login with empty fields', async () => {
        //await LoginPage.inputUsername.setValue("");
        //await LoginPage.inputPassword.setValue("");
        //await LoginPage.btnLogin.click();
        await LoginPage.login('', '');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username is required');
        await browser.refresh();
    });

    it('Should not login with invalid user and empty password', async () =>{
        await LoginPage.login('invalidUser','');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Password is required');
        await browser.refresh();
    });

    it('Should not login with standard_user and empty password', async () => {
        await LoginPage.login('standard_user', '');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Password is required');
        await browser.refresh();
    });

    // it('Username field should be clear', async () => {
    //     await LoginPage.inputUsername.click();
    //     await LoginPage.inputUsername.clearValue();
    // })

    it('Should not login with standard_user and wrong password', async () => {
        await LoginPage.login('standard_user', 'test');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await browser.refresh();
    });

    it('Should not login with wrong user and valid password', async () => {
        await LoginPage.login('test', 'secret_sauce');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await browser.refresh();
    });

    it('Should not login with empty user name', async () => {
        await LoginPage.login('', 'secret_sauce');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username is required');
        await browser.refresh();
    });

    it('Should not login with locked_out_user and empty password', async () => {
        await LoginPage.login('locked_out_user', '');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Password is required');
        await browser.refresh();
    });

    it('Should not login with locked user and valid password', async () => {
        await LoginPage.login('locked_out_user', 'secret_sauce');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        await browser.refresh();
    });

    it('Should not login with locked_out_user and invalid password', async () => {
        await LoginPage.login('locked_out_user', 'test');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await browser.refresh();
    });

    it('Should not login with problem_user and empty password', async () => {
        await LoginPage.login('problem_user', '');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Password is required');
        await browser.refresh();
    });

    it('Should not login with problem_user and invalid password', async () => {
        await LoginPage.login('problem_user', 'test');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await browser.refresh();
    });

    it('Should not login with performance_glitch_user and invalid password', async () => {
        await LoginPage.login('performance_glitch_user', 'test');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await browser.refresh();
    });

    it('Should not login with performance_glitch_user and empty password', async () => {
        await LoginPage.login('performance_glitch_user', '');
        await LoginPage.errorMessage.waitForDisplayed();
        await expect(LoginPage.errorMessage).toBeDisplayed();
        await expect(LoginPage.errorMessage).toHaveText('Epic sadface: Password is required');
        await browser.refresh();
    });

    it('Should login with valid credentials (user: standard_user)', async () => {
        await LoginPage.login('standard_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect (LoginPage.menuIcon).toBeDisplayed();
        await LoginPage.menuIcon.click();
        await expect(LoginPage.btnLogout).toBeDisplayed();
        await browser.pause(1000)
        await LoginPage.btnLogout.click();
    });

    it('Should login with valid credentials (user: problem_user)', async () => {
        await LoginPage.login('problem_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect (LoginPage.menuIcon).toBeDisplayed();
        await LoginPage.menuIcon.click();
        await expect(LoginPage.btnLogout).toBeDisplayed();
        await browser.pause(1000)
        await LoginPage.btnLogout.click();
    });

    it('Should login with valid credentials (user: performance_glitch_user)', async () => {
        await LoginPage.login('performance_glitch_user', 'secret_sauce');
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect (LoginPage.menuIcon).toBeDisplayed();
        await LoginPage.menuIcon.click();
        await expect(LoginPage.btnLogout).toBeDisplayed();
        await browser.pause(1000)
        await LoginPage.btnLogout.click();
    });
});


