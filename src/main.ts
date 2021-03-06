import Entry from '@/sample/people';

export type TUser = {
	id: number;
	avatar: string;
	name: string;
	street: string;
	city: string;
	state: string;
	country: string;
	phone: string;
};

export class ListPanel {
	private _onClick: (el: Element, id: number) => void;
	private _wrapper: HTMLElement;

	constructor(handler: (el: Element, id: number) => void) {
		const wrapper = document.getElementById('user-list');

		if (!wrapper) throw new Error('User info wrapper must be on DOM.');
		this._wrapper = wrapper;

		this._onClick = handler;
		this.bind();
	}

	public bind() {
		document.addEventListener('click', (e: any) => {
			this.click(e.target);
		});
	}

	public click(el: Element) {
		const parent = el.closest('.user');

		if (parent) {
			const id = parseInt(parent.getAttribute('data-id') ?? '0');
			this._onClick(parent, id);
		}
	}

	public render(users: Array<Pick<TUser, 'id' | 'name' | 'avatar'>>) {
		if (users.length === 0) return;

		this._wrapper.innerHTML += users
			.map(user => {
				return `
			<li class="user" data-id="${user.id}" data-name="${user.name}">
				<img src="/avatars/${user.avatar}"/>
				<span>${user.name}</span>
			</li>`;
			})
			.join('');
	}

	public wrapper(): HTMLElement {
		return this._wrapper;
	}

	public static template(): string {
		return `<section class="list-panel"><ul id="user-list"></ul></section>`;
	}
}

export class InfoPanel {
	private _user?: TUser;
	private _wrapper: HTMLElement;

	constructor() {
		const wrapper = document.getElementById('user-info');
		if (!wrapper) throw new Error('User info wrapper must be on DOM.');
		this._wrapper = wrapper;
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

		let html = `
			<div class="row header">
				<img src="/avatars/${this._user.avatar}" />
				${this._createColumn('name', this._user.name)}
			</div>
			<div class="row">
		`;

		['street', 'city', 'state', 'country', 'phone'].forEach(k => {
			// @ts-ignore
			html += this._createColumn(k, this._user[k]);
		});

		html += `</div>`;
		this._wrapper.innerHTML = html;
	}

	public flush() {
		this._wrapper.replaceChildren();
	}

	private _createColumn(k: string, v: string): string {
		return `
			<div class="column ${k}">
				<span class="label">${k}</span>
				<span class="value">${v}</span>
			</div>
		`;
	}

	public wrapper(): HTMLElement {
		return this._wrapper;
	}

	public static template(): string {
		return `<section id="user-info" class="info-panel"></section>`;
	}
}

export class App {
	private _rendered: boolean = false;

	private _id: string;
	private _users: Array<TUser>;
	private _curr: { el: Element; id: number } | null = null;

	private _list;
	private _info;

	constructor(id: string) {
		this._id = id;
		this._users = [];

		this._create();

		this._list = new ListPanel(this.onUserClick.bind(this));
		this._info = new InfoPanel();
	}

	public load(users: Array<TUser>): void {
		if (users.length === 0) return;

		this._users = this._users.concat(users);
		this._list.render(users);
	}

	public find(id: number): TUser | undefined {
		return this._users.find(u => u.id === id);
	}

	public onUserClick(el: Element, id: number) {
		const user = this.find(id);

		if (!user) return;

		if (this._curr) {
			this._curr.el.classList.remove('selected');

			if (id === this._curr.id) {
				this._info.clearUser();
				this._curr = null;

				return;
			}
		}

		el.classList.add('selected');
		this._curr = { id, el };
		this._info.changeUser(user);
	}

	public getCurrent() {
		return this._curr;
	}

	public isOnDOM() {
		return this._rendered;
	}

	private _create(): void {
		const root = document.getElementById(this._id);

		if (!root)
			throw new Error(
				`Application wrapper id as '${this._id}' not found...`
			);

		root.innerHTML = `${ListPanel.template()}${InfoPanel.template()}`;
		this._rendered = true;
	}
}

export const start = () =>
	document.addEventListener('DOMContentLoaded', () => {
		const app = new App('root');
		app.load(Entry);
	});
