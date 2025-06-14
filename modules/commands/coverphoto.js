const axios = require("axios");

const baseApiUrl = async () => {
  const base = await axios.get("https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json");
  return base.data.api;
};

module.exports.config = {
  name: "coverphoto",
  aliases: ["cp", "cv"],
  version: "1.0",
  author: "Dipto",
  credits: "Dipto",
  description: "Get Facebook profile cover photo",
  usage: "[uid/link/mention/reply]",
  category: "user",
  prefix: true,
  role: 2,
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const uidSelf = event.senderID;
    const uidMention = Object.keys(event.mentions)[0];
    let uid;

    if (args[0]) {
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) uid = match[1];
      }
    }

    if (!uid) {
      uid =
        event.type === "message_reply"
          ? event.messageReply.senderID
          : uidMention || uidSelf;
    }

    const { data } = await axios.get(`${await baseApiUrl()}/coverphoto?userName=${uid}`);
    const imageStream = await axios.get(data.data.cover.source, { responseType: "stream" });

    await api.sendMessage({
      body: `• Username: ${data.data.id}`,
      attachment: imageStream.data
    }, event.threadID, event.messageID);

  } catch (err) {
    console.error("Coverphoto Error:", err);
    api.sendMessage(`❌ Error: ${err.message}`, event.threadID, event.messageID);
  }
};
