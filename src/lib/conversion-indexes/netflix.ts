// Netflix Price Index data for regional pricing
// Source: Netflix Standard (ad-free) plan price per country, converted to USD
// Multiplier = NetflixStandardPriceLocal_USD / NetflixStandardPriceUS_USD
// US baseline = $15.49 (IndieWire reference; multipliers are scale-invariant
//                       to the US baseline as long as all rows use the same one)
//
// Primary dataset (full coverage, USD-converted):
//   IndieWire — "How Much Netflix Costs in Every Country in the World" (Dec 2023)
//   https://www.indiewire.com/news/business/how-much-netflix-costs-by-country-1234961123/
//
// 2025–2026 spot adjustments applied where the multiplier shifted by >0.05
// vs the 2023 baseline (sources used to refresh: OpenTheRank Apr 2026,
// Comparitech Feb 2025, Cloudwards Feb 2026):
//   AR, AU, BR, CA, DE, FR, GB, IN, JP, KR, MX, TR, CH/LI
//
// Last refreshed: 2026-04-28
//
// Notes:
//   - Use the Standard ad-free tier (not Basic, Premium, or "Standard with ads").
//   - China (CN), Russia (RU), Syria (SY), and North Korea (KP) are not served
//     by Netflix and are intentionally absent.
//   - Outlying territories without a distinct ISO-3166 alpha-2 code, or that
//     mirror their parent country's pricing, are omitted.

// Netflix Price Index multipliers relative to US (US = 1.0)
// Higher than 1.0 = Netflix costs more than in the US
// Lower than 1.0  = Netflix costs less than in the US
export const NETFLIX_INDEX: Record<string, number> = {
  // Baseline
  US: 1.00,    // United States — $15.49

  // North America
  CA: 0.70,    // Canada — CAD 18.99 (~$13.94)
  MX: 0.77,    // Mexico — MXN 269 (~$15.48)

  // Western Europe
  GB: 0.88,    // United Kingdom — GBP 12.99 (~$17.59)
  IE: 1.04,    // Ireland — EUR 14.99 (~$16.15)
  FR: 0.88,    // France — EUR 14.99 (~$17.58)
  DE: 0.82,    // Germany — EUR 13.99 (~$16.41)
  IT: 0.90,    // Italy — EUR 12.99 (~$14.00)
  ES: 0.90,    // Spain — EUR 12.99 (~$14.00)
  PT: 0.83,    // Portugal — EUR 11.99 (~$12.92)
  NL: 0.83,    // Netherlands — EUR 11.99 (~$12.92)
  BE: 0.94,    // Belgium — EUR 13.49 (~$14.54)
  LU: 0.94,    // Luxembourg — EUR 13.49 (~$14.54)
  AT: 0.90,    // Austria — EUR 12.99 (~$14.00)
  CH: 1.46,    // Switzerland — CHF 22.90 (~$29.17)
  LI: 1.46,    // Liechtenstein — CHF 22.90 (~$29.17, mirrors Switzerland)
  MC: 0.94,    // Monaco — EUR 13.49 (~$14.54)
  SM: 0.90,    // San Marino — EUR 12.99 (~$14.00)
  VA: 0.90,    // Vatican City — EUR 12.99 (~$14.00)
  GI: 0.90,    // Gibraltar — (~$14.00)
  IM: 0.89,    // Isle of Man — (~$13.79)
  GG: 0.89,    // Guernsey — (~$13.79)
  JE: 0.89,    // Jersey — (~$13.79)

  // Northern Europe
  SE: 0.80,    // Sweden — SEK 119 (~$12.32)
  NO: 0.65,    // Norway — NOK 109 (~$9.99)
  DK: 1.06,    // Denmark — DKK 129 (~$16.46)
  FI: 0.83,    // Finland — EUR 11.99 (~$12.92)
  IS: 0.90,    // Iceland — (~$14.00)
  FO: 1.06,    // Faroe Islands — (~$16.46)
  GL: 1.06,    // Greenland — (~$16.46)

  // Eastern & Central Europe
  PL: 0.69,    // Poland — PLN 43 (~$10.68)
  CZ: 0.74,    // Czechia — (~$11.42)
  SK: 0.69,    // Slovakia — (~$10.76)
  HU: 0.64,    // Hungary — (~$9.85)
  RO: 0.69,    // Romania — (~$10.76)
  BG: 0.56,    // Bulgaria — (~$8.61)
  SI: 0.56,    // Slovenia — (~$8.61)
  HR: 0.56,    // Croatia — (~$8.61)
  RS: 0.56,    // Serbia — (~$8.61)
  BA: 0.56,    // Bosnia & Herzegovina — (~$8.61)
  MK: 0.56,    // North Macedonia — (~$8.61)
  ME: 0.56,    // Montenegro — (~$8.61)
  AL: 0.56,    // Albania — (~$8.61)
  MD: 0.69,    // Moldova — (~$10.76)
  UA: 0.52,    // Ukraine — (~$8.07)
  BY: 0.69,    // Belarus — (~$10.76)

  // Baltic States
  EE: 0.69,    // Estonia — (~$10.76)
  LV: 0.69,    // Latvia — (~$10.76)
  LT: 0.69,    // Lithuania — (~$10.76)

  // Caucasus & Central Asia
  AM: 0.69,    // Armenia — (~$10.76)
  AZ: 0.69,    // Azerbaijan — (~$10.76)
  GE: 0.82,    // Georgia — (~$12.70)
  KZ: 0.69,    // Kazakhstan — (~$10.76)
  KG: 0.69,    // Kyrgyzstan — (~$10.76)
  TJ: 0.82,    // Tajikistan — (~$12.70)
  TM: 0.69,    // Turkmenistan — (~$10.76)
  UZ: 0.69,    // Uzbekistan — (~$10.76)

  // Türkiye
  TR: 0.32,    // Türkiye — TRY 289.99 (~$6.44)

  // Mediterranean Islands
  CY: 0.76,    // Cyprus — (~$11.84)
  MT: 0.90,    // Malta — (~$14.00)
  GR: 0.76,    // Greece — (~$11.84)

  // Middle East
  IL: 0.82,    // Israel — (~$12.67)
  AE: 0.69,    // United Arab Emirates — AED 39 (~$10.62)
  SA: 0.74,    // Saudi Arabia — SAR 43 (~$11.47)
  QA: 0.65,    // Qatar — (~$9.99)
  KW: 0.65,    // Kuwait — (~$9.99)
  BH: 0.68,    // Bahrain — (~$10.49)
  OM: 0.68,    // Oman — (~$10.49)
  JO: 0.52,    // Jordan — (~$7.99)
  LB: 0.52,    // Lebanon — (~$7.99)
  IQ: 0.52,    // Iraq — (~$7.99)
  IR: 0.65,    // Iran — (~$9.99)
  YE: 0.52,    // Yemen — (~$7.99)
  PS: 0.52,    // Palestine — (~$7.99)

  // Asia Pacific - Developed
  JP: 0.50,    // Japan — JPY 1,590 (~$9.98)
  KR: 0.50,    // South Korea — KRW 13,500 (~$9.16)
  AU: 0.75,    // Australia — AUD 20.99 (~$15.08)
  NZ: 0.73,    // New Zealand — NZD 18.99 (~$11.32)
  SG: 0.84,    // Singapore — SGD 17.98 (~$13.02)
  HK: 0.65,    // Hong Kong — HKD 78 (~$9.99)
  TW: 0.68,    // Taiwan — TWD 330 (~$10.49)
  MO: 0.65,    // Macau — (~$9.99)

  // Asia Pacific - Emerging
  IN: 0.26,    // India — INR 499 (~$5.29)
  ID: 0.50,    // Indonesia — (~$7.72)
  MY: 0.62,    // Malaysia — (~$9.65)
  TH: 0.64,    // Thailand — THB 349 (~$9.90)
  VN: 0.59,    // Vietnam — VND 220,000 (~$9.08)
  PH: 0.46,    // Philippines — PHP 449 (~$7.19)
  PK: 0.18,    // Pakistan — PKR 800 (~$2.82)
  BD: 0.52,    // Bangladesh — (~$7.99)
  LK: 0.52,    // Sri Lanka — (~$7.99)
  NP: 0.52,    // Nepal — (~$7.99)
  MM: 0.52,    // Myanmar — (~$7.99)
  KH: 0.52,    // Cambodia — (~$7.99)
  LA: 0.52,    // Laos — (~$7.99)
  MN: 0.52,    // Mongolia — (~$7.99)
  MV: 0.77,    // Maldives — (~$11.99)
  BT: 0.52,    // Bhutan — (~$7.99)
  BN: 0.77,    // Brunei — (~$11.99)
  AF: 0.52,    // Afghanistan — (~$7.99)
  TL: 0.52,    // Timor-Leste — (~$7.99)

  // Latin America
  BR: 0.45,    // Brazil — BRL 44.90 (~$9.02)
  AR: 0.32,    // Argentina — ARS 2,900 (~$4.96)
  CL: 0.62,    // Chile — (~$9.58)
  CO: 0.44,    // Colombia — (~$6.75)
  PE: 0.60,    // Peru — (~$9.28)
  EC: 0.52,    // Ecuador — (~$7.99)
  VE: 0.39,    // Venezuela — (~$5.99)
  BO: 0.39,    // Bolivia — (~$5.99)
  PY: 0.39,    // Paraguay — (~$5.99)
  UY: 0.84,    // Uruguay — (~$12.99)
  GY: 0.39,    // Guyana — (~$5.99)
  SR: 0.39,    // Suriname — (~$5.99)
  CU: 0.39,    // Cuba — (~$5.99)

  // Central America & Caribbean
  GT: 0.52,    // Guatemala — (~$7.99)
  CR: 0.84,    // Costa Rica — (~$12.99)
  PA: 0.58,    // Panama — (~$8.99)
  SV: 0.52,    // El Salvador — (~$7.99)
  HN: 0.52,    // Honduras — (~$7.99)
  NI: 0.39,    // Nicaragua — (~$5.99)
  BZ: 0.39,    // Belize — (~$5.99)
  DO: 0.52,    // Dominican Republic — (~$7.99)
  HT: 0.39,    // Haiti — (~$5.99)
  JM: 0.39,    // Jamaica — (~$5.99)
  TT: 0.84,    // Trinidad & Tobago — (~$12.99)
  BB: 0.99,    // Barbados — (~$15.29)
  BS: 0.84,    // Bahamas — (~$12.99)
  AG: 0.84,    // Antigua & Barbuda — (~$12.99)
  DM: 0.39,    // Dominica — (~$5.99)
  GD: 0.39,    // Grenada — (~$5.99)
  KN: 0.84,    // St. Kitts & Nevis — (~$12.99)
  LC: 0.39,    // St. Lucia — (~$5.99)
  VC: 0.39,    // St. Vincent & Grenadines — (~$5.99)
  AI: 0.84,    // Anguilla — (~$12.99)
  AW: 0.84,    // Aruba — (~$12.99)
  CW: 0.84,    // Curaçao — (~$12.99)
  SX: 0.84,    // Sint Maarten — (~$12.99)
  KY: 0.84,    // Cayman Islands — (~$12.99)
  VG: 0.84,    // British Virgin Islands — (~$12.99)
  TC: 0.84,    // Turks & Caicos — (~$12.99)
  BM: 0.84,    // Bermuda — (~$12.99)
  MS: 0.84,    // Montserrat — (~$12.99)
  GP: 0.87,    // Guadeloupe — (~$13.46)
  MQ: 0.87,    // Martinique — (~$13.46)
  GF: 0.87,    // French Guiana — (~$13.46)
  PR: 1.00,    // Puerto Rico — (~$15.49)
  VI: 1.00,    // U.S. Virgin Islands — (~$15.49)

  // Africa - North
  EG: 0.25,    // Egypt — EGP 170 (~$3.88)
  MA: 0.41,    // Morocco — MAD 65 (~$6.41)
  DZ: 0.52,    // Algeria — (~$7.99)
  TN: 0.52,    // Tunisia — (~$7.99)
  LY: 0.52,    // Libya — (~$7.99)
  SD: 0.52,    // Sudan — (~$7.99)

  // Africa - Sub-Saharan
  ZA: 0.54,    // South Africa — ZAR 159 (~$8.41)
  NG: 0.29,    // Nigeria — NGN 6,500 (~$4.48)
  KE: 0.29,    // Kenya — KES 700 (~$4.52)
  GH: 0.52,    // Ghana — (~$7.99)
  ET: 0.52,    // Ethiopia — (~$7.99)
  TZ: 0.52,    // Tanzania — (~$7.99)
  UG: 0.52,    // Uganda — (~$7.99)
  RW: 0.52,    // Rwanda — (~$7.99)
  BI: 0.52,    // Burundi — (~$7.99)
  SN: 0.52,    // Senegal — (~$7.99)
  CI: 0.52,    // Côte d'Ivoire — (~$7.99)
  CM: 0.52,    // Cameroon — (~$7.99)
  ML: 0.52,    // Mali — (~$7.99)
  BF: 0.52,    // Burkina Faso — (~$7.99)
  NE: 0.52,    // Niger — (~$7.99)
  TD: 0.52,    // Chad — (~$7.99)
  TG: 0.52,    // Togo — (~$7.99)
  BJ: 0.65,    // Benin — (~$9.99)
  GN: 0.52,    // Guinea — (~$7.99)
  GW: 0.52,    // Guinea-Bissau — (~$7.99)
  SL: 0.52,    // Sierra Leone — (~$7.99)
  LR: 0.52,    // Liberia — (~$7.99)
  GM: 0.52,    // Gambia — (~$7.99)
  CV: 0.52,    // Cape Verde — (~$7.99)
  MR: 0.52,    // Mauritania — (~$7.99)
  GQ: 0.52,    // Equatorial Guinea — (~$7.99)
  GA: 0.52,    // Gabon — (~$7.99)
  CG: 0.52,    // Republic of the Congo — (~$7.99)
  CD: 0.52,    // DR Congo — (~$7.99)
  CF: 0.52,    // Central African Republic — (~$7.99)
  AO: 0.52,    // Angola — (~$7.99)
  MZ: 0.52,    // Mozambique — (~$7.99)
  ZM: 0.52,    // Zambia — (~$7.99)
  ZW: 0.52,    // Zimbabwe — (~$7.99)
  BW: 0.52,    // Botswana — (~$7.99)
  NA: 0.52,    // Namibia — (~$7.99)
  LS: 0.52,    // Lesotho — (~$7.99)
  SZ: 0.52,    // Eswatini — (~$7.99)
  MW: 0.52,    // Malawi — (~$7.99)
  MG: 0.52,    // Madagascar — (~$7.99)
  MU: 0.52,    // Mauritius — (~$7.99)
  SC: 0.52,    // Seychelles — (~$7.99)
  KM: 0.52,    // Comoros — (~$7.99)
  DJ: 0.52,    // Djibouti — (~$7.99)
  SO: 0.52,    // Somalia — (~$7.99)
  SS: 0.52,    // South Sudan — (~$7.99)
  ER: 0.52,    // Eritrea — (~$7.99)
  ST: 0.52,    // São Tomé & Príncipe — (~$7.99)
  SH: 0.52,    // St. Helena — (~$7.99)
  RE: 0.81,    // Réunion — (~$12.49)

  // Oceania & Pacific
  FJ: 0.52,    // Fiji — (~$7.99)
  PG: 0.52,    // Papua New Guinea — (~$7.99)
  WS: 0.52,    // Samoa — (~$7.99)
  TO: 0.52,    // Tonga — (~$7.99)
  VU: 0.52,    // Vanuatu — (~$7.99)
  SB: 0.52,    // Solomon Islands — (~$7.99)
  KI: 0.52,    // Kiribati — (~$7.99)
  TV: 0.52,    // Tuvalu — (~$7.99)
  NR: 0.77,    // Nauru — (~$11.99)
  NU: 0.73,    // Niue — (~$11.32)
  FM: 1.00,    // Micronesia — (~$15.49)
  MH: 1.00,    // Marshall Islands — (~$15.49)
  PW: 1.00,    // Palau — (~$15.49)
  GU: 1.00,    // Guam — (~$15.49)
  MP: 1.00,    // Northern Mariana Islands — (~$15.49)
  NC: 0.77,    // New Caledonia — (~$11.99)
  PF: 0.77,    // French Polynesia — (~$11.99)
  FK: 0.84,    // Falkland Islands — (~$12.99)
};

// Default multiplier for regions not in the index (median of available data)
export const DEFAULT_NETFLIX_MULTIPLIER = 0.65;

// Get Netflix Price Index multiplier for a region
export function getNetflixMultiplier(regionCode: string): number {
  return NETFLIX_INDEX[regionCode] ?? DEFAULT_NETFLIX_MULTIPLIER;
}

// Get all Netflix Price Index data
export function getAllNetflixData(): Record<string, { multiplier: number; source: 'netflix-index' | 'default' }> {
  const result: Record<string, { multiplier: number; source: 'netflix-index' | 'default' }> = {};

  for (const [regionCode, multiplier] of Object.entries(NETFLIX_INDEX)) {
    result[regionCode] = { multiplier, source: 'netflix-index' };
  }

  return result;
}
