module.exports.config = { 
  prefix: true,
  name: "cover",
  version: "1.0.0",
  permission: 0,
  credits: "Sakibin",
  description: "Make a Facebook cover",
  category: "edit",
  usages: "name1,name2,email,phonenumber,adress,color",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  const moment = require("moment-timezone");

  const time = moment.tz("Asia/Dhaka").format("LLLL");

  // Process input arguments
  const inputText = args.join(" ").trim().replace(/\s+/g, " ").replace(/(\s+\|)/g, "|").replace(/\|\s+/g, "|").replace(/\|/g, ",");
  const textArray = inputText.split(",");

  const text1 = textArray[0] || "";
  const text2 = textArray[1] || "";
  const text3 = textArray[2] || "";
  const text4 = textArray[3] || "";
  const text5 = textArray[4] || "";
  const color = textArray[5] || "";
  const uid = event.senderID;
  
  if (!text1) {
    return api.sendMessage(
      "❗ Example:\n/cover name1,name2,email,phonenumber,adress,color",
      event.threadID,
      event.messageID
    );
  }

  const apiEndpoint = `https://xakibin-fs8d.onrender.com/fbcover/v1?name=${encodeURIComponent(text1)}&color=${encodeURIComponent(color)}&address=${encodeURIComponent(text5)}&email=${encodeURIComponent(text3)}&subname=${encodeURIComponent(text2)}&sdt=${encodeURIComponent(text4)}&uid=${uid}`;
  const pathSave = `${__dirname}/cache/server4.png`;

  try {
    api.sendMessage("⚙️ Processing your request...", event.threadID, event.messageID);

    const response = await axios.get(apiEndpoint, { responseType: "arraybuffer" });
    const imageBuffer = response.data;

    fs.writeFileSync(pathSave, Buffer.from(imageBuffer));

    api.sendMessage(
      {
        body: `✅ Your Cover was created by Sakibin Server at ${time} 🔖`,
        attachment: fs.createReadStream(pathSave),
      },
      event.threadID,
      () => fs.unlinkSync(pathSave) // Clean up file after sending
    );
  } catch (error) {
    let errorMessage = "ERROR ❌\nSAKIBIN Server Busy 😓";

    if (error.response && error.response.data) {
      try {
        const errData = JSON.parse(error.response.data.toString());
        errorMessage += `\nDetails: ${errData.message || "Unknown error"}`;
      } catch {
        errorMessage += "\nDetails: Unable to parse server error response.";
      }
    }

    return api.sendMessage(errorMessage, event.threadID, event.messageID);
  }
};
