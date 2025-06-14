const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "hûg",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Raiden Ei",
  description: "Ôm người bạn tag",
  commandCategory: "Tình Yêu",
  usages: "[tag]",
  cooldowns: 5,
};

module.exports.run = async({ api, event, Threads, global }) => {
  var link = [    
"https://i.imgur.com/xVigmxJ.gif",
"https://i.imgur.com/TLpYi5K.gif",
"https://i.imgur.com/e85SRno.gif",
"https://i.imgur.com/tjGYlDu.gif"
   ];
   var mention = Object.keys(event.mentions);
     let tag = event.mentions[mention].replace("@", "");
    if (!mention) return api.sendMessage("Vui lòng tag 1 người", threadID, messageID);
   var callback = () => api.sendMessage({body:`${tag}` + ` 𝗢̂𝗺𝗺 𝗺𝘂̣𝘁 𝗰𝗮́𝗶 𝗻𝗲̀ 💓`,mentions: [{tag: tag,id: Object.keys(event.mentions)[0]}],attachment: fs.createReadStream(__dirname + "/cache/omhug.gif")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/omhug.gif"));  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/omhug.gif")).on("close",() => callback());
   }