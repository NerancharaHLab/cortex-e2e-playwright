/**
 * Identity Data Generator Utility Module
 * Provides independent functions for generating randomized identification numbers for testing.
 */

/**
 * Generates a random 13-digit Thai Citizen ID number with valid checksum calculation.
 * @returns {string} 13-digit Thai Citizen ID
 */
function generateThaiCitizenID() {
  const digits = [];

  // First digit ranges from 1 to 8 for general personal registration
  digits.push(Math.floor(Math.random() * 8) + 1);

  // Digits 2 through 12
  for (let i = 1; i < 12; i++) {
    digits.push(Math.floor(Math.random() * 10));
  }

  // Calculate 13th digit (checksum using modulo 11 algorithm)
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * (13 - i);
  }

  const checksum = (11 - (sum % 11)) % 10;
  digits.push(checksum);

  return digits.join('');
}

/**
 * Generates a random Thai Passport number.
 * Format: 2 uppercase English letters followed by 7 numeric digits (e.g. AA1234567).
 * @returns {string} Thai Passport number
 */
function generateThaiPassport() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const firstLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  const secondLetter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  const randomNumber = Math.floor(1000000 + Math.random() * 9000000).toString();

  return `${firstLetter}${secondLetter}${randomNumber}`;
}

/**
 * Generates a random USA Passport number.
 * Format: 9 numeric digits.
 * @returns {string} USA Passport number
 */
function generateUSAPassport() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

/**
 * Generates a random UK Passport number.
 * Format: 9 numeric digits.
 * @returns {string} UK Passport number
 */
function generateUKPassport() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

module.exports = {
  generateThaiCitizenID,
  generateThaiPassport,
  generateUSAPassport,
  generateUKPassport,
};
