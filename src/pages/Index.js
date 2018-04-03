import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';
import addDays from 'date-fns/add_days';

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

class Index extends React.PureComponent {

	static propTypes = {
		testing: bool,
	}

	state = {
		startingDate: new Date().valueOf(),
		endingDate: addDays(new Date(), 60).valueOf,
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
		if (this.props.testing) return; // don't run is we're testing
		const localStorageRef = localStorage.getItem('cashflow');
		if (localStorageRef) {
			const state = JSON.parse(localStorageRef);
			this.setState(state)
		}
	}

	componentDidUpdate() {
		if (this.props.testing) return;  // don't run is we're testing
		localStorage.setItem(
			'cashflow',
			JSON.stringify(this.state)
		);
	}

	render() {

		const { recurringExpenses, startingDate, startingCash } = this.state;

		return (
			<MasterWrapper>
				<ExpensesWrapper>
					<RecurringExpenses recurringExpenses={recurringExpenses} addRecurringExpense={this.addRecurringExpense} />
					<ProjectionTable recurringExpenses={recurringExpenses} startingDate={startingDate} startingCash={startingCash} />
				</ExpensesWrapper>
				<Footer />
			</MasterWrapper>
		)
	}
}

export default Index;