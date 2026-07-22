const { test, expect } = require('@playwright/test');
const {
  generateThaiCitizenID,
  generateThaiPassport,
  generateUSAPassport,
  generateUKPassport,
} = require('../../utils/identityGenerator.js');

/**
 * Helper function to validate Thai Citizen ID checksum (Modulo 11)
 * @param {string} cid
 * @returns {boolean}
 */
function isThaiCitizenIDValid(cid) {
  if (typeof cid !== 'string' || cid.length !== 13) return false;
  const digits = cid.split('').map(Number);
  if (digits.some(isNaN)) return false;

  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (13 - i);
  }
  const expectedChecksum = (11 - (sum % 11)) % 10;
  return digits[12] === expectedChecksum;
}

test.describe('Unit Tests: Identity Generator Utility Module', () => {

  test.describe('generateThaiCitizenID', () => {
    test('should return a string of length 13', () => {
      const cid = generateThaiCitizenID();
      expect(typeof cid).toBe('string');
      expect(cid).toHaveLength(13);
    });

    test('should contain only numeric digits', () => {
      const cid = generateThaiCitizenID();
      expect(cid).toMatch(/^\d{13}$/);
    });

    test('should start with a valid first digit between 1 and 8', () => {
      for (let i = 0; i < 20; i++) {
        const cid = generateThaiCitizenID();
        const firstDigit = parseInt(cid.charAt(0), 10);
        expect(firstDigit).toBeGreaterThanOrEqual(1);
        expect(firstDigit).toBeLessThanOrEqual(8);
      }
    });

    test('should pass Thai Citizen ID modulo 11 checksum calculation', () => {
      for (let i = 0; i < 50; i++) {
        const cid = generateThaiCitizenID();
        expect(isThaiCitizenIDValid(cid)).toBe(true);
      }
    });

    test('should generate unique values across multiple calls', () => {
      const set = new Set();
      const count = 100;
      for (let i = 0; i < count; i++) {
        set.add(generateThaiCitizenID());
      }
      expect(set.size).toBe(count);
    });
  });

  test.describe('generateThaiPassport', () => {
    test('should return a string of length 9', () => {
      const passport = generateThaiPassport();
      expect(typeof passport).toBe('string');
      expect(passport).toHaveLength(9);
    });

    test('should match Thai Passport format (2 uppercase letters + 7 numbers)', () => {
      for (let i = 0; i < 20; i++) {
        const passport = generateThaiPassport();
        expect(passport).toMatch(/^[A-Z]{2}\d{7}$/);
      }
    });
  });

  test.describe('generateUSAPassport', () => {
    test('should return a string of length 9', () => {
      const passport = generateUSAPassport();
      expect(typeof passport).toBe('string');
      expect(passport).toHaveLength(9);
    });

    test('should contain only 9 numeric digits', () => {
      for (let i = 0; i < 20; i++) {
        const passport = generateUSAPassport();
        expect(passport).toMatch(/^\d{9}$/);
      }
    });
  });

  test.describe('generateUKPassport', () => {
    test('should return a string of length 9', () => {
      const passport = generateUKPassport();
      expect(typeof passport).toBe('string');
      expect(passport).toHaveLength(9);
    });

    test('should contain only 9 numeric digits', () => {
      for (let i = 0; i < 20; i++) {
        const passport = generateUKPassport();
        expect(passport).toMatch(/^\d{9}$/);
      }
    });
  });

});
