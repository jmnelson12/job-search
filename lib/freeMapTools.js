const axios = require("axios");

const callToFreeMapTools = async kmlString => {
    const rn = Math.floor(Math.random() * 9999);
    const baseUrl =
        "https://www.freemaptools.com/ajax/us/get-zipcodes-inside-polygon.php";

    try {
        let req = await axios
            .get(`${baseUrl}?kmlcoordinates=${kmlString}&rn=${rn}`)
            .then(res => {
                if (res) {
                    console.log(res);
                    console.log("----------");
                    console.log(parseXml(res));
                    console.log("=====================");
                    return {
                        success: true,
                        message: "Success",
                        payload: parseXml(res)
                    };
                }
                throw "Failed to grab zip codes";
            });
    } catch (e) {
        return {
            success: false,
            message: "Server Error: fmtctfmt",
            payload: e
        };
    }
};

const parseXml = res => {
    // let combinedOutput = [];
    // try {
    //     const xmarkers = xml.documentElement.getElementsByTagName("postcode");
    //     for (let i = 0, len = xmarkers.length; i < len; i++) {
    //         const zipcode = xmarkers[i].getAttribute("pc");
    //         const city = xmarkers[i].getAttribute("city");
    //         const state = xmarkers[i].getAttribute("state");
    //         combinedOutput.push({
    //             zipcode,
    //             city,
    //             state,
    //             cityState: `${city}, ${state}`,
    //             cityStateZip: `${city}, ${state} - ${zipcode}`
    //         });
    //     }
    //     return combinedOutput;
    // } catch (e) {
    //     return combinedOutput;
    // }
};

module.exports = {
    callToFreeMapTools
};
