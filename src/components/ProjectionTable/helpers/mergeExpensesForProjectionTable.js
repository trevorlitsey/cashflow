import moment from 'moment';

const mergeExpensesForProjectionTable = (startingRangeDate, endingRangeDate, recurringExpenses, oneTimeExpenses) => {

	const expensesForTable = [];

	// insert first row w/ starting cash/starting date
	expensesForTable.push({
		id: 0,
		name: '(starting balance)',
		date: startingRangeDate.valueOf(),
	})

	// insert recurring expenses into expensesForTable array
	Object.keys(recurringExpenses).forEach(key => {
		const { startDate, name, amount, frequency, interval } = recurringExpenses[key];

		const recurringExpenseDate = moment(startDate);

		while (recurringExpenseDate <= endingRangeDate) {
			if (recurringExpenseDate >= startingRangeDate) {
				// ignore if we're not in the specified user range
				const expenseToAdd = {
					id: key,
					date: recurringExpenseDate.valueOf(),
					name,
					amount,
					isRecurring: true,
				}
				expensesForTable.push(expenseToAdd)
			}
			recurringExpenseDate.add(frequency, interval);
		}
	})

	// insert oneTime expenses into array
	Object.keys(oneTimeExpenses).forEach(key => {
		const { startDate, name, amount } = oneTimeExpenses[key];
		if (startDate >= startingRangeDate && startDate <= endingRangeDate) {
			const expenseToAdd = {
				id: key,
				date: startDate.valueOf(),
				name,
				amount,
			}
			expensesForTable.push(expenseToAdd)
		}
	})

	// sort array by date
	expensesForTable.sort((a, b) => a.date - b.date);

	return expensesForTable;
}

export default mergeExpensesForProjectionTable;