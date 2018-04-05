import moment from 'moment';

const mergeExpensesForProjectionTable = (startDate, endDate, recurringExpenses, oneTimeExpenses) => {

	const expensesForTable = [];

	// insert recurring expenses into expensesForTable array
	Object.keys(recurringExpenses).forEach(key => {
		const { startDate, name, amount, frequency, interval } = recurringExpenses[key];

		const recurringExpenseDate = moment(startDate);

		while (recurringExpenseDate < endDate) {
			const expenseToAdd = {
				date: recurringExpenseDate.valueOf(),
				name,
				amount,
			}
			expensesForTable.push(expenseToAdd)
			recurringExpenseDate.add(frequency, interval);
		}
	})

	// insert oneTime expenses into array
	Object.keys(oneTimeExpenses).forEach(key => {
		const { startDate, name, amount } = oneTimeExpenses[key];
		const expenseToAdd = {
			date: startDate.valueOf(),
			name,
			amount,
		}
		expensesForTable.push(expenseToAdd)
	})

	// sort array by date
	expensesForTable.sort((a, b) => a.date - b.date);

	return expensesForTable;
}

export default mergeExpensesForProjectionTable;