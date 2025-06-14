const axios = require("axios");

module.exports.config = {
  name: "flux",
  aliases: ["ux"],
  version: "2.0",
  role: 0,
  permission: 0,
  author: "Dipto",
  prefix: true,
  description: "Flux Image Generator",
  category: "ai",
  premium: true,
  guide: "{pn} [prompt] --ratio 1024x1024\n{pn} [prompt]",
  countDown: 15,
};

module.exports.run = async ({ event, args, api }) => {
  const dipto = "https://www.noobs-api.rf.gd/dipto";

  try {
    const prompt = args.join(" ");
    const [prompt2, ratio = "1:1"] = prompt.includes("--ratio")
      ? prompt.split("--ratio").map(s => s.trim())
      : [prompt, "1:1"];

    const startTime = Date.now();
    
    const waitMessage = await api.sendMessage("🔄 | Generating image. wait...", event.threadID);
    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    const apiurl = `${dipto}/flux?prompt=${encodeURIComponent(prompt2)}&ratio=${encodeURIComponent(ratio)}`;
    const response = await axios.get(apiurl, { responseType: "stream" });

    const timeTaken = ((Date.now() - startTime) / 1000).toFixed(2);

    api.setMessageReaction("✅", event.messageID, () => {}, true);
    api.unsendMessage(waitMessage.messageID);

    api.sendMessage({
      body: `Here's your image (Generated in ${timeTaken} seconds)`,
      attachment: response.data,
    }, event.threadID, event.messageID);
    
  } catch (e) {
    console.error(e);
    api.sendMessage("Error: " + e.message, event.threadID, event.messageID);
  }
};