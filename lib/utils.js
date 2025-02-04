import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function sentenceCase(str) {
  if (!str) {
    return '';
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
    return '';
  }
  const lowerCaseString = inputString.toLowerCase();
  return lowerCaseString.charAt(0).toUpperCase() + lowerCaseString.slice(1);
}

export function capitalizeAllLetters(str) {
  if (!str) {
    return '';
  }
  return str.toUpperCase();
}

export function extractQuestion(jsonString) {
  try {
    // Parse the JSON string
    const data = JSON.parse(jsonString);

    // Navigate to the question text
    const root = data.root;
    const paragraph = root.children?.[0];
    const textNode = paragraph.children?.[0];

    // Extract and return the text if it exists
    return textNode?.text || 'No question found';
  } catch (error) {
    // Handle parsing errors
    console.error('Invalid JSON string:', error);
    return 'Error extracting question';
  }
}
