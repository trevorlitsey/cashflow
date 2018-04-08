import styled from 'styled-components';

export const UnOrderedList = styled.ul`
	
	padding: 0;
	display: block;
	
	li {
		margin: 10px 0;
		padding: 0 10px 10px;
		display: grid;
		grid-template-columns: 4fr 1fr;
		border-bottom: 1px solid HSLA(220, 8%, 92%, 1.00);
	}

	p {
		margin: 5px;
	}

	a {
		margin: 0 4px;
	}

	.right {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		& > span {
			cursor: pointer;
			color: HSLA(220,0%,70%,1.00);
		}
	}

	.title {
		font-weight: 600;
	}
`