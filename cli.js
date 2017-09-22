const getVideo = require("./getVideo.js");
const download = require("./download.js");

const Table = require("cli-table");
const table = new Table();

const commander = require("commander");

commander
    .version("1.0.0")
    .command("dl <videolink>")
    .description("Downloads a video")
    .action(async function (videolink) {
        const video = await getVideo(videolink);

        if (!video) return console.log("Cannot get video, please check your link, then try again.");

        table.push({
            Title: video.title
        }, {
            Description: video.description
        }, {
            "Video Type": video.video_type
        }, {
            Duration: require("humanize-duration")(video.duration * 1000)
        });

        console.log(table.toString());

        await download(video.mp4, video.title);

    });

commander.parse(process.argv);
