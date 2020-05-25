const controlCheckbox = document.getElementById("mainCheckbox");
const addBtn = document.getElementById("addNewSubscriber");
const container = document.getElementById("subscriberContainer");
const pubSubStore = {};

(function (pubSubStore) {
	const topics = {};
	let subUid = -1;

	pubSubStore.publish = function (topic, args) {
		if (!topics[topic]) {
			return false;
		}

		const subscribers = topics[topic]
		let len = subscribers ? subscribers.length : 0;

		while (len--) {
			subscribers[len].func(topic, args)
		}

		return this;
	}

	pubSubStore.subscribe = function (topic, func) {
		const token = (++subUid).toString();

		if (!topics[topic]) {
			topics[topic] = [];
		}
		topics[topic].push({
			token,
			func,
		})

		return token;
	}

	pubSubStore.unsubscribe = function (token) {
		for (var m in topics) {
			if (topics[m]) {				
				for (var i = 0; i < topics[m].length; i++) {
					if (topics[m][i].token === token) {
						topics[m].splice(i, 1);
						return token;
					}

				}
			}
		}

		return this;
	}

	pubSubStore.getTopics = function() {
		return topics;
	}

}(pubSubStore));

messageLogger = function (topics, data) {
	console.log("topic: ", topics + "data: ", data)
};

const subscription = pubSubStore.subscribe("inbox/newMessage", messageLogger);

addBtn.onclick = addNewSubscriber;

controlCheckbox.oninput = function () {
	pubSubStore.publish("inbox/newMessage", this.value)
}

function updateFunc (topic, value) {
	this.value = value;
}

function addNewSubscriber () {
	const inputField = document.createElement("input");
	const inputWrapper = document.createElement("div")
	inputField.type = "text";

	const inputSubscriptionToken = pubSubStore.subscribe("inbox/newMessage", updateFunc.bind(inputField));

	inputWrapper.appendChild(inputField);
	container.appendChild(inputWrapper);
}

