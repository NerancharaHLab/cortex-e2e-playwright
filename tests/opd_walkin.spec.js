import { test } from '@playwright/test';
import { API } from '../fixtures/api.js';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openWebsite(dataPath.url);
});

test.describe("OPD Walk In", () => {
    test('New Patient Registration and Create New Visit', async ( {page} ) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login(dataPath.loginPage.emailSpaceManager, dataPath.loginPage.password);
    });
    
    test('Existing Patient Create New Visit', async ( {page} ) => {
        const loginPage = new LoginPage(page);
        await loginPage.Login(dataPath.loginPage.emailSpaceManager, dataPath.loginPage.password);
    });
});



