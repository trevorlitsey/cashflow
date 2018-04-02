import React from 'react';
import { shallow } from 'enzyme';

import Index from './Index';

describe('Index', () => {
	it('should add new recurring expense to state', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newRecurringExpense = {
			date: '',
			name: '',
			repeatFrequency: 2,
			repeatInterval: 'weeks',
		}

		instance.addRecurringExpense(newRecurringExpense);
		expect(instance.state.recurringExpenses.length).toEqual(1);

		// do it again
		instance.addRecurringExpense(newRecurringExpense);
		expect(instance.state.recurringExpenses.length).toEqual(2);

	})
})
