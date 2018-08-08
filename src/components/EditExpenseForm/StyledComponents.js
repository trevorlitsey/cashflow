import styled from 'styled-components';

export const Container = styled.div`
	& > form {
		width: 100%;
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

	.interval-label {
		display: ${props => (props.isRecurring ? 'block' : 'none')};
	}

	.interval-select > * {
		display: ${props => (props.isRecurring ? 'inline-block' : 'none')};
		margin-bottom: 6px;
		max-width: 100px;
	}
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
`;

export const SwitchContainer = styled.div`
	width: 100px;
`;
