import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import NewRecurringExpenseForm from './index';

import { default as sampleExpense } from '../../data/sampleRecurringExpenses';
import blankExpense from '../../data/blankExpense';

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

		const newDate = moment(1522704470525);
		instance.handleDateChange(newDate);

		expect(instance.state.startDate).toEqual(newDate);
	})

	it('should update amount', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		const newAmount = 500;
		instance.handleAmountChange(newAmount);

		expect(instance.state.amount).toEqual(newAmount);
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

	it('should NOT call addRecurringExpense on submit if one or more values are not submitted', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		// no name (all other values provided by default)
		instance.handleSubmit(event);
		expect(instance.props.addRecurringExpense.mock.calls.length).toBe(0);

		// no startDate
		instance.setState({
			startDate: null,
		});
		instance.handleSubmit(event);
		expect(instance.props.addRecurringExpense.mock.calls.length).toBe(0);

		// no amount
		instance.setState({
			startDate: 9098765487654,
			amount: 0,
		});
		instance.handleSubmit(event);
		expect(instance.props.addRecurringExpense.mock.calls.length).toBe(0);

		// no frequency
		instance.setState({
			amount: 9098765487654,
			frequency: 0,
		});
		instance.handleSubmit(event);
		expect(instance.props.addRecurringExpense.mock.calls.length).toBe(0);
	})

	it('should call addRecurringExpense on submit', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		instance.setState({
			name: 'a name',
			startDate: 9876543,
			amount: 500,
			frequency: 4,
			interval: 'weeks',
		});
		instance.handleSubmit(event);

		expect(instance.props.addRecurringExpense.mock.calls.length).toBe(1);
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
		addRecurringExpense: jest.fn(),
		...props,
	}
	return shallow(<NewRecurringExpenseForm {...propsToUser} />)
}