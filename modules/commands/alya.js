const axios = require('axios');

const baseApiUrl = async () => {
  const base = await axios.get(
    `https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`
  );
  return base.data.romim;
};

module.exports.config = {
  name: "alya",
  version: "2.0.0",
  author: "nYx",
  credits: "nYx",
    prefix: true,
  description: "AI-powered Voice chat",
  category: "ai",
  usages: "[query] [-v for voice]",
  cooldowns: 3,
};

let responseType = 'text';

module.exports.run = async function ({ api, event, args }) {
  const input = args.join(' ');
  if (!input) return api.sendMessage("Please provide a message for Alya.", event.threadID, event.messageID);

  const { query, type } = parseInput(input);
  responseType = type;

  await handleResponse({ api, event, input: query });
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
  if (event.senderID !== handleReply.author) return;
  const input = event.body;
  await handleResponse({ api, event, input });
};

function parseInput(input) {
  let type = responseType;
  let query = input;

  if (input.endsWith('-v')) {
    type = 'voice';
    query = input.slice(0, -2).trim();
  } else if (input.endsWith('-t')) {
    type = 'text';
    query = input.slice(0, -2).trim();
  }

  return { query, type };
}

async function handleResponse({ api, event, input }) {
  try {
    const { data } = await axios.get(
      `${await baseApiUrl()}alya_ai?query=${encodeURIComponent(input)}&type=${responseType}`
    );

    if (responseType === 'voice') {
      const stream = await global.utils.getStreamFromUrl(data.data);
      api.sendMessage({ attachment: stream }, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      }, event.messageID);
    } else {
      api.sendMessage(data.data, event.threadID, (err, info) => {
        if (!err) {
          global.client.handleReply.push({
            name: module.exports.config.name,
            type: "reply",
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      }, event.messageID);
    }
  } catch (e) {
    api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
  }
}
