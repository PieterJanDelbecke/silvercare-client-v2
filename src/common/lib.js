// min-width for mediaQuery
export const mediaQueryMinWidth = "(min-width:1200px)";

// convert "DD/MM/YYYY" to "YYYY/MM/DD"
export const convertDateFormat = (inputDate) => {
	const match = inputDate.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
	const outputDate = match[3] + "/" + match[2] + "/" + match[1];
	return outputDate;
};
