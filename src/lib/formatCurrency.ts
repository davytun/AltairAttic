/**
 * Format a number as currency with comma separators
 * @param amount - The amount to format
 * @param currency - The currency symbol (default: ₦)
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currency: string = '₦'): string => {
  return `${currency}${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

/**
 * Format a number with comma separators (no decimals)
 * @param amount - The amount to format
 * @param currency - The currency symbol (default: ₦)
 * @returns Formatted currency string without decimals
 */
export const formatCurrencyWhole = (amount: number, currency: string = '₦'): string => {
  return `${currency}${Math.round(amount).toLocaleString('en-NG')}`;
};
