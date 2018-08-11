import React from 'react';
import { render } from 'enzyme';

import Router from './Router';

test('<Router /> should render', () => {
	expect(render(<Router />)).toMatchSnapshot();
});
