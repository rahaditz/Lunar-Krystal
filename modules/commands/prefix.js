module.exports.config = {
  premium: false,
  prefix: true,
  name: "prefix",
  version: "1.0.0",
  permission: 0,
  credits: "ManhG",
  description: "check prefix",
  category: "system",
  usages: "",
  cooldowns: 5,
};

module.exports.handleEvent = async ({ event, api, Threads }) => {

 //const botID = api.getCurrentUserID();

  var { threadID, messageID, body, senderID } = event;
  //if (senderID == global.data.botID) return;
  if ((this.config.credits) != "ManhG") { return api.sendMessage(`Sai credits!`, threadID, messageID)}
  function out(data) {
    api.sendMessage(data, event.threadID)
  }
  var dataThread = (await Threads.getData(threadID));
  var data = dataThread.data; 
  const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
  var arr = ["mpre","mprefix","prefix", "dấu lệnh", "prefix của bot là gì","daulenh", "duong", "what prefix", "freefix", "what is the prefix", "bot dead", "bots dead", "where prefix", "what is bot", "what prefix bot", "how to use bot" ,"how use bot", "where are the bots","bot not working","bot is offline","where prefix","prefx","prfx","prifx","perfix","bot not talking","where is bot"];
  arr.forEach(i => {
    let str = i[0].toUpperCase() + i.slice(1);
    if (body === i.toUpperCase() | body === i | str === body) {
const prefix = threadSetting.PREFIX || global.config.PREFIX;
      if (data.PREFIX == null) {
        return out(`🛸 Group prefix: ${prefix}\n🔮 System prefix : ${global.config.PREFIX}\n🌟 Premium: On`)
      }
      else return out(`🛸 Group prefix: ${data.PREFIX}\n🔮 System prefix : ${global.config.PREFIX}\n🌟 Premium: On`)
    }

  });
};

module.exports.run = async({ event, api }) => {
    return api.sendMessage("error", event.threadID)
}
