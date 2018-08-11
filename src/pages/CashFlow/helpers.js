import moment from 'moment';

export const trimOldOneTimeExpenses = (oneTimeExpenses, today = Date.now()) => {
	Object.entries(oneTimeExpenses).forEach(([key, values]) => {
		const { startDate } = values;
		if (
			moment(startDate)
				.hour(23)
				.minute(59)
				.valueOf() < today
		) {
			delete oneTimeExpenses[key];
		}
	});
	return oneTimeExpenses;
};
