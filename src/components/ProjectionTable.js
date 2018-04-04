import React from 'react';
import { object, number, func } from 'prop-types';
import styled from 'styled-components';
import { format, addDays } from 'date-fns';
import { DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import currencyFormatter from 'currency-formatter';

import { convertObjToArr } from '../helpers';

import { SubTitle } from '../styles/components';

import NewOneTimeExpenseForm from './NewOneTimeExpenseForm';

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

// ------- TODO --------
// add input to change starting cash

const Row = (props) => {

	const { date, name, amount, balance } = props;

	return (
		<tr>
			<td>{date.format('LL')}</td>
			<td>{name}</td>
			<td>{currencyFormatter.format(amount, { code: 'USD', precision: 0 })}</td>
			<td>{currencyFormatter.format(balance, { code: 'USD', precision: 0 })}</td>
			<td>x</td>
		</tr>
	)
}

class ProjectionTable extends React.PureComponent {

	static propTypes = {
		recurringExpenses: object.isRequired,
		startingDate: object.isRequired,
		startingCash: number.isRequired,
		updateStartingDate: func.isRequired,
		updateStartingCash: func.isRequired,
		addOneTimeExpense: func.isRequired,
	}

	state = {
		rows: [],
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		const { startingDate, startingCash } = nextProps;
		let balance = startingCash;
		const rows = [];
		for (let i = 0; i < 60; i++) {
			const amount = i;
			rows.push({
				date: startingDate.clone().add(i, 'd'),
				name: 'a name',
				amount,
				balance: balance += amount,
			})
		}
		return { rows };
	}

	handleStartingDateChange = (e) => {
		this.props.updateStartingDate(e)
		return true;
	}

	handleStartingCashChange = (e) => {
		this.props.updateStartingCash(e);
		return true;
	}

	render() {

		const { rows } = this.state;
		const { startingDate, startingCash, addOneTimeExpense } = this.props;

		return (
			<Container>
				<SubTitle>Cashflow:</SubTitle>
				<Controls>
					<div>
						<label>Starting date: </label>
						<DatePicker value={startingDate} onChange={this.handleStartingDateChange} />
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
				<NewOneTimeExpenseForm addOneTimeExpense={addOneTimeExpense} />
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
						{rows.map(row => <Row key={row.date} {...row} />)}
					</tbody>
				</table>
			</Container>
		)
	}
}

export default ProjectionTable;