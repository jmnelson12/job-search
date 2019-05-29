/**
 * @param {string} elString
 * @param {string} type
 */
const setCursor = (elString, type) => {
	try {
		const element = document.querySelector(elString);
		element.style.cursor = type;
	} catch (e) {
		// global error
	}
};

export { setCursor };
