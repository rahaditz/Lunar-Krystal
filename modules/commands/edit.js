

module.exports.config = {
  name: 'edit',
  version: '1.1.0',
  permission: 1,
  credits: 'Yan Maglinte | Updated by Liane Cagara',
  description: `Edit the bot's messages seamlessly!`,
  premium: false,
  prefix: true,
  allowpremium: false,
  category: 'message',
  usages: 'Reply to a bot message and type <prefix>edit <your_message>',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const replyMessage = event.messageReply?.body; // Ensure the message being replied to exists
  const newContent = args.join(' '); // Join all arguments to form the new content

  if (!replyMessage) {
    return api.sendMessage("❌ | Please reply to a bot message to edit it.", event.threadID, event.messageID);
  }

  if (!newContent) {
    return api.sendMessage("❌ | Please provide the new content for the message.", event.threadID, event.messageID);
  }

  try {
    // Attempt to edit the message
    api.editMessage(newContent, event.messageReply.messageID, (err) => {
      if (err) {
        console.error("Error editing message:", err);
        return api.sendMessage("❌ | An error occurred while editing the message. Please try again later.", event.threadID, event.messageID);
      }

      // React with a check mark on success
      api.setMessageReaction("✅", event.messageID, (reactionErr) => {
        if (reactionErr) console.error("Error adding reaction:", reactionErr);
      });
    });
  } catch (error) {
    console.error("Error during message editing:", error);
    api.sendMessage("❌ | An unexpected error occurred. Please try again later.", event.threadID, event.messageID);
  }
};
