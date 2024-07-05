/**
 * Formats a number into a locale-specific string representation.
 * @param {number} number The number to format.
 * @returns {string} The formatted number string.
 */
export function formatNumber(number) {
  return number.toLocaleString("en-IN", { style: "decimal" });
}

/**
 * Converts a time string in "hh:mm:ss", "mm:ss", or "ss" format to seconds.
 * @param {string} time - The time string to convert.
 * @returns {number} - The equivalent time in seconds, or 0 if input is invalid.
 */
export function timeToSecond(time = "0") {
  if (typeof time !== "string" || !/^\d{1,2}(:\d{1,2}){0,2}$/.test(time)) {
    return 0;
  }

  const parts = time.split(":").map(Number).reverse();
  const [seconds = 0, minutes = 0, hours = 0] = parts;

  return hours * 3600 + minutes * 60 + seconds;
}
