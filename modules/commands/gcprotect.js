const fs = require("fs");

module.exports.config = { 
    prefix: true,
    name: "gcprotect",
    version: "1.0.0",
    credits: "Sakibin",
    permission: 3,
    description: "Prevents users from changing the group name or photo.",
    usages: "antichange on/off",
    category: "system",
    cooldowns: 0
};

module.exports.run = async ({ api, event, Threads }) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    
    if (typeof data["antichange"] == "undefined" || data["antichange"] == false) {
        data["antichange"] = true;
        let threadInfo = await api.getThreadInfo(event.threadID);
        data["oldName"] = threadInfo.threadName; // Store old group name
        data["oldImage"] = threadInfo.imageSrc;  // Store old group photo
    } else {
        data["antichange"] = false;
    }
    
    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);
    
    return api.sendMessage(`✅ | Anti-change is now ${(data["antichange"] == true) ? "enabled" : "disabled"} for this group.`, event.threadID);
};

module.exports.handleEvent = async ({ api, event, Threads }) => {
    if (event.logMessageType === "log:thread-name" || event.logMessageType === "log:thread-image") {
        let data = (await Threads.getData(event.threadID)).data || {};
        if (!data["antichange"]) return;

        let threadInfo = await api.getThreadInfo(event.threadID);

        if (event.logMessageType === "log:thread-name" && data["oldName"]) {
            if (threadInfo.threadName !== data["oldName"]) {
                api.setTitle(data["oldName"], event.threadID);
                api.sendMessage(`⚠️ | Group name change detected! Reverting to: ${data["oldName"]}`, event.threadID);
            }
        }

        if (event.logMessageType === "log:thread-image" && data["oldImage"]) {
            if (threadInfo.imageSrc !== data["oldImage"]) {
                let imgPath = __dirname + "/cache/oldGroupPhoto.png";

                let request = require("request");
                request(data["oldImage"]).pipe(fs.createWriteStream(imgPath)).on("close", () => {
                    api.changeGroupImage(fs.createReadStream(imgPath), event.threadID, () => {
                        api.sendMessage(`⚠️ | Group photo change detected! Reverting to the original photo.`, event.threadID);
                        fs.unlinkSync(imgPath);
                    });
                });
            }
        }
    }
};
