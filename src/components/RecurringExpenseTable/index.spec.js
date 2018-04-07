import React from 'react';
import { shallow, mount } from 'enzyme';

import sampleRecurringExpenses from '../../data/sampleRecurringExpenses';

import RecurringExpenseTable from './index';

describe('RecurringExpenseTable', () => {

	it('should render without crashing', () => {
		const wrapper = shallowRenderRecurringExpenseTable();

		expect(wrapper).toMatchSnapshot();
	})

	it('should handleRecurringExpenseDelete without error', () => {
		const instance = shallowRenderRecurringExpenseTable().instance();

		const event = {
			preventDefault: () => { },
		}
		const id = 567876;
		instance.handleRecurringExpenseDelete(event, id);

		expect(instance.props.deleteRecurringExpense.mock.calls.length).toBe(1);
	})

})

function shallowRenderRecurringExpenseTable(props = {}) {
	const propsToUser = {
		recurringExpenses: sampleRecurringExpenses,
		deleteRecurringExpense: jest.fn(),
		...props,
	}
	return shallow(<RecurringExpenseTable {...propsToUser} />)
}

function fullRenderRecurringExpenseTable(props = {}) {
	const propsToUser = {
		recurringExpenses: sampleRecurringExpenses,
		deleteRecurringExpense: jest.fn(),
		...props,
	}
	return mount(<RecurringExpenseTable {...propsToUser} />)
}
