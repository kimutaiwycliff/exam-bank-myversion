import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function sentenceCase(str) {
  if (!str) {
    return "";
  }
  return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
}
export function capitalizeFirstLetter(inputString) {
  /**
   * Converts the input string to lowercase and capitalizes the first letter.
   *
   * @param {string} inputString - The string to transform.
   * @returns {string} - The transformed string.
   */
  if (!inputString) {
      return "";
  }
  const lowerCaseString = inputString.toLowerCase();
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
}
