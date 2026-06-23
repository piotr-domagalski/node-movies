import * as fv from "./fieldValidation.js";

function checkStringAndFocus(obj, msg, validation_fn) {
    let str = obj.value;
    let errorField = document.getElementById(obj.name + "Error")
    if (validation_fn(str)) {
        if (errorField != null) { showElement(errorField); errorField.title = `Error: ${msg}.` }
        obj.focus();
        return false;
    } else {
        if (errorField != null) { hideElement(errorField); errorField.title = ""; }
        return true;
    }
}

function showElement(e) {
    e.style.visibility = 'visible';
}

function hideElement(e) {
    e.style.visibility = 'hidden';
}

export default function validate(form) {
    let errors = 0;
    if (!checkStringAndFocus(form.elements["title"], fv.titleErrorMessage, fv.isTitleInvalid)) { errors++; }
    if (!checkStringAndFocus(form.elements["releaseDate"], fv.releaseDateErrorMessage, fv.isReleaseDateInvalid)) { errors++; }
    if (!checkStringAndFocus(form.elements["genre"], fv.genreErrorMessage, fv.isGenreInvalid)) { errors++; }
    if (!checkStringAndFocus(form.elements["price"], fv.priceErrorMessage, fv.isPriceInvalid)) { errors++; }

    let summary = document.getElementById("validation-error-summary")
    if (errors != 0) {
        showElement(summary);
        summary.innerHTML = `Errors detected: ${errors}.  Hover over icons to see details.`
        return false;
    } else {
        hideElement(summary);
        summary.innerHTML = ""
        return true;
    }
}

const form = document.getElementById("edit-movie-form");

if (form) {
    form.addEventListener("submit", (e) => {
        if (!validate(form)) {
            e.preventDefault();
        }
    });
}
