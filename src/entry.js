import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';

import 'normalize.css/normalize.css';
import 'antd/dist/antd.css';
import './styles/styles.css';

document.body.innerHTML = `<div id="root"></div>`;
ReactDOM.render(<Router />, document.getElementById('root'));

if (module.hot) {
	module.hot.accept('./Router.js', function() {
		const NextApp = require('./Router').default;
		ReactDOM.render(<NextApp />, document.getElementById('root'));
	});
}
