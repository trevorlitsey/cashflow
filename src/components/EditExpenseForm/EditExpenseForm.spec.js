import React from 'react';
import { shallow, mount } from 'enzyme';
import moment from 'moment';

import EditExpenseForm from './EditExpenseForm';

import { default as sampleExpense } from '../../data/sampleRecurringExpenses';
import blankExpense from '../../data/blankExpense';

const event = {
	target: {
		value: '',
	},
	preventDefault: () => {},
};

describe('NewRecurringExpenseForm', () => {
	it('should render all expenses given', () => {
		// TODO
	});

	it('should render expenses in ascending order of startDate', () => {
		// TODO
	});

	it('should update name', () => {
		const wrapper = renderNewRecurringExpenseForm();

		const newName = 'a new name';
		const event = {
			target: {
				value: newName,
			},
		};
		wrapper.find('[data-test="name"]').simulate('change', event);

		expect(wrapper.find('[data-test="name"]').props().value).toEqual(newName);
	});

	it('should update startingDate', () => {
		const wrapper = renderNewRecurringExpenseForm();

		const newDate = 1522704470525;
		wrapper.find('[data-test="date"]').simulate('change', newDate);

		expect(
			wrapper
				.find('[data-test="date"]')
				.props()
				.value.valueOf()
		).toEqual(newDate);
	});

	it('should update amount', () => {
		const wrapper = renderNewRecurringExpenseForm();

		const newAmount = 500;
		wrapper.find('[data-test="amount"]').simulate('change', newAmount);

		expect(wrapper.find('[data-test="amount"]').props().value).toEqual(
			newAmount
		);
	});

	it('should update frequency', () => {
		const wrapper = renderNewRecurringExpenseForm();

		const newFrequency = 5;
		wrapper.find('[data-test="frequency"]').simulate('change', newFrequency);

		expect(wrapper.find('[data-test="frequency"]').props().value).toEqual(
			newFrequency
		);
	});

	it('should update interval', () => {
		const wrapper = renderNewRecurringExpenseForm();

		const newInterval = 'days';
		wrapper.find('[data-test="interval"]').simulate('change', newInterval);

		expect(wrapper.find('[data-test="interval"]').props().value).toEqual(
			newInterval
		);
	});

	it('should NOT call addExpense on submit if one or more values are not submitted', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		// no name (all other values provided by default)
		instance.handleSubmit(event);
		expect(instance.props.addExpense.mock.calls.length).toBe(0);

		// no startDate
		instance.setState({
			startDate: null,
		});
		instance.handleSubmit(event);
		expect(instance.props.addExpense.mock.calls.length).toBe(0);

		// no amount
		instance.setState({
			startDate: 9098765487654,
			amount: 0,
		});
		instance.handleSubmit(event);
		expect(instance.props.addExpense.mock.calls.length).toBe(0);

		// no frequency
		instance.setState({
			amount: 9098765487654,
			frequency: 0,
		});
		instance.handleSubmit(event);
		expect(instance.props.addExpense.mock.calls.length).toBe(0);
	});

	it('should call addExpense on submit', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		instance.setState({
			name: 'a name',
			startDate: 9876543,
			amount: 500,
			frequency: 4,
			interval: 'weeks',
		});
		instance.handleSubmit(event);

		expect(instance.props.addExpense.mock.calls.length).toBe(1);
	});

	it('should clear form on submit', () => {
		const instance = renderNewRecurringExpenseForm().instance();

		instance.setState({
			...sampleExpense,
			isRecurring: true,
		});

		instance.handleSubmit(event);

		setTimeout(() => {
			expect(instance.state.name).toEqual(blankExpense.name);
			expect(moment(instance.state.startDate).format('LL')).toEqual(
				moment().format('LL')
			);
			expect(instance.state.amount).toEqual(blankExpense.amount);
			expect(instance.state.frequency).toEqual(blankExpense.frequency);
			expect(instance.state.interval).toEqual(blankExpense.interval);
			expect(instance.state.isRecurring).toEqual(false);
		}, 5); // takes a set to set state back to normal
	});
});

function renderNewRecurringExpenseForm(props = {}) {
	const propsToUser = {
		addExpense: jest.fn(),
		...props,
	};
	return shallow(<EditExpenseForm {...propsToUser} />);
}
