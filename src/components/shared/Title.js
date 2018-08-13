import React, { Component } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import db from '../../db';

const Wrapper = styled.div`
	max-width: 200px;
	text-align: center;
	margin: auto;

	form button {
		margin-top: 6px;
	}
`;

export default class Title extends Component {
	state = {
		title: this.props.title,
		isEdit: false,
	};

	componentDidUpdate = prevProps => {
		if (prevProps.title !== this.props.title) {
			this.setState({ title: this.props.title });
		}
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSubmit(this.state.title);
		this.setState({ isEdit: false });
	};

	render() {
		const { isEdit, title } = this.state;

		return (
			<Wrapper>
				{isEdit ? (
					<form onSubmit={this.handleSubmit}>
						<Input
							value={title}
							onChange={e => this.setState({ title: e.target.value })}
						/>
						<Button htmlType="submit" className="full-width" type="primary">
							Save
						</Button>
						<Button
							htmlType="reset"
							onClick={() => this.setState({ isEdit: false })}
							className="full-width"
						>
							Cancel
						</Button>
					</form>
				) : (
					<a onClick={() => this.setState({ isEdit: true })}>
						<h2>{title}</h2>
					</a>
				)}
			</Wrapper>
		);
	}
}
