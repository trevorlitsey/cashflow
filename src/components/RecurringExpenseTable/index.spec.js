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

	it('should call handleRecurringExpenseDelete on Popconfirm click', () => {
		const recurringExpenses = {
			one: {
				name: 'yo',
				startDate: 23456789,
				amount: 100,
				frequency: 2,
				interval: 'weeks',
			}
		}

		const wrapper = fullRenderRecurringExpenseTable({ recurringExpenses });
		const spy = jest.spyOn(wrapper.instance(), 'handleRecurringExpenseDelete');
		wrapper.update();
		wrapper.find('[data-test="delete"]').simulate('click');
		const button = wrapper.find('.ant-btn-primary').simulate('click')

		expect(spy).toHaveBeenCalled();
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
