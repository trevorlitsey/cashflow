import React from 'react';
import { object, func } from 'prop-types'
import { format } from 'date-fns';
import { Popconfirm, message } from 'antd';
import currencyFormatter from 'currency-formatter';
import styled from 'styled-components';

import { UnOrderedList } from './StyledComponents';

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

		return (
			<div>
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
										<Popconfirm title="Are you sure you want to delete this expense?" onConfirm={() => this.handleRecurringExpenseDelete(id)} okText="Yes" cancelText="No">
											<span data-test="delete">x</span>
										</Popconfirm>
									</div>
								</li>
							)

						})}
				</UnOrderedList>
			</div>
		)
	}
}



export default RecurringExpenseTable;