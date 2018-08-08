import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	margin-bottom: 40px;

	table {
		width: 100%;
	}

	th {
		border-bottom: 1px solid HSLA(225, 9%, 91%, 1);
	}

	tr:nth-child(even) {
		background: HSLA(211, 100%, 70%, 0.08);
	}

	td:last-child {
		width: 10px;
		color: HSLA(220, 0%, 70%, 1);
	}

	th,
	td {
		padding: 8px;
	}
`;

export const Controls = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin-bottom: 10px;
	overflow-x: scroll;

	& > * {
		display: block;
		margin: 10px;
	}

	@media (max-width: 500px) {
		display: grid;

		& > * {
			display: grid;
			grid-template-columns: 1fr 3fr;
			margin: 10px;
		}
	}
`;

export const TableContainer = styled.div`
	overflow-x: scroll;
`;
