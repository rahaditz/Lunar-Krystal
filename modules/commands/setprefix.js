module.exports.config = { 
  premium: false,  prefix: true,
	name: "setprefix",
	version: "1.0.2",
	permission: 2,
	credits: "SAKIBIN",
	description: "Reset group prefix",
	category: "system",
	usages: "[prefix/reset]",
	cooldowns: 5
};

module.exports.languages = {
	"en": {
		"successChange": "Changed prefix into: %1",
		"missingInput": "Prefix must not be blank",
		"resetPrefix": "Reset prefix to: %1",
		"confirmChange": "Sure you want to change the prefix to: %1?\n(React this message to confirm ✓)"
	}
}

module.exports.handleReaction = async function({ api, event, Threads, handleReaction, getText }) {
	try {
		if (event.userID != handleReaction.author) return;
		const { threadID, messageID } = event;


		var data = (await Threads.getData(String(threadID))).data || {};
		data["PREFIX"] = handleReaction.PREFIX;
		await Threads.setData(threadID, { data });
		await global.data.threadData.set(String(threadID), data);
		await api.changeNickname(`» ${handleReaction.PREFIX} « ♤ ${global.config.BOTNAME}`, threadID, api.getCurrentUserID());
		api.unsendMessage(handleReaction.messageID);
		return api.sendMessage(getText("successChange", handleReaction.PREFIX), threadID, messageID);
	} catch (e) {
		console.log(e);
	}
}

module.exports.run = async ({ api, event, args, Threads, getText }) => {
	if (typeof args[0] === "undefined") return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	let prefix = args[0].trim();
	if (!prefix) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	if (prefix === "reset") {
		var data = (await Threads.getData(event.threadID)).data || {};
		data["PREFIX"] = global.config.PREFIX;
		await Threads.setData(event.threadID, { data });
		await global.data.threadData.set(String(event.threadID), data);
		await api.changeNickname(`${global.config.PREFIX} ${global.config.botname}`, event.threadID, api.getCurrentUserID());
		return api.sendMessage(getText("resetPrefix", global.config.PREFIX), event.threadID, event.messageID);
	} else {
		return api.sendMessage(getText("confirmChange", prefix), event.threadID, (error, info) => {
			global.client.handleReaction.push({
				name: "setprefix",
				messageID: info.messageID,
				author: event.senderID,
				premium: false,  prefix: prefix
			})
		});
	}
}
