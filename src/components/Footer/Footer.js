import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const P = styled.p`
	margin-top: 20px;
	text-align: center;
	color: grey;

	a {
		color: inherit;
	}
`;

const Footer = () => (
	<div>
		<P>
			<a href="https://github.com/trevorlitsey/cashflow-calc" target="blank">
				github
			</a>{' '}
		</P>
	</div>
);

export default Footer;
