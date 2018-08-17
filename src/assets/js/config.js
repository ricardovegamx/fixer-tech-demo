/**
 * This file contains all constants and variables required to run the application.
 * They need to be imported first before usage.
 * Example:
 * import {apiKey, baseUrl } from './assets/js/config.js'
 */

/**
 * Get your own API key at https://fixer.io/
 */
export const apiKey = "6cf523520a968d30d99500a2774c5a17";

/**
 * Define the base url for API calls
 */
export const baseUrl = "http://data.fixer.io/api/";


/**
 * Define the base currency that will be used as reference to convert the sampleCurrencies below.
 */
export const baseCurrency = "MXN";


/**
 * Fixer.io API Constraints.
 * Min
 */
export const FixerApiConstraints = {
  minDate: "1999-01-01",
  maxDate: "today"
};

/**
 * Define an array of currencies that should be displayed in the chart.
 * For a technical demo purposes, the number was limited to the most important
 * ones according to:
 * https://www.rankred.com/highest-currencies-in-the-world/
 */
export var sampleCurrencies = [
  "NZD",
  "LYD",
  "SGD",
  "CAD",
  "AUD",
  "USD",
  "CHF",
  "EUR",
  "KYD",
  "GBP",
  "JOD",
  "OMR",
  "BHD",
  "KWD",
  "MXN"
];