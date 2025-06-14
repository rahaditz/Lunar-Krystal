const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

module.exports.config = {
    name: "play",
    aliases: ["sing"],
    version: "1.0.0",
    permission: 0,
    credits: "owner",
    premium: false,
    description: "Send Youtube Music",
    prefix: true,
    category: "without prefix",
    usages: `play [music title]`,
    cooldowns: 5,
    dependencies: {
        "path": "",
        "fs-extra": ""
    }
};

// Helper function to delete file
async function deleteFile(filePath) {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error("Error deleting file:", error);
    }
}

module.exports.run = async function({ api, event, args }) {
    const chilli = args.join(' ');
    if (!chilli) {
        return api.sendMessage('Please provide a song name!', event.threadID);
    }

    // React with loading emoji
    api.setMessageReaction("🔄", event.messageID, () => {}, true);

    const apiUrl1 = `https://betadash-search-download.vercel.app/yt?search=${encodeURIComponent(chilli)}`;

    try {
        const response1 = await axios.get(apiUrl1);
        const data1 = response1.data;
        const yturl = data1[0].url;
        const channel = data1[0].channelName;

        const apiUrl = `https://yt-video-production.up.railway.app/ytdl?url=${encodeURIComponent(yturl)}`;
        const response = await axios.get(apiUrl);
        const maanghang = response.data;

        if (!maanghang || !maanghang.audio) {
            api.setMessageReaction("❌", event.messageID, () => {}, true);
            return api.sendMessage('No song found for your search. Please try again with a different query.', event.threadID);
        }

        const bundat = maanghang.audio;
        const fileName = `${maanghang.title}.mp3`;
        const filePath = path.join(__dirname, fileName);

        const downloadResponse = await axios({
            method: 'GET',
            url: bundat,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(filePath);
        downloadResponse.data.pipe(writer);

        writer.on('finish', async () => {
            await api.sendMessage(`•Title: ${maanghang.title}\n•Uploader: ${channel}`, event.threadID);
            await api.sendMessage({
                attachment: fs.createReadStream(filePath)
            }, event.threadID, async () => {
                await deleteFile(filePath);
                api.setMessageReaction("✅", event.messageID, () => {}, true);
            });
        });

        writer.on('error', async () => {
            api.setMessageReaction("❌", event.messageID, () => {}, true);
            await api.sendMessage('There was an error downloading the file. Please try again later.', event.threadID);
        });

    } catch (error) {
        console.error('Error fetching song:', error);
        api.setMessageReaction("❌", event.messageID, () => {}, true);
        api.sendMessage('An error occurred while fetching the song. Please try again later.', event.threadID);
    }
};
