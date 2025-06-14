module.exports.config = {
  name: "kmgv2",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐃𝐚𝐫𝐤 𝐑𝐮𝐥𝐞𝐱 𝐊𝐢𝐧𝐠 𝐀𝐧𝐮𝐩",
  description: "Memes on bilal jutt Ka-fiirmg by Dark Boiis",
  commandCategory: "Random-IMG",
  usages: "panclose",
  cooldowns: 3,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.postimg.cc/kXcmF50D/312803463-807519933840777-8732228312536334640-n.jpg",
    "https://i.postimg.cc/PqHV6b1j/313355684-833134244494803-3840393132048023704-n.jpg",
    "https://i.postimg.cc/tTpTCcPM/310960144-803597897578987-3449242327149879694-n.jpg",
  ];
   var callback = () => api.sendMessage({body:`The ka-fiirmg boii Bilal lutt randii ka bachha : ${link.length}`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };