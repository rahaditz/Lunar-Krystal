const axios = require('axios');
const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Blankid018/D1PT0/main/baseApiUrl.json`);
  return base.data.api;
}; 
module.exports = {
  config: {
  name: "bing",
  aliases: ["xl"],
  version: "1.0",
  credits: "dipto",
  permission: 0,
  prefix: true,
 // prefix: true,
  description: "Generate images by Dalle-3 AI",
//  ctegory: "download",
  category: "download",
  usages:
    "[text] \nJamon [A 17/18/19 years old boy/girl watching football match on tv and written Sakibin and 145 on the back of his Dress , 4k]",
  cooldowns: 5,
}, 
  run: async({ api, event, args }) => {
   
const adminID = '100065445284007';

if (event.senderID !== adminID) {
        return api.sendMessage("This Bing A.i command is only for my boss SAKIBIN.❗", event.threadID, event.messageID);}

 const prompt = (event.messageReply?.body.split("dalle")[1] || args.join(" ")).trim();
    if (!prompt) return api.sendMessage("❌| Wrong Format. ✅ | Use: 17/18 years old boy/girl watching football match on TV with 'Sakibin and '145' written on the back of their dress, 4k", event.threadID, event.messageID);
    try {
       //const cookies = "cookies here (_U value)";
const cookies = ["1tthZzDnCHxguexEimEUr7TlhWJJSfbcrnNMEgSFSi2HKTH9frYG_WO9Rvu4_8hhiDq6Rtsu34MgnuprtdfL0pM5tpXCClrd5mvBNeR40vzY5hpBj6FUGnYL2nEBiLiA5RcKBM6QmVadgb1Htx-iUzCn0I6T4gftb9pRU4ip0GrsUij5rYGdy2uvJuq1JPs7Zmhp9VIfjuDlnP8EB7O6J-Q"];

const randomCookie = cookies[Math.floor(Math.random() * cookies.length)];
      const wait = api.sendMessage("Please wait...", event.threadID);
      const response = await axios.get(`${await baseApiUrl()}/dalle?prompt=${prompt}&key=dipto008&cookies=${randomCookie}`);
const imageUrls = response.data.imgUrls || [];
      if (!imageUrls.length) return api.sendMessage("Empty response or no images generated.", event.threadID, event.messageID);
      const images = await Promise.all(imageUrls.map(url => axios.get(url, { responseType: 'stream' }).then(res => res.data)));
    //api.unsendMessage(wait.messageID);
   api.sendMessage({ body: `✅ | Here's Your Generated Photo 🎨`, attachment: images }, event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      api.sendMessage(`Generation failed!\nError: ${error.message}`, event.threadID, event.messageID);
    }
  }
}