import React from 'react';
import styled from 'styled-components';

import RecurringExpenses from '../components/RecurringExpenses';
import ProjectionTable from '../components/ProjectionTable';

const Wrapper = styled.div`
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

const recurringExpenses = [
	{
		name: 'ya!',
		startDate: 1522698884359,
		name: 'an expenses',
		frequency: 2,
		interval: 'days',
	},
	{
		name: 'check this out',
		startDate: 1522698884359,
		name: 'an expenses',
		frequency: 1,
		interval: 'weeks',
	}
]

class Index extends React.PureComponent {

	state = {
		recurringExpenses,
	}

	addRecurringExpense = (newRecurringExpense) => {
		const recurringExpenses = [...this.state.recurringExpenses];
		recurringExpenses.push(newRecurringExpense);
		this.setState({ recurringExpenses });
	}

	deleteRecurringExpense = () => {
		// TODO
	}

	componentWillMount() {
		this.setState({ recurringExpenses });
	}

	render() {

		const { recurringExpenses } = this.state;

		return (
			<Wrapper>
				<RecurringExpenses recurringExpenses={recurringExpenses} addRecurringExpense={this.addRecurringExpense} />
				<ProjectionTable />
			</Wrapper>
		)
	}
}

export default Index;