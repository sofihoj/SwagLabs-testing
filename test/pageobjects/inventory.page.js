class Inventory {
    get addBackpack () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    get addBikeLight () {
        return $('#add-to-cart-sauce-labs-bike-light');
    }

    get addShirt () {
        return $('#add-to-cart-sauce-labs-bolt-t-shirt');
    }

    get addJacket () {
        return $('#add-to-cart-sauce-labs-fleece-jacket');
    }

    get addOnesie () {
        return $('#add-to-cart-sauce-labs-onesie');
    }

    get addTshirt () {
        return $('//*[@id="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    }

    get removeBackpack () {
        return $('#remove-sauce-labs-backpack');
    }

    get removeBikeLight () {
        return $('#remove-sauce-labs-bike-light');
    }

    get removeShirt () {
        return $('#remove-sauce-labs-bolt-t-shirt');
    }

    get removeJacket () {
        return $('#remove-sauce-labs-fleece-jacket');
    }

    get removeOnesie () {
        return $('#remove-sauce-labs-onesie');
    }

    get removeTshirt () {
        return $('//*[@id="remove-test.allthethings()-t-shirt-(red)"]');
    }

    async addProduct () {
        await this.addBackpack.click();
        const cartItems = await $('#shopping_cart_container > a > span').getText();
        await expect(cartItems).toBe('1');
    }
}

export default new Inventory();