const APIURL = "https://gpt-19zs.onrender.com";
// const APIKEY = "SAKI-BIN-SWT56X";
module.exports.config = { 
  premium: false,  
  prefix: true,
  name: "text",
  version: "1.0.0",
  permission: 0,
  credits: "Sakibin",
  description: "Sakibin Design",
  category: "image",
  usages: "[no] [text]",
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  const axios = require("axios");
  const fs = require("fs-extra");
  
  const number = args[0];
  const text = args.slice(1).join(" ");

  // Validate the arguments
  if (!number || isNaN(number)) {
    return api.sendMessage(
      "❗Use /text [no.] [text]\n❗Example:\n  /text 5 Sakibin\nTotal Text limit 10",
      event.threadID,
      event.messageID
    );
  }

  const apiEndpoint = `/ephoto?number=${number}&text=${text}`;
  const pathSave = `${__dirname}/cache/server2.png`;

  try {
    const response = await axios.get(APIURL + apiEndpoint, { responseType: "arraybuffer" });
    const imageBuffer = response.data;

    // Save the image buffer to the file
    fs.writeFileSync(pathSave, Buffer.from(imageBuffer));

    // Send the message with the image attachment
    api.sendMessage(
      {
        body: `✅ | Here is your editz from Sakibin Server✨`,
        attachment: fs.createReadStream(pathSave),
      },
      event.threadID,
      () => fs.unlinkSync(pathSave) // Delete the file after sending
    );
  } catch (error) {
    // Handle errors
    let errorMessage = "ERROR ❌\nSAKIBIN Server Busy...";
    if (error.response) {
      try {
        const errorData = JSON.parse(error.response.data.toString());
        errorMessage = `ERROR ❌\n${errorData.message || "Unknown server error"}`;
      } catch {
        errorMessage = "ERROR ❌\nInvalid response from server.";
      }
    }

    // Send the error message
    api.sendMessage(errorMessage, event.threadID, event.messageID);
  }
};
