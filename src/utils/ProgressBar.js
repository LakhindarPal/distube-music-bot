/**
 * Generates a progress bar string based on the total and current values.
 *
 * @param {Object} params - The parameters for the progress bar.
 * @param {number} params.total - The total value representing 100%.
 * @param {number} params.current - The current value to be represented within the total.
 * @returns {string} A string representing the progress bar.
 * @throws {Error} Throws an error if the total value is not a positive finite number or if the current value is not a non-negative finite number.
 */
export default function ProgressBar({ total, current }) {
  if (!Number.isFinite(total) || total <= 0)
    throw new Error("Total value is invalid");
  if (!Number.isFinite(current) || current < 0)
    throw new Error("Current value is invalid");

  const size = 20;
  const line = "▬";
  const slider = "🔘";
  const percentage = Math.min(current / total, 1);
  const progress = Math.round(size * percentage);
  const emptyProgress = size - progress;

  const bar =
    line.repeat(progress).replace(/.$/, slider) + line.repeat(emptyProgress);

  return bar;
}
