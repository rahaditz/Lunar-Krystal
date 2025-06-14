const APIURL = global.config.ApiUrlX;
const IMAGE_CACHE_PATH = __dirname + "/cache";
//const APIKEY = "SAKI-BIN-SWT56X";
module.exports.config = {
  premium: false,  prefix: true,
  name: "textpro",
  version: "1.0.0",
  permission: 1,
  credits: "Sakibin",
  description: "Sakibin Design",
  category: "image",
  usages: "\n/textpro 1 [yourname]",
  cooldowns: 0,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const moment = require("moment");
  const inputText = args.join("");
  const Ntext = args.slice(1).join("");
  
  if (!inputText) {
    api.setMessageReaction("❌", event.messageID, (err) => {}, true);
    return api.sendMessage("Note: সঠিক ভাবে লিখুন। যেমন..\n/textpro 1 Sakib", event.threadID);
  }

  // Set initial reaction indicating the start of the process
  api.setMessageReaction("⏳", event.messageID, (err) => {}, true);

  // Cycle through reactions during the image processing
  setTimeout(() => {
    api.setMessageReaction("🔄", event.messageID, (err) => {
      if (err) console.error("Error setting reaction:", err);
    }, true);
  }, 1000);

  setTimeout(() => {
    api.setMessageReaction("🔃", event.messageID, (err) => {
      if (err) console.error("Error setting reaction:", err);
    }, true);
  }, 2000);

  setTimeout(() => {
    api.setMessageReaction("🔄", event.messageID, (err) => {
      if (err) console.error("Error setting reaction:", err);
    }, true);
  }, 3000);

  setTimeout(() => {
    api.setMessageReaction("🔃", event.messageID, (err) => {
      if (err) console.error("Error setting reaction:", err);
    }, true);
  }, 4000);

  try {
    const time = moment.tz("Asia/Dhaka").format("LLLL");
    const startNumber = (parseInt(inputText) - 1) * 10 + 1;
    const endNumber = parseInt(inputText) * 10;
    const imgData = [];

    for (let i = startNumber; i <= endNumber; i++) {
      const apiEndpoint = `/ephoto?number=${i}&text=${Ntext}`;
      const imagePath = `${IMAGE_CACHE_PATH}/${i}.png`;
      const response = await axios.get(APIURL + apiEndpoint, { responseType: 'arraybuffer' });
      fs.writeFileSync(imagePath, Buffer.from(response.data, 'utf-8'));
      imgData.push(fs.createReadStream(imagePath));
    }

    await api.sendMessage({
      attachment: imgData,
      body: `🔥Here is your edited image (${startNumber} to ${endNumber})\n🖥️API and CMD Make by @Sakibin to ${time}`,
    }, event.threadID, event.messageID);

    // Clean up the image files
    for (let i = startNumber; i <= endNumber; i++) {
      fs.unlinkSync(`${IMAGE_CACHE_PATH}/${i}.png`);
    }

    // Set reaction to indicate completion
    api.setMessageReaction("✅", event.messageID, (err) => {}, true);

  } catch (error) {
    console.error("Sakibin System ERROR...", error);
    api.setMessageReaction("❌", event.messageID, (err) => {}, true);
  }
};
