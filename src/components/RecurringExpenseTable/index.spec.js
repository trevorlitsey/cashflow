import React from 'react';
import { shallow } from 'enzyme';

import sampleRecurringExpenses from '../../data/sampleRecurringExpenses';

import RecurringExpenseTable from './index';

describe('RecurringExpenseTable', () => {

	it('should handleRecurringExpenseDelete without error', () => {
		const instance = renderRecurringExpenseTable().instance();

		const event = {
			preventDefault: () => { },
		}
		const id = 567876;
		instance.handleRecurringExpenseDelete(event, id);

		expect(instance.props.deleteRecurringExpense.mock.calls.length).toBe(1);
	})

})

function renderRecurringExpenseTable(props = {}) {
	const propsToUser = {
		recurringExpenses: sampleRecurringExpenses,
		deleteRecurringExpense: jest.fn(),
	}
	return shallow(<RecurringExpenseTable {...propsToUser} />)
}
