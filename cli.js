const getVideo = require("./getVideo.js");
const download = require("./download.js");

const Table = require("cli-table");

const table = new Table();

require("yargs")
    .usage("$0 <cmd> [args]")
    .command("dl [videolink]", "Downloads a video", {},
        async function (args) {
            const video = await getVideo(args.videolink);

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

        })
    .help()
    .argv;
