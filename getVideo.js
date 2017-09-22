
const request = require("snekfetch").get;
const checkLink = require("./check.js");

const playlists = "https://cms-tc.pbskids.org/pbskidsvideoplaylists";

module.exports = async(link) => {
    const isLink = await checkLink(link);

    if (!isLink) return null;

    const data = link.split("/video/")[1];

    const slug = data.split("/")[0];
    const id = data.split("/")[1];

    const playlist = await request(`${playlists}/${slug}.json`);

    const content = playlist.body.collections.episodes.content.find(c => c.id === id) || playlist.body.collections.clips.content.find(c => c.id === id);

    if (!content) return null;

    const linkReq = await request(content.mp4);
    const DLlink = linkReq.text.split(/<a href="|<\/a>|">/)[3];

    content.mp4 = DLlink;

    return content;
};








