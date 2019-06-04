const { callToFreeMapTools } = require("../../lib/freeMapTools");

module.exports = {
    getZipCodes: async (req, res) => {
        const { kmlString } = req.query;
        return res.send(await callToFreeMapTools(kmlString));
    }
};
