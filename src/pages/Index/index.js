import React from 'react';
import { bool } from 'prop-types';
import moment from 'moment';

import { RecurringExpenses, ProjectionTable, Footer } from '../../components';
import { MasterWrapper, ExpensesWrapper, Divider } from './StyledComponents';
import { Title } from '../../styles/SharedComponents';

import { trimOldOneTimeExpenses } from './helpers';

// ---- TODO ----
// - mobile friendly!

class Index extends React.PureComponent {

	static propTypes = {
		testing: bool,
	}

	state = {
		startingDate: moment(),
		endingDate: moment().add(2, 'm'),
		startingCash: 0,
		recurringExpenses: {},
		oneTimeExpenses: {},
	}

	addRecurringExpense = (newRecurringExpense) => {
		const recurringExpenses = { ...this.state.recurringExpenses };
		const id = newRecurringExpense.id || Date.now();
		recurringExpenses[id] = {
			id,
			...newRecurringExpense,
		}
		this.setState({ recurringExpenses });
	}

	addOneTimeExpense = (newOneTimeExpense) => {
		const oneTimeExpenses = { ...this.state.oneTimeExpenses };
		const id = newOneTimeExpense.id || Date.now();
		oneTimeExpenses[id] = {
			id,
			...newOneTimeExpense,
		}
		this.setState({ oneTimeExpenses });
	}

	deleteRecurringExpense = (id) => {
		const recurringExpenses = { ...this.state.recurringExpenses };
		delete recurringExpenses[id];
		this.setState({ recurringExpenses })
	}

	deleteOneTimeExpense = (id) => {
		const oneTimeExpenses = { ...this.state.oneTimeExpenses };
		delete oneTimeExpenses[id];
		this.setState({ oneTimeExpenses })
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

		const { recurringExpenses, oneTimeExpenses, startingDate, endingDate, startingCash } = this.state;

		return (
			<MasterWrapper>
				<Title>CashflowCal.net</Title>
				<ExpensesWrapper>
					<RecurringExpenses
						recurringExpenses={recurringExpenses}
						addRecurringExpense={this.addRecurringExpense}
						deleteRecurringExpense={this.deleteRecurringExpense}
					/>
					<Divider />
					<ProjectionTable
						recurringExpenses={recurringExpenses}
						oneTimeExpenses={oneTimeExpenses}
						startingDate={startingDate}
						endingDate={endingDate}
						startingCash={startingCash}
						updateStartingDate={this.updateStartingDate}
						updateEndingDate={this.updateEndingDate}
						updateStartingCash={this.updateStartingCash}
						addOneTimeExpense={this.addOneTimeExpense}
						deleteOneTimeExpense={this.deleteOneTimeExpense}
					/>
				</ExpensesWrapper>
				<Footer />
			</MasterWrapper>
		)
	}
}

export default Index;