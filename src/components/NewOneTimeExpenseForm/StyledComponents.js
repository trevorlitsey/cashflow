import styled from 'styled-components';

export const Container = styled.div`

	padding: 30px;
	margin-top: 10px;
	border: 1px solid HSLA(220, 8%, 92%, 1.00);
	border-radius: 10px;

	& > form {
		display: grid;
		grid-template-columns: 2fr 3fr 1fr 2fr;
		grid-gap: 4px;
		margin-bottom: 10px;
	}
`

export const DisplayBlock = styled.div`
	display: block;
`