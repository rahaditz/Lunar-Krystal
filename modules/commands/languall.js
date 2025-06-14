module.exports.config = { 
  premium: false,  prefix: true,
	name: "trans",
	version: "1.0.1",
	permission: 0,
	credits: "SAKIBIN",
	description: "Text translation",
	category: "other",
	usages: "[en/ko/ja/vi] [Text]",
	cooldowns: 5,
	dependencies: {
		"request":  ""
	}
};

module.exports.run = async ({ api, event, args, utils }) => {
    const request = global.nodemodule["request"];
    var content = args.join(" ");
    if (content === "-a") {
        const supportedLanguages = "1. English (en)\n2. Bengali (bn)\n3. Spanish (es)\n4. French (fr)\n5. German (de)\n6. Italian (it)\n7. Portuguese (pt)\n8. Russian (ru)\n9. Japanese (ja)\n10. Korean (ko)\n11. Chinese (zh)\n12. Dutch (nl)\n13. Arabic (ar)\n14. Greek (el)\n15. Hebrew (he)\n16. Hindi (hi)\n17. Indonesian (id)\n18. Polish (pl)\n19. Romanian (ro)\n20. Swedish (sv)\n21. Thai (th)\n22. Turkish (tr)\n23. Ukrainian (uk)\n24. Vietnamese (vi)";
        api.sendMessage(supportedLanguages, event.threadID, event.messageID);
        return;
    }

    if (content.length == 0 && event.type != "message_reply") return utils.throwError(this.config.name, event.threadID, event.messageID);
    var translateThis = content.slice(0, content.indexOf(" ->"));
    var lang = content.substring(content.indexOf(" -> ") + 4);
    if (event.type == "message_reply") {
        translateThis = event.messageReply.body;
        lang = content.trim().toLowerCase(); // Get the user's reply and convert it to lowercase
    } else if (content.indexOf(" -> ") == -1) {
        translateThis = content.slice(0, content.length);
        lang = global.config.language;
    }

    // Modify the API request URL to use the dynamically determined language
    return request(encodeURI(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${translateThis}`), (err, response, body) => {
        if (err) return api.sendMessage("An error has occurred!", event.threadID, event.messageID);
        var retrieve = JSON.parse(body);
        var text = '';
        retrieve[0].forEach(item => (item[0]) ? text += item[0] : '');
        var fromLang = (retrieve[2] === retrieve[8][0][0]) ? retrieve[2] : retrieve[8][0][0];
        api.sendMessage(`Translation: ${text}\n - translated from ${fromLang} to ${lang}`, event.threadID, event.messageID);
    });
}
