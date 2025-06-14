module.exports.config = {
  name: "unsend",
  aliases: ["r", "uns", "unsent"],
  version: "1.1.0",
  permission: 0,
  credits: "Mirai Team, Modified by Sakibin",
  description: "Unsend bot's messages or listen for specific reactions to unsend.",
   premium: false,
  prefix: true,
  category: "message",
  usages: "unsend",
  cooldowns: 0,
};

module.exports.run = async function({ api, event, getText }) {
  // If the command is triggered manually
  if (event.type === "message_reply") {
    if (!event.messageReply) {
      return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
    }

    if (event.messageReply.senderID != api.getCurrentUserID()) {
      return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
    }

    return api.unsendMessage(event.messageReply.messageID);
  }

  // If the bot listens for a reaction
  if (event.type === "message_reaction") {
    const { reaction, userID, messageID, threadID } = event;

    // List of reactions that trigger unsend
    const triggerReactions = ["😠", "😡", "🤬"];

    // Check if the reaction is in the list
    if (triggerReactions.includes(reaction)) {
      try {
        // Fetch the message to check if it's from the bot
        const messageInfo = await api.getMessageInfo(messageID);

        if (messageInfo.senderID === api.getCurrentUserID()) {
          // Unsend the bot's message
          return api.unsendMessage(messageID);
        }
      } catch (err) {
        console.log("Error handling reaction for unsend:", err);
      }
    }
  }
};

module.exports.languages = {
  "en": {
    "returnCant": "Can't remove other people's messages.",
    "missingReply": "You can't unsend a message out of nowhere. Please reply to a message first."
  }
};
