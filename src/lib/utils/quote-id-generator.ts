/**
 * Quote ID Generator
 * Generates unique identifiers for quote requests
 * Format: Q-YYYYMMDD-XXXX
 * Example: Q-20241113-A7F2
 */

/**
 * Generates a random alphanumeric string
 * @param length - Length of the string to generate
 * @returns Random alphanumeric string (uppercase)
 */
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  
  return result;
}

/**
 * Formats a date to YYYYMMDD
 * @param date - Date to format
 * @returns Date string in YYYYMMDD format
 */
function formatDateForId(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}${month}${day}`;
}

/**
 * Generates a unique Quote ID
 * @returns Unique quote identifier in format Q-YYYYMMDD-XXXX
 * 
 * @example
 * ```ts
 * const quoteId = generateQuoteId();
 * // Returns: "Q-20241113-A7F2"
 * ```
 */
export function generateQuoteId(): string {
  const now = new Date();
  const datePart = formatDateForId(now);
  const randomPart = generateRandomString(4);
  
  return `Q-${datePart}-${randomPart}`;
}

/**
 * Validates if a string matches the Quote ID format
 * @param id - String to validate
 * @returns True if valid Quote ID format
 * 
 * @example
 * ```ts
 * isValidQuoteId('Q-20241113-A7F2'); // true
 * isValidQuoteId('invalid-id'); // false
 * ```
 */
export function isValidQuoteId(id: string): boolean {
  const quoteIdPattern = /^Q-\d{8}-[A-Z0-9]{4}$/;
  return quoteIdPattern.test(id);
}

/**
 * Extracts the date from a Quote ID
 * @param quoteId - Quote ID to parse
 * @returns Date object or null if invalid
 * 
 * @example
 * ```ts
 * const date = getDateFromQuoteId('Q-20241113-A7F2');
 * // Returns: Date object for November 13, 2024
 * ```
 */
export function getDateFromQuoteId(quoteId: string): Date | null {
  if (!isValidQuoteId(quoteId)) {
    return null;
  }
  
  const datePart = quoteId.split('-')[1]; // Get YYYYMMDD
  const year = parseInt(datePart.substring(0, 4));
  const month = parseInt(datePart.substring(4, 6)) - 1; // JS months are 0-indexed
  const day = parseInt(datePart.substring(6, 8));
  
  return new Date(year, month, day);
}
