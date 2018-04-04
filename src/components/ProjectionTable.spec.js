import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';

import sampleRecurringExpenses from '../data/sampleRecurringExpenses';

import ProjectionTable from './ProjectionTable';

describe('ProjectionTable', () => {

	it('should handleStartingDateChange without error', () => {
		const instance = renderProjectionTable().instance();

		const newDate = moment(34567890);

		expect(instance.handleStartingDateChange(newDate)).toBeTruthy()
	})

	it('should handleStartingCashChange without error', () => {
		const instance = renderProjectionTable().instance();

		const newCash = 999;

		expect(instance.handleStartingCashChange(newCash)).toBeTruthy()
	})


})

function renderProjectionTable(props = {}) {
	const propsToUser = {
		recurringExpenses: sampleRecurringExpenses,
		startingDate: moment(9876543),
		startingCash: 100,
		updateStartingDate: () => { },
		updateStartingCash: () => { },
		addOneTimeExpense: () => { },
		...props,
	}

	return shallow(<ProjectionTable {...propsToUser} />)
}