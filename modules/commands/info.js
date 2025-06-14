module.exports.config = { 
  premium: false,  prefix: true,
	name: "info",
	version: "1.0.1", 
	permission: 0,
	credits: "Sakibin",
	description: "Admin and Bot info.",
	category: "admin",
	cooldowns: 1,
	dependencies: 
	{
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};
module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");
api.shareContact(`🖥️𝗕𝗢𝗧 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥 𝗜𝗡𝗙𝗢🗞️

❗𝗡𝗼𝘁𝗲: 𝗧𝗵𝗶𝘀 𝗕𝗢𝗧 𝗶𝘀 𝗱𝗲𝘃𝗲𝗹𝗼𝗽𝗲𝗱 𝗯𝘆 @𝗦𝗮𝗸𝗶𝗯𝗶𝗻 𝗦𝗶𝗻𝗵𝗮

❋𝗕𝗼𝘁 𝗖𝗼𝗱𝗲: 𝗡𝗼𝗱𝗲 𝗝𝗦
❋𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${global.config.BOTNAME}
❋𝗕𝗼𝘁 𝗣𝗿𝗲𝗳𝗶𝘅: ${global.config.PREFIX}
❋𝗕𝗼𝘁 𝗖𝗵𝗶𝗽: Intel(R) Xeon(R) CPU @ 2.20GHz.
❋𝗕𝗼𝘁 𝗢𝘄𝗻𝗲𝗿: https://m.facebook.com/sakibin.dev`, "100065445284007", event.threadID)
   };
