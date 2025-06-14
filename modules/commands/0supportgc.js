const chalk = require('chalk');
module.exports.config = { 
    prefix: true,
    name: "supportgc",
    version: "1.0.1",
    permission: 0,
    credits: "SAKIBIN",
    description: "Join the Bot boxes are in",
    category: "group",
    usages: "",
    cooldowns: 5
};

const allowedGroups = ['9346480742035558', '5683041128473731']; // Only allow these groups

module.exports.onLoad = () => {
  console.log(chalk.bold.hex("#00c300").bold("==== SUCCESSFULLY LOADED THE JOIN COMMAND ====="));
}

module.exports.handleReply = async function({ api, event, handleReply, Threads }) {
  var { threadID, messageID, senderID, body } = event;
  var { ID } = handleReply;

  if (!body || !parseInt(body)) {
    return api.sendMessage('Your selection must be a number.', threadID, messageID);
  }

  if ((parseInt(body) - 1) > ID.length || (parseInt(body) - 1) < 0) {
    return api.sendMessage("Your pick is not on the list", threadID, messageID);
  }

  try {
    var selectedGroupID = ID[body - 1];
    var threadInfo = await Threads.getInfo(selectedGroupID);
    var { participantIDs, approvalMode, adminIDs } = threadInfo;

    if (participantIDs.includes(senderID)) {
      return api.sendMessage(`You are already in this group.`, threadID, messageID);
    }

    api.addUserToGroup(senderID, selectedGroupID);

    if (approvalMode === true && !adminIDs.some(item => item.id === api.getCurrentUserID())) {
      return api.sendMessage("Added you to the group's approval list. Please wait for approval.", threadID, messageID);
    } else {
      return api.sendMessage(`You have been added to the group ${threadInfo.threadName}.`, threadID, messageID);
    }
  } catch (error) {
    return api.sendMessage(`An error occurred while trying to add you to the group:\n\n${error}`, threadID, messageID);
  }
}

module.exports.run = async function({ api, event, Threads }) {
  var { threadID, messageID, senderID } = event;
  var msg = `> Here is Support GC List:\n\n`, number = 0, ID = [];

  // Get info for only the allowed groups
  for (var groupID of allowedGroups) {
    try {
      var threadInfo = await Threads.getInfo(groupID);
      number++;
      msg += `${number}. ${threadInfo.threadName}\n`;
      ID.push(groupID);
    } catch (error) {
      console.log(`Failed to retrieve group info for ${groupID}:`, error);
    }
  }

  msg += `\n👉 Reply to this message to the group you want to join.`;

  return api.sendMessage(msg, threadID, (error, info) => {
    if (error) return console.log(error);

    global.client.handleReply.push({
      name: this.config.name,
      author: senderID,
      messageID: info.messageID,
      ID: ID      
    });
  }, messageID);
}
