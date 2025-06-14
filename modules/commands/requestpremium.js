module.exports.config = {
  name: 'requestpremium',
  version: '1.0.0',
  permission: 0,
  prefix : false,
  premium: false,
  category: 'system',
  cooldown: 100,
  description: 'request premium',
  ussage: 'requestpremium'
}

module.exports.run = async function({ api, args, event, Users }) {
  const { sendMessage, unsendMessage } = api;
  const { threadID, messageID, senderID} = event;
  const send = global.send;
  if (global.config.premium) {
    var message = args.join(" ");
    if (!message) {
      return sendMessage(`please enter a message.`, threadID, messageID);
    }
    var username;
    try {
      username = await Users.getNameUser(senderID);
    } catch (error) {
      username = "facebook user";
    }

    try {
      api.sendMessage('your request has been sent from bot operator through mail', threadID, messageID);
      send('request premium commands', `${username} is requesting for premium\n\nuser id : ${senderID}\nmessage : ${message}`)
    } catch (err) {
      return api.sendMessage('something went wrong', threadID, messageID)
    }


  } else {
    return sendMessage(`premium system is not turned on`, threadID, (err) => {
      if (err) {
        return;
      }
    }, messageID)
  }
}