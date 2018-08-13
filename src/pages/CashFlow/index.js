import React, { Fragment } from 'react';
import { bool } from 'prop-types';
import moment from 'moment';
import uniqid from 'uniqid';
import { Toggle } from 'react-powerplug';
import { message, Button, Spin } from 'antd';

import db from '../../db';

import {
	ProjectionTable,
	EditExpenseForm,
	Footer,
	Layout,
	Title,
} from '../../components';
import { MasterWrapper, ExpensesWrapper, Divider } from './StyledComponents';

import { trimOldOneTimeExpenses } from './helpers';

class Index extends React.PureComponent {
	static propTypes = {
		testing: bool,
	};

	state = {
		loading: true,
		startingDate: moment()
			.hour(0)
			.minute(0),
		endingDate: moment()
			.hour(0)
			.minute(0)
			.add(2, 'M'), // two month range
		startingCash: 0,
		title: this.props.match.params.id,
		expenses: {},
	};

	componentDidMount = () => {
		const budgetId = this.props.match.params.id;

		this.ref = db.ref(budgetId);
		this.ref.on('value', snapshot => {
			const newState = snapshot.val();
			this.setState({
				...newState,
				startingDate:
					newState && newState.startingDate
						? moment(newState.startingDate)
						: moment()
								.hour(0)
								.minute(0),
				endingDate:
					newState && newState.endingDate
						? moment(newState.endingDate)
						: moment()
								.hour(0)
								.minute(0)
								.add(2, 'M'),
				loading: false,
			});
		});
	};

	componentDidUpdate = () => {
		this.logRecentView();
	};

	logRecentView = () => {
		if (this.props.testing) return;

		const budgetId = this.props.match.params.id;
		const localStorageRef = localStorage.getItem('recentlyViewed');

		let recentlyViewed;

		if (localStorageRef) {
			recentlyViewed = JSON.parse(localStorageRef);

			const alreadyInList = !!recentlyViewed[budgetId];

			if (!alreadyInList) {
				recentlyViewed[budgetId] = {};
			}

			recentlyViewed[budgetId] = {
				id: budgetId,
				title: this.state.title,
				lastViewed: Date.now(),
			};
		} else {
			recentlyViewed = {
				[budgetId]: {
					lastViewed: Date.now(),
					title: this.state.title,
					id: budgetId,
				},
			};
		}

		localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
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
		this.setState({ expenses: {} });
		db.ref(this.props.match.params.id)
			.child('expenses')
			.remove();
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

	updateTitle = title => {
		db.ref(this.props.match.params.id).update({
			title,
		});
	};

	render() {
		const {
			expenses,
			startingDate,
			endingDate,
			startingCash,
			title,
			loading,
		} = this.state;

		if (loading) {
			return (
				<div
					style={{
						height: 200,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Spin />
				</div>
			);
		}

		return (
			<Layout>
				<MasterWrapper>
					<Title title={title} onSubmit={this.updateTitle} />
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
