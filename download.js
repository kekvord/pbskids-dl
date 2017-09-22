const request = require("snekfetch").get;
const fs = require("pn/fs");

module.exports = async(link, fileName) => {

   return request(link).pipe(fs.createWriteStream(`${require("filenamify")(fileName)}.mp4`));

};