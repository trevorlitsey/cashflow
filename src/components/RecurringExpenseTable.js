import React from 'react';
import { array } from 'prop-types'
import { format } from 'date-fns';
import { List, Avatar } from 'antd';

class RecurringExpenseTable extends React.Component {

	static propTypes = {
		recurringExpenses: array.isRequired,
	}

	render() {

		const { recurringExpenses } = this.props

		return (
			<List
				itemLayout="horizontal"
				dataSource={recurringExpenses || []}
				renderItem={item => (
					<List.Item actions={[<a>edit</a>, <a>delete</a>]}>
						<List.Item.Meta
							avatar={<Avatar icon="calendar" />}
							title={<a href="https://ant.design">{item.name}</a>}
							description={`every ${item.frequency} ${item.interval} starting on ${format(item.startDate, 'MMMM D, YYYY')}`}
						/>
					</List.Item>
				)}
			/>
		)
	}
}

export default RecurringExpenseTable;