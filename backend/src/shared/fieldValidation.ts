
function isWhitespaceOrEmpty(str: string) {
    return /^[\s\t\r\n]*$/.test(str);
}

export const titleErrorMessage = "Title must be 3 to 60 characters in length and nonempty";
export function isTitleInvalid(title: string) {
    return title.length < 3 || title.length > 60 || isWhitespaceOrEmpty(title);
}

const dateRegex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
export const releaseDateErrorMessage = "Release date must be in the format 'yyyy-mm-dd'";
export function isReleaseDateInvalid(date: string) {
    return !(dateRegex.test(date));
}

const genreRegex = /^[A-Z]+[A-Za-z\s]*$/;
export const genreErrorMessage = `Genre must match the regex ${genreRegex}`;
export function isGenreInvalid(genre: string) {
    return !(genreRegex.test(genre));
}

export const priceErrorMessage = `Price must be between 1 and 100`;
export function isPriceInvalid(price: string) {
    const number = Number(price);
    return number < 1 || number > 100;
}
