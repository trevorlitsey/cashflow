import React from 'react';
import { object, func } from 'prop-types'
import { format } from 'date-fns';
import { Popconfirm, message, Tooltip } from 'antd';
import currencyFormatter from 'currency-formatter';

import { SubTitle } from '../../styles/SharedComponents';
import { Container, UnOrderedList, NoneYet } from './StyledComponents';

import { convertObjToArr } from '../../helpers';

// -------- TODO ---------
// - allow edit

class RecurringExpenseTable extends React.Component {

	static propTypes = {
		recurringExpenses: object.isRequired,
		deleteRecurringExpense: func.isRequired,
	}

	handleRecurringExpenseDelete = (id) => {
		this.props.deleteRecurringExpense(id)
		message.success('recurring income/expense deleted');
	}

	render() {

		const { recurringExpenses, deleteRecurringExpense } = this.props

		if (Object.keys(recurringExpenses).length === 0) {
			return (
				<div>
					<SubTitle>Recurring Income/Expenses:</SubTitle>
					<NoneYet>none yet</NoneYet>
				</div>
			)
		}

		return (
			<Container>
				<SubTitle>Recurring Income/Expenses:</SubTitle>
				<UnOrderedList>
					{convertObjToArr(recurringExpenses)
						.sort((a, b) => a.startDate - b.startDate) // sort asc
						.map((values) => {

							const { name, amount, startDate, frequency, interval, id } = values;

							return (
								<li key={id}>
									<div className="left">
										<p className="title">{`${name} (${currencyFormatter.format(amount, { code: 'USD', precision: 0 })})`}</p>
										<p className="subtitle">{`every ${frequency} ${interval} starting on ${format(startDate, 'MMMM D, YYYY')}`}</p>
									</div>
									<div className="right">
										<Tooltip data-test="delete" onClick={() => this.handleRecurringExpenseDelete(id)} placement="left" title="delete recurring income/expense"><span>x</span></Tooltip>
									</div>
								</li>
							)
						})}
				</UnOrderedList>
			</Container>
		)
	}
}

export default RecurringExpenseTable;