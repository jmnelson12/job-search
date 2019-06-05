const { callToFreeMapTools } = require("../../lib/freeMapTools");

module.exports = {
    getLocationInfo: async (req, res) => {
        const { kmlString } = req.query;
        return res.send(await callToFreeMapTools(kmlString));
    }
};
