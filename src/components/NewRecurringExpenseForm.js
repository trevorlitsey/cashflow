import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { message, Form, Input, InputNumber, DatePicker, Select, Icon, Button } from 'antd';
import moment from 'moment';

import { SubSubTitle } from '../styles/components';

const Container = styled.div`

	margin-top: 20px;

	& > form > * {
		display: block;
		margin-bottom: 10px;
	}
`

const IntervalSelect = styled.div`
	
	& > * {
		margin-bottom: 6px;
		max-width: 100px;
	}
`

const blankExpense = {
	name: '',
	startDate: moment(),
	amount: 100,
	frequency: 2,
	interval: 'days',
}

class NewRecurringExpenseForm extends React.Component {

	static propTypes = {
		addRecurringExpense: func.isRequired,
	}

	state = {
		...blankExpense,
	}

	handleNameChange = (e) => {
		this.setState({ name: e.target.value })
	}

	handleDateChange = (e) => {
		this.setState({ startDate: e });
	}

	handleAmountChange = (e) => {
		this.setState({ amount: e });
	}

	handleFrequencyChange = (e) => {
		this.setState({ frequency: e })
	}

	handleIntervalChange = (e) => {
		this.setState({ interval: e })
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { startDate, name, amount, frequency, interval } = this.state;

		if (!startDate || !name || !amount || !frequency || !interval) {
			return message.error('all fields are required')
		}

		// all good
		this.props.addRecurringExpense({ startDate, name, amount, frequency, interval })
		this.setState({ ...blankExpense });
		return message.success('recurring expenses added');
	}

	render() {

		const { startDate, name, amount, frequency, interval } = this.state;

		return (
			<Container>
				<SubSubTitle>Add recurring income/expense:</SubSubTitle>
				<form onSubmit={this.handleSubmit}>
					<label htmlFor="name">Name:</label>
					<Input onChange={this.handleNameChange} value={name} placeholder="Name of income/expense ..." required />
					<label htmlFor="name">Start date:</label>
					<DatePicker onChange={this.handleDateChange} value={startDate} placeholder="Start date" required />
					<label htmlFor="name">Amount (+/-):</label>
					<InputNumber
						value={amount}
						formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
						parser={value => value.replace(/\$\s?|(,*)/g, '')}
						onChange={this.handleAmountChange}
						required
					/>
					<label htmlFor="frequency">Repeat every:</label>
					<IntervalSelect>
						<InputNumber min={1} max={10} value={frequency} onChange={this.handleFrequencyChange} required />
						<Select onChange={this.handleIntervalChange} value={interval} style={{ marginLeft: '6px' }} required>
							<Select.Option value="days">Day(s)</Select.Option>
							<Select.Option value="weeks">Weeks(s)</Select.Option>
							<Select.Option value="months">Month(s)</Select.Option>
						</Select>
					</IntervalSelect>
					<Button htmlType="submit">submit</Button>
				</form>
			</Container>
		)
	}
}

export default NewRecurringExpenseForm;