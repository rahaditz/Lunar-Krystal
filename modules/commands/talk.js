module.exports.config = {
     name: "talk",
     version: "1.1.0",
     permission: 0,
     credits: "sakibin",
     premium: false,
     description: "talk reply",
     prefix: false,
     category: "without prefix",
     cooldowns: 0
};


const axios = require('axios');

module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const log = require('../../sakibin/catalogs/sakibinc.js');
    const path = resolve(__dirname, 'system', 'system.json');
    if (!existsSync(path)) {
        const obj = {
            sakibin: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('sakibin')) data.sakibin = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}

module.exports.handleEvent = async ({ api, event, args, Threads }) => {
    const { threadID, messageID } = event;
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'system', 'system.json');
    const { talk } = global.apisakibin;
    const { sakibin } = require(path);

    if (sakibin.hasOwnProperty(threadID) && sakibin[threadID] == true) {
      if (event.senderID !== api.getCurrentUserID()) {
      axios.get(encodeURI(`https://joncll.serv00.net/sim/sim.php?query=${event.body}`)).then(res => {
            if (res.data.respond == "null" || res.data.respond == "i didn't understand you, teach me.") {
                api.sendMessage("i didn't understand you, teach me.",threadID,messageID)
            } else {
                return api.sendMessage(res.data.respond, threadID, messageID);
            }
    })
    }  
    }
}

module.exports.run = async ({ api, event, args, permssion }) => {
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, 'system', 'system.json');
    const { threadID, messageID } = event;
    const database = require(path);
    const { talk } = global.apisakibin;
    const { sakibin } = database;

    if (!args[0]) { api.sendMessage("enter a message", threadID, messageID) } else {
        switch(args[0]) {
            case "on": {
              if (permssion != 1) return api.sendMessage('only group admins can use this commands', threadID, messageID);
                sakibin[threadID] = true;
                api.sendMessage("successfully turned on talk.", threadID);
                break;
            }
            case "off": {
              if (permssion != 1) return api.sendMessage('only group admins can use this commands', threadID, messageID);
                sakibin[threadID] = false;
                api.sendMessage("successfully turned off talk.", threadID);
                break;
            }
            default:
            axios.get(encodeURI(`https://joncll.serv00.net/sim/sim.php?query=${args.join(" ")}`)).then(res => {
            if (res.data.respond == "null" || res.data.respond == "i didn't understand you, teach me.") {
                api.sendMessage("i didn't understand you, teach me.",threadID,messageID)
            } else {
                return api.sendMessage(res.data.respond, threadID, messageID);
            }
            });
            break;
        }
        writeFileSync(path, JSON.stringify(database, null, 4));
    }
}