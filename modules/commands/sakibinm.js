module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
    var { threadID, messageID } = event;
    let react = event.body.toLowerCase();
    
    if (react.includes("@sakibin") ||
        react.includes("@Sakibin") ||
        react.includes("/sakibin")) {

        // Array of random messages
        const messages = [
            "Sakibin boss ekhun busy achen😒",
            "Sakibin to more gese👽!",
            "Sakibin ekhon meeting-e achen.",
            "Ajke r dekha hobe na Sakibin-er shathe!",
            "Sakibin offline chole geche, pore try kor."
        ];

        // Select random message
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];

        var msg = {
            body: randomMsg
        }

        api.sendMessage(msg, threadID, messageID);
        api.setMessageReaction("🫡", event.messageID, (err) => {}, true)
    }
}
