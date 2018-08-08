import React from 'react';
import { func } from 'prop-types';
import {
	message,
	Form,
	Input,
	InputNumber,
	DatePicker,
	Select,
	Icon,
	Button,
	Switch,
	Modal,
} from 'antd';
import moment from 'moment';

import {
	Container,
	Grid,
	IntervalSelect,
	SwitchContainer,
} from './StyledComponents';
import { SubSubTitle } from '../../styles/SharedComponents';

import { formatter, parser } from '../shared/helpers';

const reset = {
	name: '',
	startDate: Date.now(),
	amount: 100,
	frequency: 1,
	interval: 'months',
	isRecurring: false,
};

class NewRecurringExpenseForm extends React.Component {
	static propTypes = {
		addExpense: func.isRequired,
	};

	state = {
		...reset,
	};

	handleCancel = () => {
		// TODO
	};

	handleSubmit = e => {
		e.preventDefault();
		const {
			startDate,
			name,
			amount,
			frequency,
			interval,
			isRecurring,
		} = this.state;

		if (!startDate || !name || !amount) {
			return message.error('all fields are required');
		}

		if (isRecurring && (!frequency || !interval)) {
			return message.error(
				'frequency and interval are required to set recurring expense'
			);
		}

		// all good
		const newExpense = {
			startDate,
			name,
			amount,
			frequency: isRecurring && frequency,
			interval: isRecurring && interval,
		};
		this.props.addExpense(newExpense);
		this.setState(reset);
		this.props.toggle();
		return message.success('income/expenses added');
	};

	render() {
		const {
			startDate,
			name,
			amount,
			frequency,
			interval,
			isRecurring,
		} = this.state;

		const { toggle, on } = this.props;

		return (
			<Modal
				title="New Income/Expense"
				visible={on}
				onCancel={toggle}
				footer={[
					<Button key="back" onClick={toggle}>
						Cancel
					</Button>,
					<Button key="submit" type="primary" onClick={this.handleSubmit}>
						Submit
					</Button>,
				]}
			>
				<Container isRecurring={isRecurring}>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor="name">Name:</label>
						<Input
							data-test="name"
							onChange={e =>
								this.setState({
									name: e.target.value,
								})
							}
							value={name}
							placeholder="Name of income/expense ..."
							required
						/>
						<label htmlFor="name">Start date:</label>
						<DatePicker
							data-test="date"
							onChange={e =>
								this.setState({
									startDate: e.valueOf(),
								})
							}
							value={moment(startDate)}
							placeholder="Start date"
							required
						/>
						<label htmlFor="name">Amount (+/-):</label>
						<InputNumber
							data-test="amount"
							onChange={amount => this.setState({ amount })}
							value={amount}
							formatter={formatter}
							parser={parser}
							required
						/>
						<label htmlFor="name">Is recurring:</label>
						<SwitchContainer>
							<Switch
								onChange={isRecurring =>
									this.setState({
										isRecurring,
									})
								}
								checked={isRecurring}
							/>
						</SwitchContainer>
						<label htmlFor="frequency" className="interval-label">
							Repeat every:
						</label>
						<div className="interval-select">
							<InputNumber
								data-test="frequency"
								onChange={frequency => this.setState({ frequency })}
								min={1}
								max={10}
								value={frequency}
								required
							/>
							<Select
								data-test="interval"
								onChange={interval => this.setState({ interval })}
								value={interval}
								style={{ marginLeft: '6px' }}
								required
							>
								<Select.Option value="days">Day(s)</Select.Option>
								<Select.Option value="weeks">Weeks(s)</Select.Option>
								<Select.Option value="months">Month(s)</Select.Option>
							</Select>
							<button type="submit" style={{ display: 'none' }} />
						</div>
					</form>
				</Container>
			</Modal>
		);
	}
}

export default NewRecurringExpenseForm;
