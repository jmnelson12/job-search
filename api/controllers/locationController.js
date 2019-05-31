const { callToFreeMapTools } = require("../../lib/freeMapTools");

module.exports = {
    getZipCodes: async (req, res) => {
        try {
            const { kmlString } = req.query;

            return res.send(await callToFreeMapTools(kmlString));
        } catch (e) {
            return res.send({
                success: false,
                message: "Server Error",
                payload: e
            });
        }

        // try {
        //     console.log("before");

        //     let req = await axios.get(
        //         `${baseUrl}?kmlcoordinates=${kmlString}&rn=${rn}`,
        //         {
        //             cancelToken: new CancelToken(function executor(c) {
        //                 cancelRequest = c;
        //             }),
        //             responseType: "xml"
        //         }
        //     );

        //     console.log("after");
        //     return req;
        // } catch (e) {}
    }
};
