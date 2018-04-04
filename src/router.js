import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles';

import Index from './pages/Index';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Index} />
		</Switch>
	</BrowserRouter>
)

export default Router;