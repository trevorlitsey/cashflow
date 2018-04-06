import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';

import sampleRecurringExpenses from '../data/sampleRecurringExpenses';
import sampleOneTimeExpenses from '../data/sampleOneTimeExpenses';

import ProjectionTable from './ProjectionTable';

describe('ProjectionTable', () => {

	it('should handleRangeChange without error', () => {
		const instance = renderProjectionTable().instance();

		const newStartingDate = moment(34567890);
		const newEndingDate = newStartingDate.add(2, 'm');
		instance.handleRangeChange([newStartingDate, newEndingDate]);

		expect(instance.props.updateStartingDate.mock.calls.length).toBe(1)
		expect(instance.props.updateEndingDate.mock.calls.length).toBe(1)
	})

	it('should handleStartingCashChange without error', () => {
		const instance = renderProjectionTable().instance();

		const newCash = 999;
		instance.handleStartingCashChange(newCash)

		expect(instance.props.updateStartingCash.mock.calls.length).toBe(1)
	})

})

function renderProjectionTable(props = {}) {
	const propsToUser = {
		recurringExpenses: sampleRecurringExpenses,
		oneTimeExpenses: sampleOneTimeExpenses,
		startingDate: moment(1522901995930), // April 4, 2018
		endingDate: moment(1528172492320), // June 4, 2018
		startingCash: 100,
		updateStartingDate: jest.fn(),
		updateEndingDate: jest.fn(),
		updateStartingCash: jest.fn(),
		addOneTimeExpense: () => { },
		...props,
	}

	return shallow(<ProjectionTable {...propsToUser} />)
}