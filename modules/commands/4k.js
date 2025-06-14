const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json");
  return base.data.mostakim;
};

module.exports.config = {
  name: "4k",
  aliases: ["remini"],
  version: "1.0",
  author: "Romim",
  description: "Enhance image quality like Remini",
  category: "enhanced",
  cooldowns: 3,
  prefix: false
};

module.exports.run = async function ({ api, event }) {
  try {
    const attachment = event.messageReply?.attachments?.[0];
    if (!attachment || attachment.type !== "photo") {
      return api.sendMessage("❌ Please reply to an image with the command.", event.threadID, event.messageID);
    }

    const imageUrl = attachment.url;
    const apiUrl = `${await baseApiUrl()}/remini?input=${encodeURIComponent(imageUrl)}`;

    const response = await axios.get(apiUrl, { responseType: "stream" });

    return api.sendMessage({
      body: "✅ Here is your enhanced photo!",
      attachment: response.data
    }, event.threadID, event.messageID);

  } catch (error) {
    console.error("Enhance Error:", error);
    return api.sendMessage(`❌ Error: ${error.message}`, event.threadID, event.messageID);
  }
};
