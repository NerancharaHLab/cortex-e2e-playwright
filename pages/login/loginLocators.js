/**
 * Login Page Locators Dictionary
 * Contains pure selector strings categorized by element type.
 */
export const loginLocators = {
  button: {
    welcome: 'button._welcome-button_5afkc_26',
    signIn: '#kc-login',
    userMenu: 'button._user-menu-button_1dtsj_1',
  },
  input: {
    username: '#username',
    password: '#password',
  },
  message: {
    error: '#input-error-username .kc-feedback-text',
  },
  path: {
    keycloakHost: 'id-cortex-nuh-new.cortexcloud.co',
    welcome: '/cortex/welcome',
    apps: '/cortex/apps',
  },
};
