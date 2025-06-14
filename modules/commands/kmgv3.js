module.exports.config = {
  name: "kmgv3",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "𝐃𝐚𝐫𝐤 𝐑𝐮𝐥𝐞𝐱 𝐊𝐢𝐧𝐠 𝐀𝐧𝐮𝐩",
  description: "Memes on kusman lunttak Ka-fiirmg by Dark Boiis",
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
"https://i.postimg.cc/d1CGypSm/313350907-674048934065337-6168036232182548499-n.jpg",
    "https://i.postimg.cc/VLfbfJ1F/313096266-1547524632373504-7485668130025981657-n.jpg",
    "https://i.postimg.cc/XvdvcW4J/313096247-490543846354636-4460926437834242728-n.jpg",
    "https://i.postimg.cc/T3W2fxy9/312717974-1260547558072579-5825471982904405956-n.jpg",
    "https://i.postimg.cc/HLgmmy1Y/313279319-831136261269968-2746975998226025411-n.jpg",
  ];
   var callback = () => api.sendMessage({body:`The ka-fiirmg boii Kusman Lunttak : ${link.length}`,attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/5.jpg")).on("close",() => callback());
   };