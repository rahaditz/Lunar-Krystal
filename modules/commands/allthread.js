module.exports.config = { 
  prefix: true,
	name: "allthread",
	version: "1.0.2",
	permission: 2,
	credits: "SAKIBIN",
	description: "announcement from admin",
	category: "Admin",
	usages: "[Text]",
	cooldowns: 5
};
 
module.exports.languages = {
"en": {
		"sendSuccess": "Sent message to %1 thread!",
		"sendFail": "[!] Can't send message to %1 thread"
	}
}
 
module.exports.run = async ({ api, event, args, getText, Users }) => {
  if (event.senderID !== "100065445284007") {
    return api.sendMessage("Only Sakibin can Use this Command!", event.threadID);
  }
  const name = await Users.getNameUser(event.senderID)
const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Dhaka").format("DD/MM/YYYY || HH:mm:s");  
if (event.type == "message_reply") {
const request = global.nodemodule["request"];
const fs = require('fs')
const axios = require('axios')
			var getURL = await request.get(event.messageReply.attachments[0].url);
 
					var pathname = getURL.uri.pathname;
var ext = pathname.substring(pathname.lastIndexOf(".") + 1);
 
					var path = __dirname + `/cache/snoti`+`.${ext}`;
 
 
var abc = event.messageReply.attachments[0].url;
    let getdata = (await axios.get(`${abc}`, { responseType: 'arraybuffer' })).data;
 
  fs.writeFileSync(path, Buffer.from(getdata, 'utf-8'));
 
 
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.sendMessage({body: `` + args.join(` `) + ``,attachment: fs.createReadStream(path) }, idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID);
 
}
else {
	var allThread = global.data.allThreadID || [];
	var count = 1,
		cantSend = [];
	for (const idThread of allThread) {
		if (isNaN(parseInt(idThread)) || idThread == event.threadID) ""
		else {
			api.shareContact(`` + args.join(` `) + ``, "100065445284007", idThread, (error, info) => {
				if (error) cantSend.push(idThread);
			});
			count++;
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
	}
	return api.sendMessage(getText("sendSuccess", count), event.threadID, () => (cantSend.length > 0 ) ? api.sendMessage(getText("sendFail", cantSend.length), event.threadID, event.messageID) : "", event.messageID); }
}