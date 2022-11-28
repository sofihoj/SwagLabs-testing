import LoginPage from  '../pageobjects/login.page';
import Purchase from '../pageobjects/purchase.page';
import Inventory from '../pageobjects/inventory.page';
import Info from '../pageobjects/pageInfo.page'

describe('Purchase standard_user', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/")
        browser.setWindowSize(1920, 1080);
    });

    it('Should login with valid credentials', async () => {
        await LoginPage.sucessLogin('standard_user', 'secret_sauce');
    });

    it('Should add all the products to the cart', async () => {
        await Inventory.addBackpack.click();
        await Inventory.addBikeLight.click();
        await Inventory.addShirt.click();
        await Inventory.addJacket.click();
        await Inventory.addOnesie.click();
        await Inventory.addTshirt.click();
        const cartItems = await (Purchase.cartItems).getText();
        await expect(cartItems).toBe('6')
    })

    it('Should remove all the products to the cart', async () => {
        await Inventory.removeBackpack.click();
        await Inventory.removeBikeLight.click();
        await Inventory.removeShirt.click();
        await Inventory.removeJacket.click();
        await Inventory.removeOnesie.click();
        const cartItems = await (Purchase.cartItems).getText();
        await expect(cartItems).toBe('1')
        await Inventory.removeTshirt.click();
        const cart = await $('#shopping_cart_container > a')
        await expect(cart).toHaveChildren(0)
    })

    it('Should add a product and reset the cart', async () => {
        await Inventory.addProduct();
        await LoginPage.menuIcon.click();
        await Info.resetBtn.click();
        const cart = await $('#shopping_cart_container > a')
        await expect(cart).toHaveChildren(0)
        await Info.closeMenu.click()
        await Inventory.removeBackpack.click();
    })

    it('Should add a product to the cart', async () => {
        await Inventory.addProduct();
    })

    it('Should go to the cart', async () => {
        await Purchase.goToCart();
    })

    it('Should go back to inventory and add another product', async () => {
        await Purchase.btnContinueShopping.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
        await Inventory.addBikeLight.click();
        const cartItems = await $('#shopping_cart_container > a > span').getText();
        await expect(cartItems).toBe('2');
    })

    it('Should go to the cart', async () => {
        await Purchase.goToCart();
    })

    it('Should delete a product', async () => {
        await Inventory.removeBikeLight.click();
        const cartItems = await $('#shopping_cart_container > a > span').getText();
        await expect(cartItems).toBe('1');
    })

    it('Should go to checkout page and return', async () => {
        await Purchase.checkout();
        await Purchase.btnCancel.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
    })

    it('Should go to checkout page', async () => {
        await Purchase.checkout();
    })

    it('Should not be able to continue with empty form', async () => {
        await Purchase.btnContinue.click();
        await expect(Purchase.errorMessage).toBeDisplayed();
        await expect(Purchase.errorMessage).toHaveText('Error: First Name is required');
        await expect(Purchase.closeIcon).toBeClickable();
        await Purchase.closeIcon.click();
    })

    it('Should fill the client form', async () => {
        await Purchase.fillForm('testName', 'testLastName', '2000');
    })

    it('Should cancel and go back to inventory', async () => {
        await Purchase.btnCancel.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
    })

    it('Should go to the cart, checkout and fill form', async () => {
        await Purchase.goToCart();
        await Purchase.checkout();
        await Purchase.fillForm('testName', 'testLastName', '2000');
    })

    it('Should finish the shopping process', async () => {
        await Purchase.lastStep();
    });

    it('Should logout', async () => {
        await LoginPage.logout();
    });

});