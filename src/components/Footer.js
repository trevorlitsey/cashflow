import React from 'react';
import styled from 'styled-components';

const P = styled.p`
	text-align: center;
	color: grey;
`

const Footer = () => (
	<div>
		<P>Expense data stored in local storage</P>
	</div>
)

export default Footer;