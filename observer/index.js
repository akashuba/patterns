const controlCheckbox = document.getElementById("mainCheckbox");
const addBtn = document.getElementById("addNewObserver");
const container = document.getElementById("observerContainer");


class ObserverList {
	observerList = [];

	add(obj) {
		return this.observerList.push(obj);
	}

	count() {
		return this.observerList.length;
	}

	get(index) {
		if (index > -1 && index < this.observerList.length) {
			return this.observerList[index];
		}
	}

	indexOf(obj, startIndex = 0) {
		var i = startIndex;

		while (i < this.observerList.length) {
			if (this.observerList[i] === obj) {
				return i;
			}
			i++;
		}

		return -1;
	}

	removeAt(index) {
		this.observerList.slice(index, 1)
	}
}

class Subject {
	observers = new ObserverList();

	constructor() {
		this.addObserver = this.addObserver.bind(this);
		this.removeObserver = this.removeObserver.bind(this);
		this.notify = this.notify.bind(this);
	}

	addObserver(observer) {
		this.observers.add(observer)
	}

	removeObserver(observer) {
		this.observers.removeAt(this.observers.indexOf(observer, 0))
	}

	notify(context) {
		const observerCount = this.observers.count();

		for(let i = 0; i <  observerCount; i++) {
			this.observers.get(i).update(context);
		}
	}
}

class Observer {

	constructor() {
		this.update = this.update.bind(this);
	}

	update() {
		
	}
}

function extend(obj, extension) {
	
	for (const key in extension) {
		obj[key] = extension[key];
	}
}

extend(controlCheckbox, new Subject());

controlCheckbox.oninput = function() {
	controlCheckbox.notify(controlCheckbox.value);
}

addBtn.onclick = addNewObserver;

function addNewObserver() {
	const check = document.createElement("input");
	const inputWrapper = document.createElement("div")
	check.type = "text";

	extend(check, new Observer());

	check.update = function(value) {
		this.value = value;
	}

	controlCheckbox.addObserver(check);

	inputWrapper.appendChild(check)
	container.appendChild(inputWrapper);
}
