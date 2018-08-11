export const formatter = value => {
	return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const parser = value => {
	return value.replace(/\$\s?|(,*)/g, '');
};
