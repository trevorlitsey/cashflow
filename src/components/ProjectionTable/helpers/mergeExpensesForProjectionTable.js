import moment from 'moment';

const mergeExpensesForProjectionTable = (startingRangeDate, endingRangeDate, expenses = {}) => {

	const expensesForTable = [];

	// insert first row w/ starting cash/starting date
	expensesForTable.push({
		id: 0,
		name: '(starting balance)',
		date: startingRangeDate.valueOf(),
	})

	// insert recurring expenses into expensesForTable array
	Object.keys(expenses).forEach(key => {
		const { startDate, name, amount, frequency, interval } = expenses[key];


		if (frequency && interval) {
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
		}

		else {
			const { startDate, name, amount } = expenses[key];
			if (startDate >= startingRangeDate && startDate <= endingRangeDate) {
				const expenseToAdd = {
					id: key,
					date: startDate.valueOf(),
					name,
					amount,
				}
				expensesForTable.push(expenseToAdd)
			}
		}
	})

	// sort array by date
	expensesForTable.sort((a, b) => a.date - b.date);

	return expensesForTable;
}

export default mergeExpensesForProjectionTable;