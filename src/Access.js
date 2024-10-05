export default class Access {
	constructor(name, ip, access_time) {
		this.name = name;
		this.ip = ip;
		this.access_time = new Date(access_time);
	}

	static accessList = [];
	static sorting = 'name';
	static sorting_order = 'asc';

	static createList(data) {
		this.accessList = data.map((access) => {
			return new Access(access.name, access.ip, access.access_time);
		});
	}

	static sortList() {
		this.accessList.sort((a, b) => {
			switch (this.sorting_order) {
				case 'asc':
					if (this.sorting === 'access_time') {
						return a[this.sorting] - b[this.sorting];
					}
					return a[this.sorting].localeCompare(b[this.sorting]);
				case 'desc':
					if (this.sorting === 'access_time') {
						return b[this.sorting] - a[this.sorting];
					}
					return b[this.sorting].localeCompare(a[this.sorting]);
				default:
					return 0;
			}
		});
	}

	static changeSorting(sorting) {
		if (this.sorting === sorting) {
			this.sorting_order = this.sorting_order === 'asc' ? 'desc' : 'asc';
		} else {
			this.sorting = sorting;
			this.sorting_order = 'asc';
		}
	}
}
