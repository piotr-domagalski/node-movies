
function isWhitespaceOrEmpty(str: string) {
    return /^[\s\t\r\n]*$/.test(str);
}

export const genreRegex = /^[A-Z]+[A-Za-z\s]*$/;

export function isTitleInvalid(title: string) {
    return title.length < 3 || title.length > 60 || isWhitespaceOrEmpty(title);
}

export function isReleaseDateInvalid(date: string) {
    return isWhitespaceOrEmpty(date);
}

export function isGenreInvalid(genre: string) {
    return !(genreRegex.test(genre));
}

export function isPriceInvalid(price: string) {
    const number = Number(price);
    return number < 1 || number > 100;
}
