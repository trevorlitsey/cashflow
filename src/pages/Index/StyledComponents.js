import styled from 'styled-components';

export const MasterWrapper = styled.div`
	display: grid;
	grid-auto-flow: row;
	padding: 0px 20px 20px 20px;
	max-width: 800px;
	margin: auto;

	& > h2 {
		margin-bottom: 20px;
	}
`

export const ExpensesWrapper = styled.div`
	min-height: 94vh;
`