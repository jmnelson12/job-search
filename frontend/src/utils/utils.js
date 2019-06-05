/**
 * @param {string} elString
 * @param {string} type
 */
function setCursor(elString, type) {
    try {
        const element = document.querySelector(elString);
        element.style.cursor = type;
    } catch (e) {
        // global error
    }
}

/**
 * @param {array} arr
 * @param {string} compare
 */
function getUniqueValues(arr, compare) {
    const unique = arr
        .map(e => e[compare])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);

    return unique;
}

export { setCursor, getUniqueValues };
