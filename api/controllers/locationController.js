const { callToFreeMapTools } = require("../../lib/freeMapTools");

module.exports = {
    getZipCodes: async (req, res) => {
        const { kmlString } = req.query;
        // return await callToFreeMapTools(kmlString);
        let grabZips = await callToFreeMapTools(kmlString);

        console.log("-----");
        console.log(grabZips);
        console.log("-----");

        return res.send({
            success: true,
            message: "Success",
            payload: { a: "oi" }
        });

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
