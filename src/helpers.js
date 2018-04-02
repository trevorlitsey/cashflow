export const convertObjToArr = (obj) => {
	const arr = Object.keys(obj).map(key => {
		return obj[key];
	})
	return arr;
}