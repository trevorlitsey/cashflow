export const trimOldOneTimeExpenses = (oneTimeExpenses, today = Date.now()) => {
	Object.entries(oneTimeExpenses).forEach(([key, values]) => {
		const { startDate } = values;
		if (startDate < today) {
			delete oneTimeExpenses[key]
		}
	})
	return oneTimeExpenses;
}