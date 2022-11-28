import LoginPage from  '../pageobjects/login.page';
import Purchase from '../pageobjects/purchase.page';
import Inventory from '../pageobjects/inventory.page';

describe('Login problem_user', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
        browser.setWindowSize(1920, 1080);
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

    it('Should add a product to the cart', async () => {
        await Inventory.addProduct();
    })

    it('Should go to the cart', async () => {
        await Purchase.goToCart();
    })

    it('Should go to checkout page', async () => {
        await Purchase.checkout();
    })

    it('Should not fill the client form', async () => {
        await Purchase.inputFirstName.setValue('testName');
        await Purchase.inputLastName.setValue('testLastName');
        await Purchase.inputZipCode.setValue('2000');
        await Purchase.btnContinue.click();
        await Purchase.errorMessage.waitForDisplayed();
        await expect(Purchase.errorMessage).toBeDisplayed();
        await expect(Purchase.errorMessage).toHaveText('Error: Last Name is required');
        await expect(Purchase.closeIcon).toBeClickable();
    })

    it('Should logout', async () => {
        await LoginPage.logout();
    });
});