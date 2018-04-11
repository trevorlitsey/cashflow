import React from 'react';
import { object, number, string, func } from 'prop-types';
import { DatePicker, InputNumber, Tooltip, message } from 'antd';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';

import { SubTitle, SpanWithPointer } from '../../styles/SharedComponents';
import { Container, Controls } from './StyledComponents';

import NewOneTimeExpenseForm from '../NewOneTimeExpenseForm/NewOneTimeExpenseForm';

import { convertObjToArr } from '../../helpers';
import { formatter, parser } from '../shared/helpers';
import mergeExpensesForProjectionTable from './helpers/mergeExpensesForProjectionTable';

const { RangePicker } = DatePicker;

// ------- TODO --------
// toggle decimal points 
// option to display all dates
// integrate formatter/parser
// break this down into smaller components

const Row = (props) => {

	const { date, name, amount, balance, isRecurring, id, handleOneTimeExpenseDelete } = props;

	const xOutToolTip = <Tooltip data-test={date + amount} onClick={() => handleOneTimeExpenseDelete(id)} placement="left" title="delete one-time income/expense"><SpanWithPointer>x</SpanWithPointer></Tooltip>

	return (
		<tr>
			<td>{moment(date).format('LL')}</td>
			<td>{name}</td>
			<td>{amount && currencyFormatter.format(amount, { code: 'USD', precision: 0 })}</td>
			<td>{currencyFormatter.format(balance, { code: 'USD', precision: 0 })}</td>
			<td>{!isRecurring ? xOutToolTip : ''}</td>
		</tr>
	)
}

class ProjectionTable extends React.PureComponent {

	static propTypes = {
		recurringExpenses: object.isRequired, // TODO, make shape
		oneTimeExpenses: object.isRequired, // TODO, make shape
		startingDate: object.isRequired,
		endingDate: object.isRequired,
		startingCash: number.isRequired || string.isRequired, // TODO
		updateStartingDate: func.isRequired,
		updateEndingDate: func.isRequired,
		updateStartingCash: func.isRequired,
		addOneTimeExpense: func.isRequired,
		deleteOneTimeExpense: func.isRequired,
	}

	state = {
		rows: [],
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		const { startingDate, endingDate, recurringExpenses, oneTimeExpenses, startingCash } = nextProps;

		const rows = mergeExpensesForProjectionTable(startingDate, endingDate, recurringExpenses, oneTimeExpenses)

		// insert balance
		let balance = startingCash;
		rows.forEach(row => {
			if (row.amount) {
				balance += row.amount;
			}
			row.balance = balance;
		})

		return { rows };
	}

	handleRangeChange = (newDatesArr) => {
		const [newStartingDate, newEndingDate] = newDatesArr;
		this.props.updateStartingDate(newStartingDate)
		this.props.updateEndingDate(newEndingDate)
	}

	handleStartingCashChange = (e) => {
		this.props.updateStartingCash(e);
	}

	handleOneTimeExpenseDelete = (id) => {
		this.props.deleteOneTimeExpense(id);
		return message.success('income/expense deleted')
	}

	render() {

		const { rows } = this.state;
		const { startingDate, endingDate, startingCash, addOneTimeExpense } = this.props;

		const Head = (
			<thead>
				<tr>
					<th>Date</th>
					<th>Income/Expense</th>
					<th>Amount</th>
					<th>Balance</th>
					<th></th>
				</tr>
			</thead>
		)

		const Body = (
			<tbody>
				{rows.map(row => <Row key={row.id + row.date} {...row} handleOneTimeExpenseDelete={this.handleOneTimeExpenseDelete} />)}
			</tbody>
		)

		return (
			<Container>
				<SubTitle>Cashflow:</SubTitle>
				<Controls>
					<div>
						<label>Projection range: </label>
						<RangePicker value={[startingDate, endingDate]} onChange={this.handleRangeChange} />
					</div>
					<div>
						<label>Starting cash: </label>
						<InputNumber
							value={startingCash}
							formatter={formatter}
							parser={parser}
							onChange={this.handleStartingCashChange}
							required
						/>
					</div>
				</Controls>
				<table>
					{Head}
					{Body}
				</table>
				<br />
				<NewOneTimeExpenseForm addOneTimeExpense={addOneTimeExpense} />
			</Container>
		)
	}
}

export default ProjectionTable;