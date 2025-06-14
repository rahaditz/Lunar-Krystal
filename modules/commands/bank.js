module.exports.config = { 
    prefix: true,
	name: "bank",
	version: "1.0.0",
	credits: "HungCho & Khánh Milo",
	description: "Sakibin banking system",
	usages: "register",
    category: "economy",
	cooldowns: 0,
	dependencies: {
        "fs-extra" : ""
    }
};
module.exports.onLoad = function () {
    const fs = global.nodemodule["fs-extra"];

	if (!fs.existsSync(__dirname + "/cache/bill.json")) {
		const requestList = [];
		fs.writeFileSync(__dirname + "/cache/bill.json", JSON.stringify(requestList));
	}
}
module.exports.handleReply = async function({ api, event, handleReply, Currencies }) {
    const fs = global.nodemodule["fs-extra"];
	const dirFile = __dirname + "/cache/bill.json";

	var getList = fs.readFileSync(dirFile);
	var getData = JSON.parse(getList);

    if (handleReply.author != event.senderID) return;
    var data = await Currencies.getData(handleReply.author);
    var exp =  data.exp;
    var money = data.money
    var d = new Date();
    var date = d.getDate()+'/'+(d.getMonth() + 1 )+'/'+d.getFullYear();
	var time = d.getHours() + ":" + d.getMinutes();
    switch (handleReply.type) {
        case "banking": {
            switch (event.body) {
                case "1": {
                    return api.sendMessage(
                        "You can reply the amount you need to convert to exp! $ 10 = 1 exp."
                  , event.threadID, (error, info) => {
                      global.client.handleReply.push({
                          name: this.config.name,
                          messageID: info.messageID,
                          author: event.senderID,
                          type: "money"
                      });
                  }, event.messageID);
                } 
                case "2": {
                    return api.sendMessage(
                        "You can reply the number of exp you need to convert to money! 5 exp = 1 dollar."
                  , event.threadID, (error, info) => {
                      global.client.handleReply.push({
                          name: this.config.name,
                          messageID: info.messageID,
                          author: event.senderID,
                          type: "exp"
                      });
                  }, event.messageID);
                }
                default:
                    break;
            }
            return;
          }
          case "exp": {
            var content = event.body;
            if(content > exp) api.sendMessage("Your exp is not enough? please scratch more keys",event.threadID,event.messageID)
            else 
            {
            await Currencies.increaseMoney(handleReply.author, parseInt(content / 5));
            var exp = ((await Currencies.getData(handleReply.author)).exp) - parseInt(content);
            await Currencies.setData(handleReply.author, { exp })
            var msg = `💸Successful transaction !\nTime: ${time} - ${date}\n Details: Change ${content} exp to get ${content / 5} doller.`
            api.sendMessage(msg,handleReply.author);
            const suggest = msg;
            getData.push(suggest);
            api.sendMessage("Your transaction has been saved on the system !",event.threadID, () => fs.writeFileSync(dirFile, JSON.stringify(getData)),event.messageID);
          
            }
          break;
       }
       case "money": {
        var content = event.body;
        if(content > money) api.sendMessage("your money not enough? Please follow Master Huan !",event.threadID,event.messageID)
        else 
        {
            await Currencies.increaseMoney(event.senderID, parseInt("-"+content))
        var exp = ((await Currencies.getData(handleReply.author)).exp) + parseInt(content / 10);
        await Currencies.setData(handleReply.author, { exp })
        var msg = `💸Successful transaction !\nTime: ${time} - ${date}\nDetails: change ${content} dollers to get ${content / 10} exp.`
        api.sendMessage(msg,handleReply.author);
        const suggest = msg;
        getData.push(suggest);
        api.sendMessage("Your transaction has been saved on the system !",event.threadID, () => fs.writeFileSync(dirFile, JSON.stringify(getData)),event.messageID);
      
        }
      break;
   }
      }
    }
module.exports.run = async function({ api, event, args }) {
    const fs = global.nodemodule["fs-extra"];
	const dirFile = __dirname + "/cache/bill.json";

	var getList = fs.readFileSync(dirFile);
	var getData = JSON.parse(getList);

    if(!args[0])return api.sendMessage(
          "•════🏛BANKING🏛════•" +
               
 "\n\n[1].Convert Money = Exp🎟️." +
    "\n[2]. Convert Exp = Money💵." +
    "\n[3]. Update after 📲." +
    "\n\n» Please reply to the message and choose by number «" + "\n\n•════🏛BANKING🏛════•"
            , event.threadID, (error, info) => {
                client.handleReply.push({
                    name: this.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    type: "banking"
                });
            }, event.messageID);
     
    if (args[0] == "check") {
        var workList = "";
			getData.map(item => workList += `\n ${item}`);
			return api.sendMessage(`${workList}`, event.threadID, event.messageID);
		}
        
}