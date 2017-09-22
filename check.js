const request = require("snekfetch").get;

module.exports = async(possibleLink) => {
    const regex = /^(?:http)(?:s)?(?:\:\/\/)(?:www\.)?(?:pbskids\.org\/video)(?:\/)(?:[^ ]*)(?:\/)(?:[^ ]*)$/gm;

    if (!regex.test(possibleLink)) return false;
    else {
        try {
            const req = await request(possibleLink);

            if (req.status && req.status === 200) return true;

        } catch (e) {
            return false;
        };

    };

};