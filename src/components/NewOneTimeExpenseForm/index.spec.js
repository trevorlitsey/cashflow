import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import NewOneTimeExpenseForm from './index';

const event = {
	target: {
		value: '',
	},
	preventDefault: () => { },
}

describe('NewOneTimeExpenseForm', () => {

	it('should hane name change', () => {
		const instance = renderOneTimeExpenseForm().instance();

		const newName = 'a new name'
		event.target.value = newName;
		instance.handleNameChange(event)

		expect(instance.state.name).toEqual(newName);
	})

	it('should handle startingDate change', () => {
		const instance = renderOneTimeExpenseForm().instance();

		const newDate = 1522704470525;
		instance.handleDateChange(moment(newDate));

		expect(instance.state.startDate).toEqual(newDate);
	})

	it('should handle amount change', () => {
		const instance = renderOneTimeExpenseForm().instance();

		const newAmount = 10;
		instance.handleAmountChange(newAmount);

		expect(instance.state.amount).toEqual(newAmount);
	})

	it('should not call addOneTimeExpense when values are missing', () => {
		const instance = renderOneTimeExpenseForm().instance();

		const event = {
			preventDefault: () => { },
		}

		instance.handleSubmit(event);

		expect(instance.props.addOneTimeExpense.mock.calls.length).toBe(0);
	})

	it('should call addOneTimeExpense on submit when all expected values are present', () => {
		const instance = renderOneTimeExpenseForm().instance();

		const event = {
			preventDefault: () => { },
		}

		instance.setState({
			name: 'this is a name',
			startDate: 234567890,
			amount: 1000,
		})

		instance.handleSubmit(event);

		expect(instance.props.addOneTimeExpense.mock.calls.length).toBe(1);
	})

	it('should clear form on submit', () => {
		const instance = renderOneTimeExpenseForm().instance();

		instance.setState({
			name: 'this is a name',
			startDate: 234567890,
			amount: 1000,
		})

		const event = {
			preventDefault: () => { },
		}

		instance.handleSubmit(event);

		expect(instance.state.name).toEqual('');
		expect(moment(instance.state.startDate).format('LL')).toEqual(moment().format('LL'));
		expect(instance.state.amount).toEqual(100);
	})

})

function renderOneTimeExpenseForm(props = {}) {
	const propsToUser = {
		addOneTimeExpense: jest.fn(),
		...props,
	}
	return shallow(<NewOneTimeExpenseForm {...propsToUser} />)
}

// handleAmountChange = (e) => {
// 	this.setState({ amount: e });
// }