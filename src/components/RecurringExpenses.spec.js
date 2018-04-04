import React from 'react';
import { shallow } from 'enzyme'

import sampleRecurringExpenses from '../data/sampleRecurringExpenses';

import RecurringExpenses from './RecurringExpenses';

describe('RecurringExpenses', () => {

	it('should render without crashing', () => {
		const wrapper = renderRecurringExpenses();
		expect(wrapper).toMatchSnapshot();
	})

})

function renderRecurringExpenses(props = {}) {
	const propsToUser = {
		recurringExpenses: sampleRecurringExpenses,
		addRecurringExpense: () => { },
		deleteRecurringExpense: () => { },
		addOneTimeExpense: () => { },
		...props,
	}
	return shallow(<RecurringExpenses {...propsToUser} />)
}