class Purchase {
    get addToCart () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get shoppingCart () {
        return $('.shopping_cart_link');
    }

    get btnCheckout () {
        return $('#checkout');
    }

    get inputFirstName () {
        return $('#first-name');
    }

    get inputLastName () {
        return $('#last-name');
    }

    get inputZipCode () {
        return $('#postal-code');
    }

    get btnContinue () {
        return $('#continue');
    }

    get btnFinish () {
        return $('#finish');
    }

    get btnBackHome () {
        return $('#back-to-products');
    }

    get errorMessage () {
        return $('#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error')
    }

    get closeIcon () {
        return $('#checkout_info_container > div > form > div.checkout_info > div.error-message-container.error > h3 > button > svg')
    }

    get title () {
        return $('.title')
    }

    async addProduct () {
        await this.addToCart.click();
        const cartItems = await $('#shopping_cart_container > a > span').getText();
        await expect(cartItems).toBe('1');
    }

    async goToCart () {
        await this.shoppingCart.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/cart.html');
        await expect(this.title).toExist();
        await expect(this.title).toHaveTextContaining('YOUR CART');
    }

    async checkout () {
        await this.btnCheckout.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-one.html');
        await expect(this.title).toExist();
        await expect(this.title).toHaveTextContaining('CHECKOUT: YOUR INFORMATION');
    }

    async fillForm (name, lastName, zipCode) {
        await this.inputFirstName.setValue(name);
        await this.inputLastName.setValue(lastName);
        await this.inputZipCode.setValue(zipCode);
        await this.btnContinue.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-step-two.html');
        await expect(this.title).toExist();
        await expect(this.title).toHaveTextContaining('CHECKOUT: OVERVIEW');
    }

    async lastStep () {
        await this.btnFinish.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/checkout-complete.html');
        await expect(this.title).toExist();
        await expect(this.title).toHaveTextContaining('CHECKOUT: COMPLETE!');
        await this.btnBackHome.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    }
}

export default new Purchase();