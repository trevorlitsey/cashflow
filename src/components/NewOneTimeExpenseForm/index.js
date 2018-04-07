import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { message, Form, Input, InputNumber, DatePicker, Select, Icon, Button } from 'antd';
import moment from 'moment';

import { SubSubTitle } from '../../styles/components';

const Container = styled.div`

	margin-top: 10px;

	& > form {
		display: grid;
		grid-template-columns: 2fr 3fr 1fr 2fr;
		grid-gap: 4px;
		margin-bottom: 10px;
	}
`

const DisplayBlock = styled.div`
	display: block;
`

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
		return message.success('recurring expenses added');
	}

	render() {

		const { startDate, name, amount } = this.state;

		return (
			<Container>
				<SubSubTitle>New one-time income/expense:</SubSubTitle>
				<form onSubmit={this.handleSubmit}>
					<DatePicker onChange={this.handleDateChange} value={moment(startDate)} placeholder="Start date" required />
					<Input onChange={this.handleNameChange} value={name} placeholder="Name" required />
					<DisplayBlock>
						<InputNumber
							value={amount}
							formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							parser={value => value.replace(/\$\s?|(,*)/g, '')}
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