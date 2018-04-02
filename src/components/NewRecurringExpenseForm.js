import React from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { message, Form, Input, InputNumber, DatePicker, Select, Icon, Button } from 'antd';

import { SubSubTitle } from '../styles/components';

const Container = styled.div`

	margin-top: 20px;

	& > form > * {
		display: block;
		margin-bottom: 10px;
	}

`

const IntervalSelect = styled.div`
	display: flex;
	& > * {
		max-width: 100px;
	}
`

class NewRecurringExpenseForm extends React.Component {

	static propTypes = {
		addRecurringExpense: func.isRequired,
	}

	state = {
		name: '',
		startDate: null,
		frequency: 2,
		interval: 'days',
	}

	handleNameChange = (e) => {
		this.setState({ name: e.target.value })
	}

	handleDateChange = (e) => {
		this.setState({ startDate: e.valueOf() });
	}

	handleFrequencyChange = (e) => {
		this.setState({ frequency: e })
	}

	handleIntervalChange = (e) => {
		this.setState({ interval: e })
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { startDate, name, frequency, interval } = this.state;
		console.log({ startDate, name, frequency, interval });
		if (!startDate || !name || !frequency || !interval) {
			return message.error('all fields are required')
		}
		this.props.addRecurringExpense({ startDate, name, frequency, interval })
	}

	render() {

		const { startDate, name, frequency, interval } = this.state;

		return (
			<Container>
				<SubSubTitle>Add recurring expense:</SubSubTitle>
				<form onSubmit={this.handleSubmit}>
					<Input onChange={this.handleNameChange} value={name} placeholder="Name" required />
					<DatePicker onChange={this.handleDateChange} placeholder="Start date" required />
					<label htmlFor="frequency">Repeat every:</label>
					<IntervalSelect>
						<InputNumber min={1} max={10} value={frequency} onChange={this.handleFrequencyChange} required />
						<Select onChange={this.handleIntervalChange} value={interval} style={{ marginLeft: '6px' }} required>
							<Select.Option value="days">Day(s)</Select.Option>
							<Select.Option value="weeks">Weeks(s)</Select.Option>
							<Select.Option value="months">Month(s)</Select.Option>
						</Select>
					</IntervalSelect>
					<Button htmlType="submit">Add recurring expense</Button>
				</form>
			</Container>
		)
	}
}

export default NewRecurringExpenseForm;