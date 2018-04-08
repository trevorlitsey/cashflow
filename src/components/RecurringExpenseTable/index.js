import React from 'react';
import { object, func } from 'prop-types'
import { format } from 'date-fns';
import { Popconfirm, message } from 'antd';
import currencyFormatter from 'currency-formatter';
import styled from 'styled-components';

import { convertObjToArr } from '../../helpers';

const UnOrderedList = styled.ul`
	
	padding: 0;
	display: block;
	
	li {
		margin: 10px 0;
		padding: 0 10px 10px;
		display: grid;
		grid-template-columns: 4fr 1fr;
		border-bottom: 1px solid HSLA(220, 8%, 92%, 1.00);
	}

	p {
		margin: 5px;
	}

	a {
		margin: 0 4px;
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		color: HSLA(220, 8%, 92%, 1.00);
	}

	.title {
		font-weight: 600;
	}

`

// -------- TODO ---------
// - sort recurring expenses
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
					{Object.entries(recurringExpenses).map(([key, values]) => {

						const { name, amount, startDate, frequency, interval } = values;

						return (
							<li key={key}>
								<div className="left">
									<p className="title">{`${name} (${currencyFormatter.format(amount, { code: 'USD', precision: 0 })})`}</p>
									<p className="subtitle">{`every ${frequency} ${interval} starting on ${format(startDate, 'MMMM D, YYYY')}`}</p>
								</div>
								<div className="right">
									<a>edit</a>
									|
									<Popconfirm title="Are you sure you want to delete this expense?" onConfirm={() => this.handleRecurringExpenseDelete(key)} okText="Yes" cancelText="No">
										<a data-test="delete">delete</a>
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