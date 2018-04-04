import React from 'react';
import { shallow } from 'enzyme';

import sampleRecurringExpenses from '../data/sampleRecurringExpenses';

import RecurringExpenseTable from './RecurringExpenseTable';

describe('RecurringExpenseTable', () => {

	it('should handleRecurringExpenseDelete without error', () => {
		const event = {
			preventDefault: () => { },
		}
		const id = 567876
		const instance = renderRecurringExpenseTable().instance();
		expect(instance.handleRecurringExpenseDelete(event, id)).toEqual(true);
	})

})

function renderRecurringExpenseTable(props = {}) {
	const propsToUser = {
		recurringExpenses: sampleRecurringExpenses,
		deleteRecurringExpense: () => { },
	}
	return shallow(<RecurringExpenseTable {...propsToUser} />)
}
