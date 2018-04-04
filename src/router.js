import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles';

import Index from './pages/Index';

const Root = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Index} />
		</Switch>
	</BrowserRouter>
)

document.body.innerHTML += `<div id="root"></div>`

ReactDOM.render(<Root />, document.getElementById('root'));