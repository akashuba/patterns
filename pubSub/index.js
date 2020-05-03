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
	console.log("Logging: " + topics + ": " + data);
};

subscription = pubSubStore.subscribe("inbox/newMessage", messageLogger);

pubSubStore.publish("inbox/newMessage", "hello there");

pubSubStore.publish("inbox/newMessage", {
	sender: "Jimmy",
	body: "Hi from Jimmy"
});

pubSubStore.unsubscribe(subscription);

pubSubStore.publish("inbox/newMessage", "After unsubscribe");
