import React from 'react';
import { shallow } from 'enzyme';

import Index from './Index';

describe('Index', () => {
	it('should add new recurring', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newRecurringExpense = {
			date: '',
			name: '',
			repeatFrequency: 2,
			repeatInterval: 'weeks',
		}

		// add one to none
		instance.addRecurringExpense(newRecurringExpense);
		expect(Object.keys(instance.state.recurringExpenses).length).toEqual(1);

		// add one to some
		instance.addRecurringExpense(newRecurringExpense);
		expect(Object.keys(instance.state.recurringExpenses).length).toEqual(2);
	})

	it('should delete recurring expense of given id', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const recurringExpense = {
			id: 23456789,
			date: 234567890,
			name: 'oh ya',
			repeatFrequency: 2,
			repeatInterval: 'weeks',
		}

		instance.setState({
			recurringExpenses: {
				one: recurringExpense
			}
		})

		// just to make sure it made it in there...
		expect(Object.keys(instance.state.recurringExpenses).length).toEqual(1);

		// g'bye
		instance.deleteRecurringExpense('one');
		expect(Object.keys(instance.state.recurringExpenses).length).toEqual(0);

	})

	it('should update starting date', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newStartingDate = 234567890;
		instance.updateStartingDate(newStartingDate);

		expect(instance.state.startingDate).toEqual(newStartingDate);
	})

	it('should update ending date', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newEndingDate = 234567890;
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

