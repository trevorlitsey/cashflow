import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import moment from 'moment';
import uniqid from 'uniqid';
import { Toggle } from 'react-powerplug';
import { message, Button } from 'antd';

import db from '../../db';

import {
	ProjectionTable,
	EditExpenseForm,
	Footer,
	Layout,
} from '../../components';
import { MasterWrapper, ExpensesWrapper, Divider } from './StyledComponents';
import { Title } from '../../styles/SharedComponents';

import { trimOldOneTimeExpenses } from './helpers';

class Index extends React.PureComponent {
	static propTypes = {
		testing: bool,
	};

	state = {
		startingDate: moment(),
		endingDate: moment().add(2, 'M'), // two month range
		startingCash: 0,
		expenses: {},
	};

	componentDidMount = () => {
		this.ref = db.ref(this.props.match.params.id);
		this.ref.on('value', snapshot => {
			const newState = snapshot.val();
			this.setState({
				...newState,
				startingDate: newState.startingDate
					? moment(newState.startingDate)
					: moment(),
				endingDate: newState.endingDate
					? moment(newState.endingDate)
					: moment().add(2, 'M'),
			});
		});
	};

	componentWillUnmount = () => {
		// base.removeBinding(this.ref);
	};

	addExpense = newExpense => {
		const expenses = { ...this.state.expenses };
		const id = newExpense.id || uniqid();
		expenses[id] = {
			...newExpense,
			id,
		};
		db.ref(this.props.match.params.id).update({
			expenses,
		});
	};

	editExpense = (id, editedExpense) => {
		const expenses = { ...this.state.expenses };
		expenses[id] = { id, ...editedExpense };
		db.ref(this.props.match.params.id).update({ expenses });
	};

	deleteExpense = id => {
		const expenses = { ...this.state.expenses };
		delete expenses[id];
		db.ref(this.props.match.params.id).update({ expenses });
		return message.success('income/expense deleted');
	};

	resetExpenses = () => {
		db.ref(this.props.match.params.id).update({ expenses: {} });
	};

	updateStartingDate = (newDate = moment()) => {
		db.ref(this.props.match.params.id).update({
			startingDate: newDate
				.hour(0)
				.minute(0)
				.valueOf(),
		});
	};

	updateEndingDate = (newDate = moment().add(2, 'M')) => {
		db.ref(this.props.match.params.id).update({
			endingDate: newDate.valueOf(),
		});
	};

	updateStartingCash = newStartingCash => {
		db.ref(this.props.match.params.id).update({
			startingCash: newStartingCash,
		});
	};

	render() {
		const { expenses, startingDate, endingDate, startingCash } = this.state;

		return (
			<Layout>
				<MasterWrapper>
					<ExpensesWrapper>
						<ProjectionTable
							expenses={expenses}
							startingDate={startingDate}
							endingDate={endingDate}
							startingCash={startingCash}
							updateStartingDate={this.updateStartingDate}
							updateEndingDate={this.updateEndingDate}
							updateStartingCash={this.updateStartingCash}
							editExpense={this.editExpense}
							deleteExpense={this.deleteExpense}
							resetExpenses={this.resetExpenses}
						/>
						<Toggle>
							{({ on, toggle }) => (
								<Fragment>
									<EditExpenseForm
										on={on}
										toggle={toggle}
										addExpense={this.addExpense}
									/>
									<Button
										onClick={toggle}
										className="full-width"
										htmlType="submit"
									>
										New Expense
									</Button>
								</Fragment>
							)}
						</Toggle>
					</ExpensesWrapper>
					<Footer />
				</MasterWrapper>
			</Layout>
		);
	}
}

export default Index;
