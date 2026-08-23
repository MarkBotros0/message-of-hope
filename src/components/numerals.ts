const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩'

/** Arabic-Indic digits, to match the numerals used across the site. */
export function toArabicNumeral(value: number): string {
  return String(value).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)])
}
