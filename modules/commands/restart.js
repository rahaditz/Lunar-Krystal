module.exports.config = {
	name: "restart",
	version: "7.0.0",
	permission: 2,
	credits: "sakibin",
	prefix: false,
  premium: false,
	description: "restart bot system",
	category: "admin",
	usages: "",
	cooldowns: 0,
	dependencies: {
		"process": ""
	}
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {
  const process = require("process");
  const { threadID, messageID } = event;
  api.sendMessage(`🔄 | ${global.config.BOTNAME} is restarting...`, threadID, ()=> process.exit(1));
}
