import React from 'react';
import { Tooltip } from 'antd';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';

import { SpanWithPointer } from '../../styles/SharedComponents';

const Row = (props) => {

	const { date, name, amount, balance, isRecurring, id, handleOneTimeExpenseDelete } = props;

	// is starting balance
	if (id === 0) {
		return (
			<tr>
				<td>{moment(date).format('LL')}</td>
				<td>{name}</td>
				<td></td>
				<td>{currencyFormatter.format(balance, { code: 'USD', precision: 0 })}</td>
				<td></td>
			</tr>
		)
	}

	else {
		return (
			<tr>
				<td>{moment(date).format('LL')}</td>
				<td>{name}</td>
				<td>{amount && currencyFormatter.format(amount, { code: 'USD', precision: 0 })}</td>
				<td>{currencyFormatter.format(balance, { code: 'USD', precision: 0 })}</td>
				<td>
					<Tooltip
						data-test={date + amount}
						onClick={() => handleOneTimeExpenseDelete(id)}
						placement="left"
						title={isRecurring ? 'delete recurring income/expense' : 'delete one-time income/expense'}
					>
						<SpanWithPointer>x</SpanWithPointer>
					</Tooltip>
				</td>
			</tr>
		)
	}

}

export default Row;