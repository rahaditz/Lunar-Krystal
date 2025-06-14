// Function to tag all participants
async function tagAll({ api, event, args }) {
    try {
        const threadInfo = await api.getThreadInfo(event.threadID);
        const all = threadInfo.participantIDs;
        all.splice(all.indexOf(api.getCurrentUserID()), 1); // Exclude the bot itself
        all.splice(all.indexOf(event.senderID), 1); // Exclude the sender

        const body = args.length ? args.join(" ") : "@everyone";
        const mentions = [];

        for (let i = 0; i < all.length; i++) {
            mentions.push({
                tag: body,
                id: all[i],
                fromIndex: body.length * i, // Ensure mentions align with body content
            });
        }

        return api.sendMessage({ body, mentions }, event.threadID, event.messageID);
    } catch (err) {
        console.error("Error tagging all users:", err);
    }
}

module.exports.config = {
    prefix: true,
    name: "tag",
    version: "1.1.0",
    permission: 0,
    credits: "sakibin",
    description: "Mention users based on keyword, or mention all users with 'all' or '-a'.",
    category: "utility",
    usages: "[keyword|all|-a]",
    cooldowns: 5,
};

module.exports.run = async function ({ api, event, args, Users }) {
    const { threadID, messageReply } = event;

    // If replying to a message, mention the sender of the replied message
    if (messageReply) {
        const senderID = messageReply.senderID;
        try {
            const userName = await Users.getNameUser(senderID);
            const mentions = [{ tag: userName, id: senderID }];
            return api.sendMessage(
                { body: `Mentioning ${userName}`, mentions },
                threadID,
                event.messageID
            );
        } catch (err) {
            console.error(`Error fetching user name for ID ${senderID}:`, err);
            return api.sendMessage("An error occurred while mentioning the user.", threadID);
        }
    }

    // Handle "all" or "-a" argument to mention all users
    if (args[0]?.toLowerCase() === "all" || args[0]?.toLowerCase() === "-a") {
        return tagAll({ api, event, args });
    }

    // Handle keyword-based search functionality
    const keyword = args[0]?.toLowerCase();
    if (!keyword) {
        return api.sendMessage("Please provide a keyword to search for or use 'all'/'-a' to mention everyone.", threadID);
    }

    const threadInfo = await api.getThreadInfo(threadID);
    const participants = threadInfo.participantIDs;
    const mentions = [];
    const matchedNames = [];

    for (let userID of participants) {
        try {
            const userName = await Users.getNameUser(userID);
            if (userName?.toLowerCase().startsWith(keyword)) {
                mentions.push({ tag: userName, id: userID });
                matchedNames.push(userName);
            }
        } catch (err) {
            console.error(`Error fetching user name for ID ${userID}:`, err);
        }
    }

    if (mentions.length === 0) {
        return api.sendMessage(`No users found with names starting with "${keyword}".`, threadID);
    }

    const messageBody = `Matching users: ${matchedNames.join(", ")}`;
    api.sendMessage({ body: messageBody, mentions }, threadID);
};
