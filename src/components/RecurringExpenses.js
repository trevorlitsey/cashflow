import React from 'react';
import { object, func } from 'prop-types';
import styled from 'styled-components';
import { SubTitle } from '../styles/components';

import RecurringExpenseTable from './RecurringExpenseTable';
import NewRecurringExpenseForm from './NewRecurringExpenseForm';

class RecurringExpenses extends React.PureComponent {

	static propTypes = {
		recurringExpenses: object.isRequired,
		addRecurringExpense: func.isRequired,
	}

	render() {

		const { recurringExpenses, addRecurringExpense } = this.props;

		return (
			<div>
				<SubTitle>Recurring Expenses:</SubTitle>
				<RecurringExpenseTable recurringExpenses={recurringExpenses} />
				<NewRecurringExpenseForm addRecurringExpense={addRecurringExpense} />
			</div>
		)
	}
}

export default RecurringExpenses;