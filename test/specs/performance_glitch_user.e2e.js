import LoginPage from  '../pageobjects/login.page';
import Purchase from '../pageobjects/purchase.page';
import Inventory from '../pageobjects/inventory.page';

describe('Login performance_glitch_user', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/");
        browser.setWindowSize(1920, 1080);
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

    it('Should add a product to the cart', async () => {
        await Inventory.addProduct();
    })

    it('Should go to the cart', async () => {
        await Purchase.goToCart();
    })

    it('Should go to checkout page', async () => {
        await Purchase.checkout();
    })

    it('Should fill the client form', async () => {
        await Purchase.fillForm('testName', 'testLastName', '2000');
    })

    it('Should finish the shopping process', async () => {
        await Purchase.lastStep();
    });

    it('Should logout', async () => {
        await LoginPage.logout();
    });
});