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

// ----- TODO -----
// place moment object at top of tree

class Index extends React.PureComponent {

	static propTypes = {
		testing: bool,
	}

	state = {
		startingDate: moment(),
		endingDate: moment().add(30, 'd'),
		startingCash: 0,
		recurringExpenses: {},
	}

	addRecurringExpense = (newRecurringExpense) => {
		const recurringExpenses = { ...this.state.recurringExpenses };
		const id = Date.now();
		recurringExpenses[Date.now()] = {
			id,
			...newRecurringExpense,
		}
		this.setState({ recurringExpenses });
	}

	deleteRecurringExpense = (id) => {
		const recurringExpenses = { ...this.state.recurringExpenses };
		delete recurringExpenses[id];
		this.setState({ recurringExpenses })
	}

	updateStartingDate = (newDate) => {
		this.setState({ startingDate: newDate })
	}

	updateEndingDate = (newDate) => {
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
			})
		}
	}

	componentDidUpdate() {
		if (this.props.testing) return;  // don't run if we're testing

		const stateToStorage = {
			...this.state,
			startingDate: this.state.startingDate.valueOf(),
		}

		localStorage.setItem(
			'cashflow',
			JSON.stringify(stateToStorage)
		);
	}

	render() {

		const { recurringExpenses, startingDate, startingCash } = this.state;

		return (
			<MasterWrapper>
				<ExpensesWrapper>
					<RecurringExpenses recurringExpenses={recurringExpenses} addRecurringExpense={this.addRecurringExpense} deleteRecurringExpense={this.deleteRecurringExpense} />
					<ProjectionTable recurringExpenses={recurringExpenses} startingDate={startingDate} startingCash={startingCash} />
				</ExpensesWrapper>
				<Footer />
			</MasterWrapper>
		)
	}
}

export default Index;