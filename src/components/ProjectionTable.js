import React from 'react';
import { object, number } from 'prop-types';
import style from 'styled-components';
import { format, addDays } from 'date-fns';
import { DatePicker } from 'antd';
import moment from 'moment';

import { convertObjToArr } from '../helpers';

import { SubTitle } from '../styles/components';

const Container = style.div`
	width: 100%;

	table {
		width: 100%;
	}

	tr {
		border-bottom: 1px solid HSLA(225, 9%, 91%, 1.00);
	}
	
	th, td {
		padding: 8px;
	}
`

// ------- TODO --------
// use moment instead of date fns
// add input to change starting cash

const Row = (props) => {

	const { date, income, expense, balance } = props;

	return (
		<tr>
			<td>{moment(date).format('LL')}</td>
			<td>{`$${income}`}</td>
			<td>{`$${expense}`}</td>
			<td>{`$${balance}`}</td>
		</tr>
	)
}

class ProjectionTable extends React.PureComponent {

	static propTypes = {
		recurringExpenses: object.isRequired,
		startingDate: number.isRequired,
		startingCash: number.isRequired,
	}

	state = {
		rows: [],
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {

		const { startingDate, startingCash } = nextProps;
		let balance = startingCash;
		const rows = [];
		for (let i = 0; i < 60; i++) {
			rows.push({
				date: addDays(startingDate, i),
				income: 0,
				expense: 0,
				balance,
			})
		}
		return { rows };
	}

	handleStartingDateChange = (e) => {
		// TODO
		console.log(e);
	}

	render() {

		const { rows } = this.state;
		const { startingDate } = this.props;

		return (
			<Container>
				<SubTitle>Cashflow:</SubTitle>
				<label>Starting date: </label>
				<br />
				<DatePicker value={moment(startingDate)} onChange={this.handleStartingDateChange} />
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Income</th>
							<th>Expense</th>
							<th>Cash</th>
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