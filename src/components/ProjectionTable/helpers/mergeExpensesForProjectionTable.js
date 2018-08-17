import moment from 'moment';

const mergeExpensesForProjectionTable = (
	startingRangeDate,
	endingRangeDate,
	startingCash,
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
					// ignore if we're not in the specified date range
					const expenseToAdd = {
						...expense,
						id: key,
						date: recurringExpenseDate.valueOf(),
						isRecurring: true,
					};
					expensesForTable.push(expenseToAdd);
				}
				recurringExpenseDate.add(frequency, interval);
			}
		} else {
			if (startDate >= startingRangeDate && startDate <= endingRangeDate) {
				const expenseToAdd = {
					...expense,
					id: key,
					date: startDate.valueOf(),
					isRecurring: false,
				};
				expensesForTable.push(expenseToAdd);
			}
		}
	});

	// sort array by date
	expensesForTable.sort((a, b) => a.date - b.date);

	// insert balance
	let balance = startingCash;
	expensesForTable.forEach(expense => {
		if (expense.amount) {
			balance += expense.amount;
		}
		expense.balance = balance;
	});

	return expensesForTable;
};

export default mergeExpensesForProjectionTable;
