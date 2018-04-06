import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import RecurringExpenses from '../components/RecurringExpenses';
import ProjectionTable from '../components/ProjectionTable';
import Footer from '../components/Footer';

const MasterWrapper = styled.div`
	display: grid;
	grid-auto-flow: row;
`

const ExpensesWrapper = styled.div`
	min-height: 94vh;
	border-top: 8px solid HSLA(209, 100%, 60%, 1.00);
	padding: 50px;

	@media (min-width: 1000px) {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, minmax(400px, 1fr));
		grid-gap: 40px;
		max-width: auto;
	}
`

const Divider = styled.div`
	height: 10px;
	margin: 30px 0;
	border-bottom: 1px solid HSLA(220, 8%, 92%, 1.00);

	@media (min-width: 1000px) {
		display: none;
	}
`

// TODO: delete one time expenses when they expire?

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
		// TODO
	}

	updateStartingDate = (newDate = moment()) => {
		this.setState({ startingDate: newDate })
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
					/>
				</ExpensesWrapper>
				<Footer />
			</MasterWrapper>
		)
	}
}

export default Index;