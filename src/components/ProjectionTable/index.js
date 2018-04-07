import React from 'react';
import { object, number, func } from 'prop-types';
import styled from 'styled-components';
import { DatePicker, InputNumber, Tooltip, message } from 'antd';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';

import { convertObjToArr } from '../../helpers';
import { SubTitle } from '../../styles/components';
import mergeExpensesForProjectionTable from './helpers/mergeExpensesForProjectionTable';

import NewOneTimeExpenseForm from '../NewOneTimeExpenseForm';

const { RangePicker } = DatePicker;

const Container = styled.div`
	width: 100%;

	table {
		width: 100%;
	}

	tr {
		border-bottom: 1px solid HSLA(225, 9%, 91%, 1.00);
	}

	td:last-child {
		width: 10px;
		color: HSLA(220, 0%, 70%, 1.00);
	}
	
	th, td {
		padding: 8px;
	}
`

const Controls = styled.div`

	display: flex;

	& > * {
		display: block;
		margin: 10px;
	}
`

const SpanWithPointer = styled.span`
	cursor: pointer;
`

// ------- TODO --------
// add ability to x out one-time expense ('delete one-time expense' on hover?)
// toggle decimal points 

const Row = (props) => {

	const { date, name, amount, balance, isRecurring, id, handleOneTimeExpenseDelete } = props;

	const xOutToolTip = <Tooltip data-test={date + amount} onClick={() => handleOneTimeExpenseDelete(id)} placement="left" title="delete income/expense"><SpanWithPointer>x</SpanWithPointer></Tooltip>

	return (
		<tr>
			<td>{moment(date).format('LL')}</td>
			<td>{name}</td>
			<td>{currencyFormatter.format(amount, { code: 'USD', precision: 0 })}</td>
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
		startingCash: number.isRequired,
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
			balance += row.amount;
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
							formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/\$\s?|(,*)/g, '')}
							onChange={this.handleStartingCashChange}
							required
						/>
					</div>
				</Controls>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Income/Expense</th>
							<th>Amount</th>
							<th>Balance</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{rows.map(row => <Row key={row.id + row.date} {...row} handleOneTimeExpenseDelete={this.handleOneTimeExpenseDelete} />)}
					</tbody>
				</table>
				<br />
				<NewOneTimeExpenseForm addOneTimeExpense={addOneTimeExpense} />
			</Container>
		)
	}
}

export default ProjectionTable;