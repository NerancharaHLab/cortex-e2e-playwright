import { LoginPage } from '../pages/login/LoginPage.js';

export async function commonLogin(page, email, password, baseUrl) {
  const loginPage = new LoginPage(page);
  await loginPage.openWebsite(baseUrl);
  await loginPage.login(email, password);
  return loginPage;
}

export async function commonLogout(page) {
  await page.click('button[aria-label="user menu"]');
  await page.click('text=Logout');
  await page.waitForNavigation();
}
