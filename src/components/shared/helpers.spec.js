import { formatter, parser } from './helpers';

it('formatter should format number into currency string', () => {

	const value = 45678;
	expect(formatter(value)).toEqual('$ 45,678');

	const anotherValue = 4763.45;
	expect(formatter(anotherValue)).toEqual('$ 4,763.45');

})

it('parser should parse currency string into number', () => {
	const value = '$ 45,678';
	expect(parser(value)).toBe('45678');

	const anotherValue = '$ 4,763.45';
	expect(parser(anotherValue)).toBe('4763.45');

})