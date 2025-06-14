module.exports.config = { 
    prefix: true,
    name: "antiout",
    version: "1.0.0",
    credits: "SAKIBIN",
    permission: 1,
    description: "Turn off antiout",
    usages: "antiout on/off",
    category: "system",
    cooldowns: 0
};

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["antiout"] == "undefined" || data["antiout"] == false) data["antiout"] = true;
    else data["antiout"] = false;
    
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    
    return api.sendMessage(`✅ | Antiout is ${(data["antiout"] == true) ? "turned on" : "turned off"} successful to this group.`, event.threadID);

}