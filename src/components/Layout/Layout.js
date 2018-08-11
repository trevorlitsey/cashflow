import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';

import Footer from '../Footer/Footer';

export default ({ children }) => {
	const { Header, Content, Footer } = Layout;
	return (
		<div>
			<Link to="/">
				<h1
					style={{
						fontSize: 24,
						padding: 4,
						marginBottom: 40,
						borderBottom: '1px solid rgba(0,0,0,.1)',
						textAlign: 'center',
					}}
				>
					cashflow-calc
				</h1>
			</Link>
			<div style={{ padding: 10 }}>{children}</div>
		</div>
	);
};
