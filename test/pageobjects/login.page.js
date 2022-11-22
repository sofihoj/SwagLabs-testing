class LoginPage {
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnLogin () {
        return $('#login-button');
    }

    get errorMessage (){
        return $('#login_button_container > div > form > div.error-message-container.error > h3');
    }

    get menuIcon () {
        return $('#react-burger-menu-btn')
    }

    get btnLogout () {
        return $('#logout_sidebar_link')
    }

    get closeIcon () {
        return $('#login_button_container > div > form > div.error-message-container.error > h3 > button > svg')
    }

    get title () {
        return $('.title')
    }

    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogin.click();
    }

    async sucessLogin (username, password) {
        await this.login(username, password);
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await expect(this.title).toExist();
        await expect(this.title).toHaveTextContaining('PRODUCTS');
        await expect (this.menuIcon).toBeDisplayed();
        await this.menuIcon.click();
        await expect(this.btnLogout).toBeDisplayed();
        await browser.pause(1000)
        await this.btnLogout.click();
    }

    async invalidLogin (username, password, message) {
        await this.login(username, password);
        await this.errorMessage.waitForDisplayed();
        await expect(this.errorMessage).toBeDisplayed();
        await expect(this.errorMessage).toHaveText(message);
        await expect(this.closeIcon).toBeClickable();
        await browser.refresh();
    }
}

export default new LoginPage();
