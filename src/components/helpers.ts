/* eslint-disable import/prefer-default-export */

/**
 * Extracts the first character of each word in a sentence and returns them as a single string, all uppercase.
 *
 * @param {string | null} sentence - The sentence from which to extract the first characters.
 * @return {string} - The extracted first characters as a single string, all uppercase. If the sentence is null or empty, an empty string is returned.
 */
export const extractFirstCharacter = (sentence: string | null): string => {
	if (!sentence?.length) {
		return "";
	}

	return sentence
		.split(" ")
		.map((word) => word[0])
		.join("")
		.toUpperCase();
};
