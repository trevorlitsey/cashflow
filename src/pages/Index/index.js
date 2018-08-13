import React from 'react';
import { Button, List, Icon, Tooltip } from 'antd';
import uniqid from 'uniqid';
import { Link } from 'react-router-dom';

import { Layout } from '../../components';
import { render } from '../../../node_modules/react-testing-library';

export default class Index extends React.PureComponent {
	state = {
		recentlyViewed: null,
	};

	componentDidMount = () => {
		const localStorageRef = localStorage.getItem('recentlyViewed');

		if (localStorageRef) {
			const recentlyViewed = JSON.parse(localStorageRef);
			this.setState({ recentlyViewed });
		}
	};

	render() {
		const { recentlyViewed } = this.state;

		return (
			<Layout>
				<div
					style={{
						padding: 30,
						maxWidth: 500,
						margin: 'auto',
						textAlign: 'center',
					}}
				>
					<h2>Recently viewed:</h2>
					{recentlyViewed ? (
						<List
							bordered
							dataSource={Object.values(recentlyViewed)
								.sort((a, b) => b.lastViewed - a.lastViewed)
								.map(item => ({
									id: item.id,
									title: item.title,
									lastViewed: item.lastViewed,
								}))}
							renderItem={item => (
								<List.Item>
									<List.Item.Meta
										title={
											<Link to={'/' + item.id}>
												<a>{item.id}</a>
											</Link>
										}
										description={
											<div>
												<p>
													<Tooltip title="Last viewed">
														<Icon type="clock-circle-o" />
													</Tooltip>
													{' ' + new Date(item.lastViewed).toLocaleString()}
												</p>
											</div>
										}
									/>
								</List.Item>
							)}
						/>
					) : (
						<p>nothing here!</p>
					)}
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
	}
}
