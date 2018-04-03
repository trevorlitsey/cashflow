import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import NewRecurringExpenseForm from './NewRecurringExpenseForm';

import { default as sampleExpense } from '../data/sampleRecurringExpenses';
import blankExpense from '../data/blankExpense';

const event = {
	target: {
		value: '',
	},
	preventDefault: () => { },
}

describe('NewRecurringExpenseForm', () => {

	it('should update name', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		const newName = 'a new name'
		event.target.value = newName;
		instance.handleNameChange(event)

		expect(instance.state.name).toEqual(newName);
	})

	it('should update startingDate', () => {
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

	it('should clear form on submit', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		instance.setState(sampleExpense);

		instance.handleSubmit(event);

		expect(instance.state.name).toEqual(blankExpense.name);
		expect(instance.state.startDate.format('LL')).toEqual(blankExpense.startDate.format('LL'));
		expect(instance.state.amount).toEqual(blankExpense.amount);
		expect(instance.state.frequency).toEqual(blankExpense.frequency);
		expect(instance.state.interval).toEqual(blankExpense.interval);

	})

})

function renderNewRecurringExpenseForm(props = {}) {
	const propsToUser = {
		addRecurringExpense: () => { },
		...props,
	}
	return shallow(<NewRecurringExpenseForm {...propsToUser} />)
}