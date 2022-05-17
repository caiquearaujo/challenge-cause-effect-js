import { App } from '../src/main';

beforeEach(() => {
	document.body.innerHTML = '<main id="root"></main>';
});

describe('App', () => {
	it('should create app instance', () => {
		const app = new App('root');

		expect(document.getElementById('root')?.innerHTML).toBe(
			`<section class="list-panel"><ul id="user-list"></ul></section><section id="user-info" class="info-panel"></section>`
		);
	});

	it('should be on DOM', () => {
		const app = new App('root');
		expect(app.isOnDOM()).toBe(true);
	});

	it('should load users', () => {
		const app = new App('root');

		app.load([]);
		expect(app.find(1)).toBeUndefined();

		app.load([
			{
				id: 1,
				name: 'Berti Peery',
				avatar: 'avatar-83b2ad52037bc549abede6a1d4eec950.jpg',
				street: '15274 Sutteridge Center',
				city: 'Vermil',
				state: 'Braga',
				country: 'Portugal',
				phone: '+351 (900) 628-1408',
			},
		]);

		expect(app.find(1)).toStrictEqual({
			id: 1,
			name: 'Berti Peery',
			avatar: 'avatar-83b2ad52037bc549abede6a1d4eec950.jpg',
			street: '15274 Sutteridge Center',
			city: 'Vermil',
			state: 'Braga',
			country: 'Portugal',
			phone: '+351 (900) 628-1408',
		});

		app.load([
			{
				id: 1,
				name: 'Berti Peery',
				avatar: 'avatar-83b2ad52037bc549abede6a1d4eec950.jpg',
				street: '15274 Sutteridge Center',
				city: 'Vermil',
				state: 'Braga',
				country: 'Portugal',
				phone: '+351 (900) 628-1408',
			},
			{
				id: 2,
				name: 'Giffie Lent',
				avatar: 'avatar-78138f779642f97de45b195b01a1d683.jpg',
				street: '3605 Fairfield Terrace',
				city: 'Bombarral',
				state: 'Leiria',
				country: 'Portugal',
				phone: '+351 (513) 754-1388',
			},
		]);

		expect(app.find(1)).not.toBeUndefined();
		expect(app.find(2)).toStrictEqual({
			id: 2,
			name: 'Giffie Lent',
			avatar: 'avatar-78138f779642f97de45b195b01a1d683.jpg',
			street: '3605 Fairfield Terrace',
			city: 'Bombarral',
			state: 'Leiria',
			country: 'Portugal',
			phone: '+351 (513) 754-1388',
		});
	});

	it('should update current clicked user', () => {
		const app = new App('root');

		app.load([
			{
				id: 1,
				name: 'Berti Peery',
				avatar: 'avatar-83b2ad52037bc549abede6a1d4eec950.jpg',
				street: '15274 Sutteridge Center',
				city: 'Vermil',
				state: 'Braga',
				country: 'Portugal',
				phone: '+351 (900) 628-1408',
			},
		]);

		expect(app.getCurrent()).toBeNull();

		const user = document.querySelector('#user-list li') as Element;

		app.onUserClick(user, 1);
		expect(app.getCurrent()).toStrictEqual({ el: user, id: 1 });

		app.onUserClick(user, 1);
		expect(app.getCurrent()).toStrictEqual(null);
	});
});
