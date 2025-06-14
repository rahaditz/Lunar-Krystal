module.exports.config = { 
    prefix: true,
    name: "setnick",
    version: "1.0.0",
    permission: 3,
    credits: "sakibin",
    description: "Change your nickname in the group",
    category: "group",
    usages: "[new nickname]",
    cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
    var { threadID, senderID } = event;
    var customName = args.join(" ");

    // If no nickname is provided, set default bot nickname
    if (!customName) {
        customName = `${global.config.BOTNAME} • [ ${global.config.PREFIX} ]`;
    }

    try {
        await api.changeNickname(customName, threadID, senderID);
        return api.sendMessage(`✅ Your nickname has been changed to: ${customName}`, threadID);
    } catch (error) {
        return api.sendMessage(`❌ Failed to change nickname:\n${error.message}`, threadID);
    }
};
