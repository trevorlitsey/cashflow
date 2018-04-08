import styled from 'styled-components';

export const MasterWrapper = styled.div`
	display: grid;
	grid-auto-flow: row;
`

export const ExpensesWrapper = styled.div`
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

export const Divider = styled.div`
	height: 10px;
	margin: 30px 0;
	border-bottom: 1px solid HSLA(220, 8%, 92%, 1.00);

	@media (min-width: 1000px) {
		display: none;
	}
`