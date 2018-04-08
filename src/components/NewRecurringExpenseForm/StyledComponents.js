import styled from 'styled-components';

export const Container = styled.div`

	padding: 30px;
	margin-top: 20px;
	border: 1px solid HSLA(220, 8%, 92%, 1.00);
	border-radius: 10px;

	& > form {
		display: grid;
		grid-template-columns: 1fr 3fr;
	}

	& > form > button {
		grid-column: 1 / -1;
	}

	& > form > * {
		display: block;
		margin-bottom: 10px;
	}
`

export const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr

`

export const IntervalSelect = styled.div`
	
	& > * {
		margin-bottom: 6px;
		max-width: 100px;
	}
`