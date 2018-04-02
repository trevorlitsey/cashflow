import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles';

import Index from './pages/Index';
import NotFound from './pages/NotFound';

const Root = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Index} />
		</Switch>
	</BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'));