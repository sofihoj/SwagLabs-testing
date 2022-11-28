import Info from '../pageobjects/pageInfo.page'
import LoginPage from  '../pageobjects/login.page';

describe('App info', () => {
    beforeAll('Navigate to url', () => {
        browser.url("https://www.saucedemo.com/")
        browser.setWindowSize(1920, 1080);
    });

    it('Should login with valid credentials', async () => {
        await LoginPage.sucessLogin('standard_user', 'secret_sauce');
        await expect(LoginPage.appLogo).toBeDisplayed()
    });

    it('Should open About page', async () => {
        await expect(LoginPage.menuIcon).toBeDisplayed();
        await LoginPage.menuIcon.waitForClickable();
        await LoginPage.menuIcon.click();
        await Info.aboutBtn.waitForClickable();
        await Info.aboutBtn.click();
        await expect(browser).toHaveUrl("https://saucelabs.com/")
        await browser.back()
    });

    it('Should open Twitter official page', async () => {
        await Info.twitterIcon.click();
        await browser.switchWindow('https://twitter.com/saucelabs')
        await expect(browser).toHaveUrl('https://twitter.com/saucelabs')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')
    })

    it('Should open Facebook official page', async () => {
        await Info.facebookIcon.click();
        await browser.switchWindow('https://www.facebook.com/saucelabs')
        await expect(browser).toHaveUrl('https://www.facebook.com/saucelabs')
        await browser.switchWindow('https://www.saucedemo.com/inventory.html')
    })

    // it('Should open Linkedin official page', async () => {
    //     await Info.linkedinIcon.click();
    //     await browser.switchWindow('https://www.linkedin.com/company/sauce-labs/')
    //     await expect(browser).toHaveUrl('https://www.linkedin.com/company/sauce-labs/')
    //     await browser.switchWindow('https://www.saucedemo.com/inventory.html')
    // })

    it('Should logout', async () => {
        await LoginPage.logout();
    });
})