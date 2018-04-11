import React from 'react';
import { func } from 'prop-types';
import { message, Form, Input, InputNumber, DatePicker, Select, Icon, Button } from 'antd';
import moment from 'moment';

import { Container, DisplayBlock } from './StyledComponents';
import { SubSubTitle } from '../../styles/SharedComponents';

import { formatter, parser } from '../shared/helpers';

const blankExpense = {
	name: '',
	startDate: moment().valueOf(),
	amount: 100,
}

class NewOneTimeExpenseForm extends React.Component {

	static propTypes = {
		addOneTimeExpense: func.isRequired,
	}

	state = {
		...blankExpense,
	}

	handleNameChange = (e) => {
		this.setState({ name: e.target.value })
	}

	handleDateChange = (e) => {
		this.setState({ startDate: e.valueOf() });
	}

	handleAmountChange = (e) => {
		this.setState({ amount: e });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { startDate, name, amount } = this.state;

		if (!startDate || !name || !amount) {
			return message.error('all fields are required')
		}

		// all good
		this.props.addOneTimeExpense({ startDate, name, amount })
		this.setState({ ...blankExpense });
		return message.success('one-time income/expense added');
	}

	render() {

		const { startDate, name, amount } = this.state;

		return (
			<Container>
				<SubSubTitle>Add one-time income/expense:</SubSubTitle>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="date">Date:</label>
					<DatePicker onChange={this.handleDateChange} value={moment(startDate)} placeholder="Start date" required />
					<label htmlFor="name">Name:</label>
					<Input onChange={this.handleNameChange} value={name} placeholder="Name" required />
					<label htmlFor="amount">Amount (+/-):</label>
					<DisplayBlock>
						<InputNumber
							value={amount}
							formatter={formatter}
							parser={parser}
							onChange={this.handleAmountChange}
							required
						/>
					</DisplayBlock>
					<Button htmlType="submit">submit</Button>
				</form>
			</Container>
		)
	}
}

export default NewOneTimeExpenseForm;