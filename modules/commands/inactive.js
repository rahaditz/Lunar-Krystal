module.exports.config = {
  prefix: true,
  name: "inactive",
  version: "1.0.0",
  permission: 3,
  credits: "Modified by ChatGPT from SAKIBIN base",
  description: "Filter or kick inactive users (0 exp)",
  category: "admin",
  usages: "[list/kick]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Currencies, Users }) {
  const { threadID, messageID, senderID } = event;

  if (!["list", "kick"].includes(args[0])) {
    return api.sendMessage("Please use: filteruser list | filteruser kick", threadID, messageID);
  }

  let { participantIDs } = await api.getThreadInfo(threadID);
  let botID = api.getCurrentUserID();

  // Filter out the bot and command sender
  participantIDs = participantIDs.filter(id => id !== botID && id !== senderID);

  const allData = await Promise.all(participantIDs.map(id => Currencies.getData(id)));
  const inactiveUsers = allData
    .map((data, index) => ({ ...data, userID: participantIDs[index] }))
    .filter(user => user.exp === 0)
    .slice(0, 20);

  if (args[0] === "list") {
    if (inactiveUsers.length === 0) {
      return api.sendMessage("No inactive (0 EXP) users found in this group.", threadID, messageID);
    }

    let msg = "Top 20 Inactive Users (0 EXP):\n";
    for (let i = 0; i < inactiveUsers.length; i++) {
      const name = (await Users.getData(inactiveUsers[i].userID)).name;
      msg += `${i + 1}. ${name} [${inactiveUsers[i].userID}]\n`;
    }
    return api.sendMessage(msg, threadID, messageID);
  }

  if (args[0] === "kick") {
    if (inactiveUsers.length === 0) {
      return api.sendMessage("No inactive (0 EXP) users to kick.", threadID, messageID);
    }

    for (let i = 0; i < inactiveUsers.length; i++) {
      const uid = inactiveUsers[i].userID;
      setTimeout(() => {
        api.removeUserFromGroup(uid, threadID);
      }, i * 1000);
    }

    return api.sendMessage(`Kicking ${inactiveUsers.length} inactive users from the group...`, threadID, messageID);
  }
};
