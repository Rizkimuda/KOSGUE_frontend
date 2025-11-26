/**
 * Format number to Rupiah currency format
 * @param {number|string} price - The price to format
 * @returns {string} Formatted price string (e.g., "Rp1.350.000 / bulan")
 */
export function formatPrice(price) {
  // If already formatted, return as is
  if (typeof price === "string" && price.includes("Rp")) {
    return price;
  }

  // Convert to number
  const numPrice = typeof price === "string" ? parseFloat(price.replace(/\D/g, "")) : price;

  if (isNaN(numPrice) || numPrice === 0) {
    return "Rp0 / bulan";
  }

  // Format with thousand separators
  const formatted = numPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `Rp${formatted} / bulan`;
}

/**
 * Parse price string to number
 * @param {string} priceString - The price string (e.g., "Rp1.350.000 / bulan")
 * @returns {number} The numeric value
 */
export function parsePrice(priceString) {
  if (!priceString) return 0;
  const match = priceString.match(/Rp([\d.]+)/);
  if (!match) return 0;
  return Number(match[1].replace(/\./g, ""));
}

