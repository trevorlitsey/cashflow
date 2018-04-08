import React from 'react';
import { object, func } from 'prop-types';
import styled from 'styled-components';

import { SubTitle } from '../../styles/SharedComponents';

import RecurringExpenseTable from '../RecurringExpenseTable/RecurringExpenseTable';
import NewRecurringExpenseForm from '../NewRecurringExpenseForm/NewRecurringExpenseForm';

class RecurringExpenses extends React.PureComponent {

	static propTypes = {
		recurringExpenses: object.isRequired,
		addRecurringExpense: func.isRequired,
		deleteRecurringExpense: func.isRequired,
	}

	render() {

		const { recurringExpenses, addRecurringExpense, deleteRecurringExpense, addOneTimeExpense } = this.props;

		return (
			<div>
				<SubTitle>Recurring Income/Expenses:</SubTitle>
				<RecurringExpenseTable recurringExpenses={recurringExpenses} deleteRecurringExpense={deleteRecurringExpense} />
				<NewRecurringExpenseForm addRecurringExpense={addRecurringExpense} />
			</div>
		)
	}
}

export default RecurringExpenses;