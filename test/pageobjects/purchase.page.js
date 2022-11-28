class Purchase {
    get shoppingCart () {
        return $('.shopping_cart_link');
    }

    get cartItems () {
        return $('#shopping_cart_container > a > span');
    }

    get btnCheckout () {
        return $('#checkout');
    }

    get btnContinueShopping () {
        return $('#continue-shopping');
    }

    get btnCancel () {
        return $('#cancel')
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

    get ponyImg () {
        return $('.pony_express')
    }

    get title () {
        return $('.title')
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
        await expect(this.ponyImg).toBeDisplayed();
        const imgSource = await this.ponyImg.getAttribute('src');
        await expect(imgSource).toBe('/static/media/pony-express.46394a5d.png');
        await this.btnBackHome.click();
        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
    }
}

export default new Purchase();