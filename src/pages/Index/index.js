import React from 'react';
import { Button, List } from 'antd';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';

import { Layout } from '../../components';

const data = ['This is a new budget', '2018'];

export default () => (
	<Layout>
		<div
			style={{
				padding: 30,
				maxWidth: 500,
				margin: 'auto',
				textAlign: 'center',
			}}
		>
			<h1>Recently viewed:</h1>
			<List
				bordered
				dataSource={data}
				renderItem={item => (
					<List.Item>
						<a>{item}</a>
					</List.Item>
				)}
			/>
			<Link to={'/' + uniqid()}>
				<Button
					type="primary"
					style={{ width: '100%', margin: '20px auto' }}
					size="large"
				>
					New Budget
				</Button>
			</Link>
		</div>
	</Layout>
);
