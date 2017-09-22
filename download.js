const request = require("snekfetch").get;
const fs = require("pn/fs");

module.exports = async(link, fileName) => {

    const spinner = require("ora")("Downloading...").start();

    const stream = request(link).pipe(fs.createWriteStream(`${require("filenamify")(fileName)}.mp4`));

    stream.on("finish", async() => {
        spinner.succeed("Done!");
        process.exit();
    });

};
