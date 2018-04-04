import mergeExpensesForProjectionTable from './mergeExpensesForProjectionTable';

const oneTimeExpenses = {
	three: {
		name: 'ya!',
		startDate: 1522698884359,
		name: 'an expenses',
	},
	four: {
		name: 'check this out',
		startDate: 1522698884359,
		name: 'an expenses',
	}
}

const recurringExpenses = {
	one: {
		name: 'ya!',
		startDate: 987628949876,
		name: 'an expenses',
		frequency: 2,
		interval: 'days',
	},
	two: {
		name: 'check this out',
		startDate: 9852384982345,
		name: 'an expenses',
		frequency: 1,
		interval: 'weeks',
	}
}

const merged = {
	...oneTimeExpenses
}

describe('mergeExpensesForProjectionTable', () => {

	it('should return a nice array for our table', () => {
		// TODO
	})

})