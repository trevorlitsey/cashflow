import React from 'react';
import { shallow } from 'enzyme';
import NewOneTimeExpenseForm from './NewOneTimeExpenseForm';
import moment from 'moment';

const event = {
	target: {
		value: '',
	},
	preventDefault: () => { },
}

describe('NewOneTimeExpenseForm', () => {

	it('should update name', () => {
		const instance = renderOneTimeExpenseForm().instance();

		const newName = 'a new name'
		event.target.value = newName;
		instance.handleNameChange(event)

		expect(instance.state.name).toEqual(newName);
	})

	it('should update startingDate', () => {
		const instance = renderOneTimeExpenseForm().instance();

		const newDate = 1522704470525;
		instance.handleDateChange(moment(newDate));

		expect(instance.state.startDate).toEqual(newDate);
	})

})

function renderOneTimeExpenseForm(props = {}) {
	const propsToUser = {
		addOneTimeExpense: () => { },
		...props,
	}
	return shallow(<NewOneTimeExpenseForm {...propsToUser} />)
}
