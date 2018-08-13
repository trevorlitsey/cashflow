import moment from 'moment';

const mergeExpensesForProjectionTable = (
	startingRangeDate,
	endingRangeDate,
	expenses = {}
) => {
	const expensesForTable = [];

	// insert first row w/ starting cash/starting date
	expensesForTable.push({
		id: 0,
		name: '(starting balance)',
		date: startingRangeDate.valueOf(),
	});

	// insert recurring expenses into expensesForTable array
	Object.keys(expenses).forEach(key => {
		const expense = expenses[key];
		const { startDate, name, amount, frequency, interval } = expense;

		if (frequency && interval) {
			const recurringExpenseDate = moment(startDate);
			while (recurringExpenseDate <= endingRangeDate) {
				if (recurringExpenseDate >= startingRangeDate) {
					// ignore if we're not in the specified user range
					const expenseToAdd = {
						...expense,
						date: recurringExpenseDate.valueOf(),
						isRecurring: true,
					};
					expensesForTable.push(expenseToAdd);
				}
				recurringExpenseDate.add(frequency, interval);
			}
		} else {
			const { startDate, name, amount } = expenses[key];
			if (startDate >= startingRangeDate && startDate <= endingRangeDate) {
				const expenseToAdd = {
					...expense,
					date: startDate.valueOf(),
					isRecurring: false,
				};
				expensesForTable.push(expenseToAdd);
			}
		}
	});

	// sort array by date
	expensesForTable.sort((a, b) => a.date - b.date);

	return expensesForTable;
};

export default mergeExpensesForProjectionTable;
