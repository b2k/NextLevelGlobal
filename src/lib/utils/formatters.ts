export function camelCase(phrase: string, separator = '', normalize = true, splitOn = /[\s_-]+/) {
    if (isCamelCase(phrase)) {
        return phrase;
    }

    if (normalize) {
        phrase = phrase.toLowerCase();
    }

    return phrase
        .split(splitOn)
        .map((word, index) => {
            if (index === 0) {
                return word;
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(separator);
}
export function isCamelCase(phrase: string) {
    return /^[a-z][a-zA-Z0-9]*$/.test(phrase);
}

const SMALL_WORDS = new Set([
    'a', 'an', 'the',
    'and', 'but', 'or', 'nor', 'for', 'so', 'yet',
    'at', 'by', 'in', 'of', 'on', 'to', 'up', 'as', 'off', 'per'
]);

export function titleCase(
    phrase: string,
    separator = ' ',
    normalize = true,
    splitOn = /[\s_-]+/
) {
    if (normalize) {
        phrase = phrase.toLowerCase();
    }

    const words = phrase.split(splitOn);

    return words
        .map((word, index) => {
            if (!word) return word;

            // Always capitalize first word
            if (index === 0) {
                return capitalize(word);
            }

            // Lowercase small words
            if (SMALL_WORDS.has(word)) {
                return word;
            }

            return capitalize(word);
        })
        .join(separator);
}

export function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function sentenceCase(phrase: string) {
    if (!phrase) return '';
    return phrase.charAt(0).toUpperCase() + phrase.slice(1).toLowerCase();
}
