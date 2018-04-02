import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import NewRecurringExpenseForm from './NewRecurringExpenseForm';

describe('NewRecurringExpenseForm', () => {

	it('should update startDate', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		const newName = 'a new name'
		const e = {
			target: {
				value: newName,
			}
		}
		instance.handleNameChange(e)

		expect(instance.state.name).toEqual(newName);
	})

	it('should update name', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		const newDate = 1522704470525;
		instance.handleDateChange(moment(newDate));

		expect(instance.state.startDate).toEqual(newDate);
	})

	it('should update frequency', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		const newFrequency = 5;
		instance.handleFrequencyChange(newFrequency);

		expect(instance.state.frequency).toEqual(newFrequency);
	})

	it('should update interval', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		const newInterval = 'months';
		instance.handleIntervalChange(newInterval);

		expect(instance.state.interval).toEqual(newInterval);
	})

})

function renderNewRecurringExpenseForm(props = {}) {
	const propsToUser = {
		addRecurringExpense: () => { },
		...props,
	}
	return shallow(<NewRecurringExpenseForm {...propsToUser} />)
}