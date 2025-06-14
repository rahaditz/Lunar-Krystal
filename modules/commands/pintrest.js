module.exports.config = { 
    prefix: true,
    name: "pint",
    aliases: ["pin", "pintrest"],
    version: "1.0.0",
    permission: 0,
    credits: "SAKIBIN",
    description: "Image search",
    category: "image",
    usages: "[Text]",
    cooldowns: 0,
};

module.exports.run = async function({ api, event, args }) {
    const API = global.config.ApiUrl;
    const axios = require("axios");
    const fs = require("fs-extra");
    const request = require("request");
    const keySearch = args.join(" ");

    if (!keySearch.includes("-")) {
        return api.sendMessage('🍁✨ Please use the format: /pinterest Naruto - 6', event.threadID, event.messageID);
    }

    const keySearchs = keySearch.split("-")[0].trim();
    const numberSearch = Math.min(parseInt(keySearch.split("-").pop().trim()) || 6, 9);

    try {
        const res = await axios.get(`${API}/pinterest?search=${encodeURIComponent(keySearchs)}`);
        if (!res.data || !res.data.data || res.data.data.length === 0) {
            return api.sendMessage('❌ No images found for your search.', event.threadID, event.messageID);
        }

        const imageUrls = res.data.data.slice(0, numberSearch);
        let imgData = [];

        for (let i = 0; i < imageUrls.length; i++) {
            let path = __dirname + `/cache/${i + 1}.jpg`;
            let getDown = (await axios.get(imageUrls[i], { responseType: 'arraybuffer' })).data;
            fs.writeFileSync(path, Buffer.from(getDown, 'binary'));
            imgData.push(fs.createReadStream(path));
        }

        api.sendMessage({
            attachment: imgData,
            body: `➤ Here are ${numberSearch} images of ${keySearchs}`
        }, event.threadID, event.messageID);

        // Cleanup cached images
        setTimeout(() => {
            for (let i = 0; i < imageUrls.length; i++) {
                let path = __dirname + `/cache/${i + 1}.jpg`;
                if (fs.existsSync(path)) fs.unlinkSync(path);
            }
        }, 5000);

    } catch (error) {
        console.error(error);
        return api.sendMessage('⚠️ An error occurred while fetching images. Try again later.', event.threadID, event.messageID);
    }
};
