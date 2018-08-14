import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import CashFlow from './pages/CashFlow';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Index} />
			<Route exact path="/404" component={NotFound} />
			<Route exact path="/:id" component={CashFlow} />
		</Switch>
	</BrowserRouter>
);

export default Router;
