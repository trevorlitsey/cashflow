import { convertObjToArr } from './helpers';

const obj = {
	one: {
		one: 'test',
		two: {
			on: 'look',
			over: 'here'
		}
	},
	two: {
		another: 1,
		oh: 'ya'
	}
}

const arr = [
	{
		one: 'test',
		two: {
			on: 'look',
			over: 'here'
		}
	},
	{
		another: 1,
		oh: 'ya'
	}
]

it('converObjToArr should covert object to array one level deep', () => {
	expect(convertObjToArr(obj)).toEqual(arr);
})