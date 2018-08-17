import React from 'react';
import { oneOfType, shape, object, number, string, func } from 'prop-types';
import { DatePicker, InputNumber, message, Button, Popconfirm } from 'antd';
import moment from 'moment';

import { SubTitle } from '../../styles/SharedComponents';
import { Container, Controls, TableContainer } from './StyledComponents';

import { convertObjToArr } from '../../helpers';
import { formatter, parser } from '../shared/helpers';
import mergeExpensesForProjectionTable from './helpers/mergeExpensesForProjectionTable';

import Row from './Row';

const { RangePicker } = DatePicker;

// ------- TODO --------
// toggle decimal points
// option to display all dates
// integrate formatter/parser
// break this down into smaller components

class ProjectionTable extends React.PureComponent {
	static propTypes = {
		expenses: oneOfType([
			shape({
				name: string.isRequired,
				startDate: number.isRequired,
				date: number.isRequired,
				amount: number.isRequired,
				frequency: number.isRequired,
				interval: string.isRequired,
			}),
			shape({
				name: string.isRequired,
				startDate: number.isRequired,
				date: number.isRequired,
				amount: number.isRequired,
			}),
			shape({}),
		]),
		startingDate: object.isRequired,
		endingDate: object.isRequired,
		startingCash: number.isRequired || string.isRequired, // TODO
		updateStartingDate: func.isRequired,
		updateEndingDate: func.isRequired,
		updateStartingCash: func.isRequired,
		editExpense: func.isRequired,
		deleteExpense: func.isRequired,
		resetExpenses: func.isRequired,
	};

	handleRangeChange = newDatesArr => {
		const [newStartingDate, newEndingDate] = newDatesArr;
		this.props.updateStartingDate(newStartingDate);
		this.props.updateEndingDate(newEndingDate);
	};

	handleStartingCashChange = e => {
		this.props.updateStartingCash(e);
	};

	render() {
		const {
			startingDate,
			endingDate,
			startingCash,
			addOneTimeExpense,
			resetExpenses,
			editExpense,
			expenses,
		} = this.props;

		const rows = mergeExpensesForProjectionTable(
			startingDate,
			endingDate,
			startingCash,
			expenses
		);

		const Head = (
			<thead>
				<tr>
					<th>Date</th>
					<th>Income/Expense</th>
					<th>Amount</th>
					<th>Balance</th>
					<th />
				</tr>
			</thead>
		);

		const Body = (
			<tbody>
				{rows.map(row => (
					<Row
						editExpense={editExpense}
						key={row.id + row.date}
						{...row}
						deleteExpense={() => this.props.deleteExpense(row.id)}
					/>
				))}
			</tbody>
		);

		return (
			<Container>
				<Controls>
					<div>
						<label>Projection range: </label>
						<RangePicker
							value={[startingDate, endingDate]}
							onChange={this.handleRangeChange}
						/>
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
					<Popconfirm
						title="Delete all expenses?"
						onConfirm={resetExpenses}
						okText="Yes"
						cancelText="Cancel!"
					>
						<Button data-testid="reset" type="danger">
							Reset
						</Button>
					</Popconfirm>
				</Controls>
				<TableContainer>
					<table>
						{Head}
						{Body}
					</table>
				</TableContainer>
			</Container>
		);
	}
}

export default ProjectionTable;
