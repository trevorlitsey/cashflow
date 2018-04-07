import { trimOldOneTimeExpenses } from './helpers';

it('trimOldOneTimeExpenses should trim expenses with start dates less than today', () => {

	const idToDelete = 'six'

	const oneTimeExpenses = {
		one: {
			name: 'yayya!!!',
			startDate: 1523089061622, // April 7
			amount: -110000
		},
		[idToDelete]: {
			name: 'check this out',
			startDate: 1234565432,
			amount: 11,
		}
	}

	const today = 1523060261622; // April 6, 2018
	const trimmedExpenses = trimOldOneTimeExpenses({ ...oneTimeExpenses }, today);

	// one less than before
	expect(Object.keys(trimmedExpenses).length).toEqual(Object.keys(oneTimeExpenses).length - 1);

	// should be gone
	expect(trimmedExpenses[idToDelete]).toBeUndefined();

});