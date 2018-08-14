import moment from 'moment';
import { trimOldOneTimeExpenses } from './helpers';

it('trimOldOneTimeExpenses should trim expenses with start dates less than today', () => {
	const oldIdToDelete = 'six';

	const oneTimeExpenses = {
		[oldIdToDelete]: {
			name: 'yayya!!!',
			startDate: moment().subtract(1, 'day'), // minus one day
			amount: -110000,
		},
		two: {
			name: 'check this out',
			startDate: moment().add(1, 'day'), // plus one day
			amount: 11,
		},
	};

	const trimmedExpenses = trimOldOneTimeExpenses({ ...oneTimeExpenses });

	// one less than before
	expect(Object.keys(trimmedExpenses).length).toEqual(
		Object.keys(oneTimeExpenses).length - 1
	);

	// should be gone
	expect(trimmedExpenses[oldIdToDelete]).toBeUndefined();
});
