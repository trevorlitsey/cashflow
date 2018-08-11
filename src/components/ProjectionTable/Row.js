import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';
import { Toggle } from 'react-powerplug';

import EditExpenseForm from '../EditExpenseForm/EditExpenseForm';

import { SpanWithPointer } from '../../styles/SharedComponents';

const Row = props => {
	const {
		name,
		startDate,
		date,
		amount,
		balance,
		isRecurring,
		id,
		deleteExpense,
		editExpense,
	} = props;

	// is starting balance
	if (id === 0) {
		return (
			<tr>
				<td>{moment(date).format('LL')}</td>
				<td>{name}</td>
				<td />
				<td>
					{currencyFormatter.format(balance, { code: 'USD', precision: 0 })}
				</td>
				<td />
			</tr>
		);
	} else {
		return (
			<tr>
				<td>{moment(date).format('LL')}</td>
				<td>{name}</td>
				<td>
					{amount &&
						currencyFormatter.format(amount, { code: 'USD', precision: 0 })}
				</td>
				<td>
					{currencyFormatter.format(balance, { code: 'USD', precision: 0 })}
				</td>
				<td>
					<Toggle>
						{({ on, toggle }) => (
							<Fragment>
								<EditExpenseForm
									expense={{
										startDate,
										name,
										amount,
										balance,
										isRecurring,
										id,
									}}
									on={on}
									toggle={toggle}
									editExpense={editExpense}
									deleteExpense={deleteExpense}
								/>
								<Tooltip
									data-test={date + amount}
									onClick={toggle}
									placement="left"
									title={
										isRecurring
											? 'edit recurring income/expense'
											: 'edit one-time income/expense'
									}
								>
									<SpanWithPointer>✎</SpanWithPointer>
								</Tooltip>
							</Fragment>
						)}
					</Toggle>
				</td>
			</tr>
		);
	}
};

export default Row;
