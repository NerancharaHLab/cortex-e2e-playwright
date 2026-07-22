const { expect } = require('@playwright/test');
const { loginLocators } = require('./loginLocators.js');

/**
 * Shared Base Login Page Object Model
 * Uses categorized nested locator properties powered by pages/login/loginLocators.js.
 */
export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   * @param {Object} [customSelectors]
   */
  constructor(page, customSelectors = {}) {
    this.page = page;

    // Merge nested selectors
    const selectors = {
      button: { ...loginLocators.button, ...(customSelectors.button || {}) },
      input: { ...loginLocators.input, ...(customSelectors.input || {}) },
      message: { ...loginLocators.message, ...(customSelectors.message || {}) },
      path: { ...loginLocators.path, ...(customSelectors.path || {}) },
    };

    this.selectors = selectors;

    // --- Categorized Locator Objects ---
    this.button = {
      welcome: page.locator(selectors.button.welcome),
      signIn: page.locator(selectors.button.signIn),
      userMenu: page.locator(selectors.button.userMenu),
    };

    this.input = {
      username: page.locator(selectors.input.username),
      password: page.locator(selectors.input.password),
    };

    this.message = {
      error: page.locator(selectors.message.error),
    };

    this.path = selectors.path;
  }

  /**
   * Gets current base URL from environment or Playwright config
   * @returns {string}
   */
  getBaseUrl() {
    return process.env.BASE_URL || process.env.NUH_URL || '';
  }

  /**
   * Opens the Welcome page
   * @param {string} [path]
   */
  async openWelcomePage(path = this.path.welcome) {
    const targetUrl = path.startsWith('http') ? path : `${this.getBaseUrl()}${path}`;
    await this.page.goto(targetUrl);
  }

  /**
   * Clicks the Welcome Login button to redirect to Keycloak SSO
   */
  async clickWelcomeLogin() {
    await this.button.welcome.click();
    await this.page.waitForURL(new RegExp(`${this.path.keycloakHost}.*auth`));
  }

  /**
   * Fills credentials and submits Keycloak login form
   * @param {string} username
   * @param {string} password
   */
  async login(username, password) {
    await this.input.username.fill(username);
    await this.input.password.fill(password);
    await this.button.signIn.click();
  }

  /**
   * Performs full login flow from Welcome page to Apps dashboard
   * @param {string} username
   * @param {string} password
   * @param {string} [welcomePath]
   */
  async performFullLogin(username, password, welcomePath) {
    await this.openWelcomePage(welcomePath);
    await this.clickWelcomeLogin();
    await this.login(username, password);
  }

  // --- Shared Assertion Methods ---

  /**
   * Asserts that the Welcome page login button is visible
   */
  async assertWelcomePageVisible() {
    await expect(this.button.welcome).toBeVisible();
  }

  /**
   * Asserts that no login error message exists
   */
  async assertNoLoginError() {
    await expect(this.message.error).toHaveCount(0);
  }

  /**
   * Asserts that login error message is visible and contains expected text
   * @param {string} [expectedText]
   */
  async assertLoginError(expectedText = 'Invalid username or password.') {
    await expect(this.message.error).toBeVisible();
    await expect(this.message.error).toContainText(expectedText);
  }

  /**
   * Asserts that the browser redirected to Apps page
   * @param {string} [appsPath]
   */
  async assertAppsPageLoaded(appsPath = this.path.apps) {
    const expectedAppsPathRegex = new RegExp(appsPath);
    await this.page.waitForURL(expectedAppsPathRegex, { timeout: 15000 });
    await expect(this.page).toHaveURL(expectedAppsPathRegex);
  }

  /**
   * Asserts that the welcome text heading is visible
   * @param {string} [text]
   */
  async assertWelcomeTextVisible(text = 'ยินดีต้อนรับสู่ Cortex') {
    await expect(this.page.getByText(text)).toBeVisible();
  }

  /**
   * Asserts that the user menu displays the expected username
   * @param {string} expectedUsername
   */
  async assertUserMenuHasUsername(expectedUsername) {
    await expect(this.button.userMenu).toContainText(expectedUsername);
  }

  /**
   * Asserts that active session cookies exist in browser context
   */
  async assertActiveSessionCookies() {
    const cookies = await this.page.context().cookies();
    expect(cookies.length).toBeGreaterThan(0);
  }

  /**
   * Composite assertion method for verifying successful login
   * @param {string} expectedUsername
   */
  async assertLoginSuccess(expectedUsername) {
    await this.assertAppsPageLoaded();
    await this.assertNoLoginError();
    await this.assertWelcomeTextVisible();
    await this.assertUserMenuHasUsername(expectedUsername);
    await this.assertActiveSessionCookies();
  }
}
