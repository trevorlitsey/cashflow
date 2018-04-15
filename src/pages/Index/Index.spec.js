import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import Index from './Index';

describe('Index', () => {

	it('should add new recurring expense', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const id = '2ghus6';
		const newExpense = {
			id,
			name: 'woooo!',
			startDate: 987654567,
			amount: 500,
			repeatFrequency: 2,
			repeatInterval: 'weeks',
		}

		// add one to none
		instance.addExpense(newExpense);
		expect(instance.state.expenses[id]).toEqual(newExpense);
	})

	it('should add new one-time expense', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const id = '2ghus6';
		const newExpense = {
			id,
			name: 'yessss',
			startDate: 987654567,
			amount: 500,
		}

		// add one to none
		instance.addExpense(newExpense);
		expect(instance.state.expenses[id]).toEqual(newExpense);
	})

	it('should delete expense of given id', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const id = 'expenseOne';
		const expenseOne = {
			id,
			date: moment(87651234564),
			name: 'expense #1',
			repeatFrequency: 1,
			repeatInterval: 'months',
		}

		const expenses = { expenseOne };

		instance.setState({ expenses });

		// just to make sure it made it in there...
		expect(instance.state.expenses[id]).toEqual(expenseOne);

		// g'bye
		instance.deleteExpense(id);
		expect(instance.state.expenses[id]).toBeUndefined();
	})

	it('should update starting date', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newStartingDate = moment(234567890);
		instance.updateStartingDate(newStartingDate);

		expect(instance.state.startingDate).toEqual(newStartingDate);
	})

	it('should default to today if starting date is exd out', () => {
		const instance = shallow(<Index testing={true} />).instance();

		instance.updateStartingDate(); // no arg provided

		expect(instance.state.startingDate.format('LL')).toEqual(moment().format('LL'));
	})

	it('should default to two months from today if ending date is exd out', () => {
		const instance = shallow(<Index testing={true} />).instance();

		instance.updateEndingDate(); // no arg provided

		expect(instance.state.endingDate.format('LL')).toEqual(moment().add(2, 'M').format('LL'));
	})

	it('should update ending date', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newEndingDate = moment(234567890);
		instance.updateEndingDate(newEndingDate);

		expect(instance.state.endingDate).toEqual(newEndingDate);
	})

	it('should update starting cash', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newStartingCash = 456789
		instance.updateStartingCash(newStartingCash);

		expect(instance.state.startingCash).toEqual(newStartingCash);
	})

})

