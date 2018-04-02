import React from 'react';
import style from 'styled-components';

import { SubTitle } from '../styles/components';

const Container = style.div`
	width: 100%;

	table {
		width: 100%;
	}

	tr {
		border-bottom: 1px solid HSLA(225, 9%, 91%, 1.00);
	}
	
	th, td {
		padding: 8px;
	}

`

class ProjectionTable extends React.Component {
	render() {
		return (
			<Container>
				<SubTitle>Cashflow:</SubTitle>
				<table>
					<thead>
						<tr>
							<th>Date</th>
							<th>Expense</th>
							<th>Income</th>
							<th>Cash</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>April 2, 2018</td>
							<td>-$10,000</td>
							<td></td>
							<td>$40,000</td>
						</tr>
					</tbody>
				</table>
			</Container>
		)
	}
}

export default ProjectionTable;