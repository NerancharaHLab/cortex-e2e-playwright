/**
 * Reception Module Locators Dictionary
 * Contains pure selector strings for Patient Registration form, Search, and entry points.
 */
export const receptionLocators = {
  iframe: 'iframe[src*="create-patient"]',
  heading: '[data-testid="patient-container-title"]',
  entry: {
    radixButtonSpan: '#radix-theme > div.rt-Box.rt-r-w-100\\% > div.rt-Box._container_19nl4_1 > div.rt-Flex._content-wrapper_19nl4_6.rt-r-display-flex.rt-r-jc-start.rt-r-position-relative > div.rt-Box._layout-content-root_19nl4_12.rt-r-w-100\\% > div > div._tabs-root_1ad9o_8 > div._tabs-list_1ad9o_15 > div > div.rt-Box.rt-r-mr-2 > div > button > span',
    buttonLabelSpan: 'span.button-label-overflow',
  },
  headerSearch: {
    input: 'input[aria-label="ค้นหาผู้ป่วย"], input[placeholder*="ค้นหาผู้ป่วย"], [role="combobox"][aria-label*="ค้นหา"]',
    optionItem: 'div[role="option"], ul.search-results > li',
  },
  patientProfile: {
    hnText: '[data-testid="patient-hn"], [data-testid="hn"], span:has-text("HN"), h2, h3',
    nameHeader: '[data-testid="patient-name-header"]',
  },
  button: {
    submit: '[data-testid="submit-button"]',
    cancel: '[data-testid="cancel-button"]',
  },
  input: {
    citizenId: '[data-testid="identifyVerification.identify"]',
    firstName: '[data-testid="firstName"]',
    middleName: '[data-testid="middleName"]',
    familyName: '[data-testid="familyName"]',
    birthDate: '[data-testid="birthDate"]',
    age: '[data-testid="age"]',
  },
  select: {
    gender: 'select[name="gender"]',
    verificationMode: 'select[name="identifyVerification.verificationMode"]',
    primaryLanguage: 'select[name="primaryLanguage"]',
  },
  searchbox: {
    triggerPrefix: '[data-testid="searchbox-trigger-prefixName-searchbox"]',
    triggerByName: (fieldName) => `[data-testid="searchbox-trigger-${fieldName}-searchbox"]`,
    searchInput: 'input[cmdk-input]',
    optionItem: 'div[role="option"]',
  },
  path: {
    createPatient: '/cortex/reception/create-patient',
    patientInfoPattern: /\/cortex\/next\/patients\/\d+/,
  },
};
