const fs = require("fs-extra");
const request = require("request");
const { Top } = require("canvafy");

module.exports.config = {
  prefix: true,
  name: "top2",
  version: "0.0.6",
  permission: 0,
  credits: "SAKIBIN, Updated with Canvafy by [YourName]",
  description: "Top Server Leaderboards as Image!",
  premium: false,
  category: "group",
  usages: "[thread/user/money/level]",
  cooldowns: 5,
};

module.exports.run = async ({ event, api, args, Currencies, Users }) => {
  const { threadID, messageID } = event;
  const option = parseInt(args[1] || 10);

  function expToLevel(point) {
    if (point < 0) return 0;
    return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
  }

  let data = [];
  let title = "";
  
  // ===== Leaderboard Selection ===== //
  if (args[0] === "user") {
    data = await Currencies.getAll(["userID", "exp"]);
    data.sort((a, b) => b.exp - a.exp);
    title = "👑 Top 10 Highest Levels!";
  } else if (args[0] === "money") {
    data = await Currencies.getAll(["userID", "money"]);
    data.sort((a, b) => b.money - a.money);
    title = "💰 Richest Users on Server!";
  } else {
    return api.sendMessage("Invalid leaderboard type! Use: user, money", threadID, messageID);
  }

  // ===== Fetch User Data & Avatars ===== //
  let usersData = [];
  for (let i = 0; i < Math.min(10, data.length); i++) {
    let user = data[i];
    let name = (await Users.getData(user.userID)).name;
    let avatar = `https://graph.facebook.com/${user.userID}/picture?width=720&height=720&access_token=YOUR_ACCESS_TOKEN`;
    
    usersData.push({
      top: i + 1,
      avatar,
      tag: name,
      score: args[0] === "user" ? expToLevel(user.exp) : user.money,
    });
  }

  // ===== Generate Leaderboard Image ===== //
  const topImage = await new Top()
    .setOpacity(0.6)
    .setScoreMessage(args[0] === "user" ? "Level:" : "Money:")
    .setabbreviateNumber(false)
    .setBackground("image", "https://i.ibb.co/w4PNPRs/2ca6cc0e-56df-4516-9383-679757adfc2d.jpg")
    .setColors({ box: '#212121', username: '#ffffff', score: '#ffffff', firstRank: '#f7c716', secondRank: '#9e9e9e', thirdRank: '#94610f' })
    .setUsersData(usersData)
    .build();

  let path = `./cache/top.png`;
  fs.writeFileSync(path, topImage);

  // ===== Send Image ===== //
  api.sendMessage({ body: title, attachment: fs.createReadStream(path) }, threadID, () => fs.unlinkSync(path), messageID);
};
