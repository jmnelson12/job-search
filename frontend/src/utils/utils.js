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
function getUniqueObjValues(arr, compare) {
    const unique = arr
        .map(e => e[compare])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter(e => arr[e])
        .map(e => arr[e]);

    return unique;
}

function getUniqueArrValues(arr) {
    return arr.filter((value, i, self) => {
        return self.indexOf(value) === i;
    });
}

export { setCursor, getUniqueObjValues, getUniqueArrValues };
