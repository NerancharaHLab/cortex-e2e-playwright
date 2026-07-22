import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openWebsite(dataPath.url);
});

test.describe("OPD Walk In", () => {
    test('Login success', async ( {page} ) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login(dataPath.loginPage.emailSpaceManager, dataPath.loginPage.password);
    });
    
    test('Login wrong credentials', async ( {page} ) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login(dataPath.loginPage.emailSpaceManager, dataPath.loginPage.wrongPassword);
    });
});



