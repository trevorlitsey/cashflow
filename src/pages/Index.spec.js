import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import Index from './Index';

describe('Index', () => {
	it('should add new recurring expense', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newRecurringExpense = {
			date: '',
			name: '',
			repeatFrequency: 2,
			repeatInterval: 'weeks',
		}

		// add one to none
		instance.addRecurringExpense(newRecurringExpense);
		expect(Object.keys(instance.state.recurringExpenses).length).toEqual(1);

		// add one to some
		instance.addRecurringExpense(newRecurringExpense);
		expect(Object.keys(instance.state.recurringExpenses).length).toEqual(2);
	})

	it('should delete recurring expense of given id', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const recurringExpense = {
			id: 23456789,
			date: moment(234567890),
			name: 'oh ya',
			repeatFrequency: 2,
			repeatInterval: 'weeks',
		}

		instance.setState({
			recurringExpenses: {
				one: recurringExpense
			}
		})

		// just to make sure it made it in there...
		expect(Object.keys(instance.state.recurringExpenses).length).toEqual(1);

		// g'bye
		instance.deleteRecurringExpense('one');
		expect(Object.keys(instance.state.recurringExpenses).length).toEqual(0);

	})

	it('should add new one-time expense', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newOneTimeExpense1 = {
			date: moment(9876542356),
			name: 'oh ya???',
			amount: 400,
		}

		const newOneTimeExpense2 = {
			date: moment(5678909876),
			name: 'oh ya!!!',
			amount: 400,
		}

		// add one to none
		instance.addOneTimeExpense(newOneTimeExpense1);
		expect(Object.keys(instance.state.oneTimeExpenses).length).toEqual(1);

		// add one to some
		setTimeout(() => {
			instance.addOneTimeExpense(newOneTimeExpense2);
			expect(Object.keys(instance.state.oneTimeExpenses).length).toEqual(2);
		}, 10) // to make sure id's are not the same

	})

	it('should update starting date', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newStartingDate = moment(234567890);
		instance.updateStartingDate(newStartingDate);

		expect(instance.state.startingDate).toEqual(newStartingDate);
	})

	it('should default to today if starting date is exd out', () => {
		const instance = shallow(<Index testing={true} />).instance();

		instance.updateStartingDate(); // no arg provided

		expect(instance.state.startingDate.format('LL')).toEqual(moment().format('LL'));
	})

	it('should default to two months from today if ending date is exd out', () => {
		const instance = shallow(<Index testing={true} />).instance();

		instance.updateEndingDate(); // no arg provided

		expect(instance.state.endingDate.format('LL')).toEqual(moment().add(2, 'M').format('LL'));
	})



	it('should update ending date', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newEndingDate = moment(234567890);
		instance.updateEndingDate(newEndingDate);

		expect(instance.state.endingDate).toEqual(newEndingDate);
	})

	it('should update starting cash', () => {
		const instance = shallow(<Index testing={true} />).instance();

		const newStartingCash = 456789
		instance.updateStartingCash(newStartingCash);

		expect(instance.state.startingCash).toEqual(newStartingCash);
	})

})

