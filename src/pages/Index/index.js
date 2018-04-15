import React from 'react';
import { bool } from 'prop-types';
import moment from 'moment';
import uniqid from 'uniqid';

import { RecurringExpenseTable, ProjectionTable, NewExpenseForm, Footer } from '../../components';
import { MasterWrapper, ExpensesWrapper, Divider } from './StyledComponents';
import { Title } from '../../styles/SharedComponents';

import { trimOldOneTimeExpenses } from './helpers';

class Index extends React.PureComponent {

	static propTypes = {
		testing: bool,
	}

	state = {
		startingDate: moment(),
		endingDate: moment().add(2, 'M'), // two month range
		startingCash: 0,
		expenses: {},
	}

	addExpense = (newExpense) => {
		const expenses = { ...this.state.expenses };
		const id = newExpense.id || uniqid();
		expenses[id] = {
			...newExpense,
			id,
		}
		this.setState({ expenses });
	}

	deleteExpense = (id) => {
		const expenses = { ...this.state.expenses };
		delete expenses[id];
		this.setState({ expenses })
	}

	updateStartingDate = (newDate = moment()) => {
		this.setState({ startingDate: newDate.hour(0).minute(0) })
	}

	updateEndingDate = (newDate = moment().add(2, 'M')) => {
		this.setState({ endingDate: newDate })
	}

	updateStartingCash = (newStartingCash) => {
		this.setState({ startingCash: newStartingCash })
	}

	componentDidMount = () => {
		if (this.props.testing) return; // don't run if we're testing
		const localStorageRef = localStorage.getItem('cashflow');
		if (localStorageRef) {
			const stateFromStorage = JSON.parse(localStorageRef);

			// delete old one-time expenses
			stateFromStorage.oneTimeExpenses = trimOldOneTimeExpenses({ ...stateFromStorage.oneTimeExpenses });

			this.setState({
				...stateFromStorage,
				startingDate: moment(stateFromStorage.startingDate), // covert to moment obj
				endingDate: moment(stateFromStorage.endingDate), // covert to moment obj
			})
		}
	}

	componentDidUpdate() {
		if (this.props.testing) return;  // don't run if we're testing

		const stateToStorage = {
			...this.state,
			startingDate: this.state.startingDate.valueOf(),
			endingDate: this.state.endingDate.valueOf(),
		}

		localStorage.setItem(
			'cashflow',
			JSON.stringify(stateToStorage)
		);
	}

	render() {

		const { expenses, startingDate, endingDate, startingCash } = this.state;

		return (
			<MasterWrapper>
				<Title>cashflow-calc</Title>
				<ExpensesWrapper>
					<ProjectionTable
						expenses={expenses}
						startingDate={startingDate}
						endingDate={endingDate}
						startingCash={startingCash}
						updateStartingDate={this.updateStartingDate}
						updateEndingDate={this.updateEndingDate}
						updateStartingCash={this.updateStartingCash}
						deleteExpense={this.deleteExpense}
					/>
					<NewExpenseForm addExpense={this.addExpense} />
				</ExpensesWrapper>
				<Footer />
			</MasterWrapper>
		)
	}
}

export default Index;