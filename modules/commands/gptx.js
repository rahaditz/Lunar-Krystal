const gpt = require("nayan-apis-server");

module.exports.config = {
  name: "gptx",
  prefix: ture,
  version: "2.1.3",
  permission: 0,
  credits: "sakibin",
  description: "",
  category: "ai",
  usages: "GPT 4",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, args, Threads, Users }) {
  if (!(event.body.startsWith("Bot") || event.body.startsWith("bot") ||  event.body.startsWith("gpt") || event.body.startsWith("Gpt"))) return;

  const { threadID, messageID, type, messageReply, body } = event;
  const userName = await Users.getNameUser(event.senderID);

  const tl = ["এত ডাকাডাকি করো কেনো", "তুমারে রাইতে ভালোবাসি🥺", "I Love You Baby😘", "BOT is made by Sakibin!", "হ্যা বলো জান শুনতেচি☺️","Ki hoise jaan😒", "/call can add admin!", "Jaaan tumi onek cute🫣","Ask amr mon vlo nei🥲","Hmm jan ummah😘😘","/report can nok owner!","Ato dako kno lojja lage to..","How can I assist you today!","/help to see helplist!"];
  var randrepl = tl[Math.floor(Math.random() * tl.length)];

  let question = '';
  let hasImage = false;

  if (type === 'message_reply') {
    if (messageReply?.attachments[0]?.type === 'photo') {
      hasImage = true;
      api.sendMessage('❗ Image processing is currently unavailable.', threadID, messageID);
      return;
    } else {
      question = messageReply?.body?.trim() || '';
    }
  } else { 
    question = body.slice(4).trim();
  }

  if (!question) {
    api.sendMessage(`👤 | ${userName}\n💌 | ${randrepl}`, event.threadID);
    return;
  }

  try {
    gpt({
      messages: [
        { role: "assistant", content: "Hello! How are you today?" },
        { role: "user", content: `Hello, my name is ${userName}.` },
        { role: "assistant", content: `Hello, ${userName}! How are you today?` }
      ],
      prompt: question,
      model: "GPT-4",
      markdown: false
    }, (err, data) => {
      if (err != null) {
        console.log(err);
        api.sendMessage("Error: Unable to process your request.", event.threadID);
      } else {
        api.sendMessage(data, event.threadID);
      }
    });
  } catch (error) {
    console.error(error);
    api.sendMessage("Error: Unable to process your request.", event.threadID);
  }
};

module.exports.run = async function ({ api, event }) {};
