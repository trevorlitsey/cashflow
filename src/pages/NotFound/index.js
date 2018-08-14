import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { Layout } from '../../components';

const Wrapper = styled.div`
	margin: 0 20px;
	text-align: center;
	font-size: 22px;
`;

export default () => (
	<Layout>
		<Wrapper>
			<h1>404</h1>
			<p>Sorry! The page you are looking for could not be found.</p>
			<small>
				<Link to="/">Go back</Link>
			</small>
		</Wrapper>
	</Layout>
);
