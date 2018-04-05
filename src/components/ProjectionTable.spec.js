import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';

import sampleRecurringExpenses from '../data/sampleRecurringExpenses';
import sampleOneTimeExpenses from '../data/sampleOneTimeExpenses';

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
		oneTimeExpenses: sampleOneTimeExpenses,
		startingDate: moment(1522901995930), // April 4, 2018
		endingDate: moment(1528172492320), // June 4, 2018
		startingCash: 100,
		updateStartingDate: () => { },
		updateStartingCash: () => { },
		addOneTimeExpense: () => { },
		...props,
	}

	return shallow(<ProjectionTable {...propsToUser} />)
}