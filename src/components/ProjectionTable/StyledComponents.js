import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;

	table {
		width: 100%;
	}

	tr {
		border-bottom: 1px solid HSLA(225, 9%, 91%, 1.00);
	}

	td:last-child {
		width: 10px;
		color: HSLA(220, 0%, 70%, 1.00);
	}
	
	th, td {
		padding: 8px;
	}
`

export const Controls = styled.div`

	display: flex;

	& > * {
		display: block;
		margin: 10px;
	}
`