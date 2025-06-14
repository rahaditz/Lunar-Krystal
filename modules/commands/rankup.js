module.exports.config = {
    prefix: true,
    name: "rankup",
    version: "1.0.2",
    permission: 1,
    credits: "Mirai Team (modified by ChatGPT)",
    description: "Silent EXP system",
    category: "system",
    dependencies: {
        "fs-extra": ""
    },
    cooldowns: 5,
    envConfig: {
        autoUnsend: false,
        unsendMessageAfter: 0
    }
};

module.exports.handleEvent = async function({ event, Currencies }) {
    const { threadID, senderID } = event;

    const expData = await Currencies.getData(senderID);
    if (!expData || isNaN(expData.exp)) return;

    const newExp = expData.exp + 1;

    // Calculate level silently without sending messages
    await Currencies.setData(senderID, { exp: newExp });
    return;
};

module.exports.languages = {
    "en": {
        "on": "on",
        "off": "off",
        "successText": "success notification rankup!",
        "levelup": "👻 {name}, your keyboard hero level has reached level {level}🔥"
    }
};

module.exports.run = async function({ api, event, Threads, getText }) {
    const { threadID, messageID } = event;
    let data = (await Threads.getData(threadID)).data;

    if (typeof data["rankup"] == "undefined" || data["rankup"] == false) data["rankup"] = true;
    else data["rankup"] = false;

    await Threads.setData(threadID, { data });
    global.data.threadData.set(threadID, data);

    return api.sendMessage(
        `${(data["rankup"] == true) ? getText("on") : getText("off")} ${getText("successText")}`,
        threadID,
        messageID
    );
};
