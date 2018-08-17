import moment from 'moment';

import mergeExpensesForProjectionTable from './mergeExpensesForProjectionTable';

const expenses = {
	oldRecurring: {
		name: 'an old date that should skip first iteration',
		startDate: 1522627200000, // April 1
		amount: 5000,
		frequency: 1,
		interval: 'months',
	},
	one: {
		startDate: 1524111595930, // 2 weeks
		name: 'ya!',
		amount: 100,
		frequency: 1,
		interval: 'months',
	},
	two: {
		startDate: 1523506795930, // 1 week
		name: 'check this out',
		amount: 400,
		frequency: 2,
		interval: 'weeks',
	},
	oldOneTimer: {
		name: 'an old date that should be deleted',
		startDate: 1522627200000, // April 1
		amount: 5000,
	},
	three: {
		name: 'ya!',
		startDate: 1523679595930, // 9 days
		amount: 600,
	},
	four: {
		name: 'check this out',
		startDate: 1524629995930, // 20 days
		amount: 700,
	},
};

const expectedMerged = [
	{
		id: 0,
		name: '(starting balance)',
		date: 1522901995930,
		balance: 0,
	},
	{
		id: 'two',
		name: 'check this out',
		startDate: 1523506795930,
		date: 1523506795930, // 1 week (April 11)
		amount: 400,
		balance: 400,
		isRecurring: true,
		frequency: 2,
		interval: 'weeks',
	},
	{
		id: 'three',
		name: 'ya!',
		startDate: 1523679595930,
		date: 1523679595930, // 9 days (April 13)
		amount: 600,
		isRecurring: false,
		balance: 1000,
	},
	{
		id: 'one',
		name: 'ya!',
		startDate: 1524111595930,
		date: 1524111595930, // 2 weeks (April 18)
		amount: 100,
		isRecurring: true,
		frequency: 1,
		interval: 'months',
		balance: 1100,
	},
	{
		id: 'four',
		name: 'check this out',
		startDate: 1524629995930,
		date: 1524629995930, // 20 days (April 24)
		amount: 700,
		isRecurring: false,
		balance: 1800,
	},
	{
		id: 'two',
		name: 'check this out',
		startDate: 1523506795930,
		date: 1524716395930, // 1 week + 2 weeks (April 25)
		amount: 400,
		isRecurring: true,
		frequency: 2,
		interval: 'weeks',
		balance: 2200,
	},
	{
		id: 'oldRecurring',
		name: 'an old date that should skip first iteration',
		startDate: 1522627200000,
		date: 1525219200000, // May 1
		amount: 5000,
		frequency: 1,
		interval: 'months',
		isRecurring: true,
		balance: 7200,
	},
	{
		id: 'two',
		name: 'check this out',
		startDate: 1523506795930,
		date: 1525925995930, // 1 week + 4 weeks (May 9)
		amount: 400,
		isRecurring: true,
		frequency: 2,
		interval: 'weeks',
		balance: 7600,
	},
	{
		id: 'one',
		name: 'ya!',
		startDate: 1524111595930,
		date: 1526703595930, // 1 week + 1 month (May 11)
		amount: 100,
		isRecurring: true,
		frequency: 1,
		interval: 'months',
		balance: 7700,
	},
	{
		id: 'two',
		name: 'check this out',
		startDate: 1523506795930,
		date: 1527135595930, // 1 week + 6 weeks (May 23)
		amount: 400,
		isRecurring: true,
		frequency: 2,
		interval: 'weeks',
		balance: 8100,
	},
	{
		id: 'oldRecurring',
		name: 'an old date that should skip first iteration',
		startDate: 1522627200000,
		date: 1527897600000, // June 1
		amount: 5000,
		isRecurring: true,
		frequency: 1,
		interval: 'months',
		balance: 13100,
	},
];

describe('mergeExpensesForProjectionTable', () => {
	// TODO, check if array contains only dates within specified range

	it('should return a nice array for our table', () => {
		const startDate = moment(1522901995930); // April 4, 2018
		const endDate = moment(1528172492320); // June 4, 2018

		const merged = mergeExpensesForProjectionTable(
			startDate,
			endDate,
			0,
			expenses
		);

		expect(merged).toEqual(expectedMerged);
	});
});
