import Entry from '@/sample/people';

type TUser = {
	id: number;
	name: string;
	street: string;
	city: string;
	state?: string;
	country: string;
	telephone: string;
};

class ListPanel {
	private _users;
	private _onClick;

	constructor(
		users: Array<Pick<TUser, 'id' | 'name'>>,
		onClick: (id: number) => void
	) {
		this._users = users;
		this._onClick = onClick;

		this.create();
		this.bind();
	}

	public create() {
		const wrapper = document.createElement('section');
		wrapper.className = 'list-panel';

		const ul = document.createElement('ul');

		this._users.forEach((u, idx) => {
			const user = document.createElement('li');

			user.className = 'user';
			user.id = `user-item-${u.id}`;
			user.textContent = u.name;

			user.setAttribute('data-user-index', idx.toString());

			ul.appendChild(user);
		});

		wrapper.appendChild(ul);
		document.getElementById('root')?.appendChild(wrapper);
	}

	public bind() {
		document.addEventListener('click', (e: any) => {
			if (!e.target.hasAttribute('data-user-index')) return;

			this._onClick(parseInt(e.target.getAttribute('data-user-index')));
		});
	}
}

class InfoPanel {
	private _user?: TUser;
	private _wrapper: HTMLElement;

	constructor() {
		const wrapper = document.createElement('section');
		wrapper.className = 'info-panel';

		this._wrapper = wrapper;
		document.getElementById('root')?.appendChild(wrapper);
	}

	public changeUser(user: TUser) {
		this._user = user;
		this.flush();
		this.render();
	}

	public clearUser() {
		this._user = undefined;
		this.flush();
	}

	public render() {
		if (!this._user) return;

		Object.keys(this._user).forEach(k => {
			const wrapper = document.createElement('div');
			wrapper.className = 'column';

			const label = document.createElement('span');
			label.className = 'label';
			label.textContent = k;

			const value = document.createElement('span');
			value.className = 'value';
			// @ts-ignore
			value.textContent = `${this._user[k]}`;

			wrapper.appendChild(label);
			wrapper.appendChild(value);

			this._wrapper.appendChild(wrapper);
		});
	}

	public flush() {
		this._wrapper.replaceChildren();
	}
}

class App {
	private _currentUser: number | null = null;
	private _infoPanel;

	constructor() {
		const root = document.createElement('div');
		root.id = 'root';

		document.querySelector('body')?.appendChild(root);

		new ListPanel(Entry, this.onClick.bind(this));
		this._infoPanel = new InfoPanel();
	}

	public onClick(id: number) {
		if (!Entry[id]) return;

		if (id === this._currentUser) {
			this._infoPanel.clearUser();
			this._currentUser = null;
			return;
		}

		this._currentUser = id;
		this._infoPanel.changeUser(Entry[id]);
	}
}

document.addEventListener('DOMContentLoaded', () => new App());
