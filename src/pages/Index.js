import React from 'react';
import { bool } from 'prop-types';
import styled from 'styled-components';

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

	state = {
		recurringExpenses: [],
	}

	static propTypes = {
		testing: bool,
	}

	addRecurringExpense = (newRecurringExpense) => {
		const recurringExpenses = [...this.state.recurringExpenses];
		recurringExpenses.push(newRecurringExpense);
		this.setState({ recurringExpenses });
	}

	deleteRecurringExpense = () => {
		// TODO
	}

	componentDidMount = () => {
		if (this.props.testing) return;
		const localStorageRef = localStorage.getItem('cashflow');
		if (localStorageRef) {
			this.setState({ recurringExpenses: JSON.parse(localStorageRef) })
		}
	}

	componentDidUpdate() {
		if (this.props.testing) return;
		localStorage.setItem(
			'cashflow',
			JSON.stringify(this.state.recurringExpenses)
		);
	}

	render() {

		const { recurringExpenses } = this.state;

		return (
			<MasterWrapper>
				<ExpensesWrapper>
					<RecurringExpenses recurringExpenses={recurringExpenses} addRecurringExpense={this.addRecurringExpense} />
					<ProjectionTable />
				</ExpensesWrapper>
				<Footer />
			</MasterWrapper>
		)
	}
}

export default Index;