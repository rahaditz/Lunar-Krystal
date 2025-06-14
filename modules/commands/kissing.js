const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "kissing",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Raiden Makoto",
  description: "Hôn người bạn tag",
  commandCategory: "Tình Yêu",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = [    
"https://i.imgur.com/X7QFl5r.gif",
"https://i.imgur.com/ZMhJW0z.gif",
"https://i.imgur.com/xBOrcNkissing 
    ];
   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
   var callback = () => api.sendMessage({body:`${tag}` + ` 𝗕𝗮𝗲 𝗰𝗵𝗼 𝗮𝗻𝗵 𝘁𝗵𝗼̛𝗺 𝗺𝗼̣̂𝘁 𝗰𝗮́𝗶, 𝗻𝗲̂́𝘂 𝗲𝗺 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗶́𝗰𝗵 𝘁𝗵𝗶̀ 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘁𝗿𝗮̉ 𝗹𝗮̣𝗶 𝗮𝗻𝗵 𝗻𝗲̀ 💞`,mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/honkiss.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/honkiss.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/honkiss.gif")).on("close",() => callback());
   }