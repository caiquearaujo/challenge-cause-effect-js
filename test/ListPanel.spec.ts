import { App, ListPanel } from '../src/main';

beforeEach(() => {
	document.body.innerHTML = '<main id="root"></main>';
});

describe('ListPanel', () => {
	it('should get list panel template', () => {
		expect(ListPanel.template()).toBe(
			`<section class="list-panel"><ul id="user-list"></ul></section>`
		);
	});

	it('should thrown an error if app is not on DOM', () => {
		expect(() => new ListPanel((el, id) => true)).toThrow(
			new Error('User info wrapper must be on DOM.')
		);
	});

	it('should get the user list wrapper', () => {
		const app = new App('root');
		const panel = new ListPanel((el, id) => true);

		expect(panel.wrapper()).toBeInstanceOf(HTMLUListElement);
	});

	it('should not render when users is empty', () => {
		const app = new App('root');
		const panel = new ListPanel((el, id) => true);

		panel.render([]);
		expect(panel.wrapper().children.length).toBe(0);
	});

	it('should render two users', () => {
		const app = new App('root');
		const panel = new ListPanel((el, id) => true);

		const users = [
			{
				id: 1,
				name: 'Berti Peery',
				avatar: 'avatar-83b2ad52037bc549abede6a1d4eec950.jpg',
			},
			{
				id: 2,
				name: 'Giffie Lent',
				avatar: 'avatar-78138f779642f97de45b195b01a1d683.jpg',
			},
		];

		panel.render(users);

		expect(panel.wrapper().children.length).toBe(2);

		for (let i = 0; i < panel.wrapper().children.length; i++) {
			const el = panel.wrapper().children[i];

			expect(el.getAttribute('data-id')).toBe(users[i].id.toString());
			expect(el.getAttribute('data-name')).toBe(users[i].name);
			expect(el.querySelector('img')?.getAttribute('src')).toBe(
				`/avatars/${users[i].avatar}`
			);
			expect(el.querySelector('span')?.textContent).toBe(users[i].name);
		}
	});
});
