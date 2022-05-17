import { App, InfoPanel } from '../src/main';

beforeEach(() => {
	document.body.innerHTML = '<main id="root"></main>';
});

describe('ListPanel', () => {
	it('should get list panel template', () => {
		expect(InfoPanel.template()).toBe(
			`<section id="user-info" class="info-panel"></section>`
		);
	});

	it('should thrown an error if app is not on DOM', () => {
		expect(() => new InfoPanel()).toThrow(
			new Error('User info wrapper must be on DOM.')
		);
	});

	it('should get the user info wrapper', () => {
		const app = new App('root');
		const panel = new InfoPanel();

		expect(panel.wrapper()).toBeInstanceOf(HTMLElement);
	});

	it('should not render', () => {
		const app = new App('root');
		const panel = new InfoPanel();

		panel.render();
		expect(panel.wrapper().children.length).toBe(0);
	});

	it('should render when change user', () => {
		const app = new App('root');
		const panel = new InfoPanel();

		panel.changeUser({
			id: 1,
			name: 'Berti Peery',
			avatar: 'avatar-83b2ad52037bc549abede6a1d4eec950.jpg',
			street: '15274 Sutteridge Center',
			city: 'Vermil',
			state: 'Braga',
			country: 'Portugal',
			phone: '+351 (900) 628-1408',
		});

		expect(panel.wrapper().children.length).toBe(2);
	});

	it('should not render when clear user', () => {
		const app = new App('root');
		const panel = new InfoPanel();

		panel.changeUser({
			id: 1,
			name: 'Berti Peery',
			avatar: 'avatar-83b2ad52037bc549abede6a1d4eec950.jpg',
			street: '15274 Sutteridge Center',
			city: 'Vermil',
			state: 'Braga',
			country: 'Portugal',
			phone: '+351 (900) 628-1408',
		});
		panel.clearUser();

		expect(panel.wrapper().children.length).toBe(0);
	});
});
