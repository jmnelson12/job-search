const axios = require("axios");
const { parseString } = require("xml2js");

const callToFreeMapTools = async kmlString => {
    const rn = Math.floor(Math.random() * 9999);
    const baseUrl =
        "https://www.freemaptools.com/ajax/us/get-zipcodes-inside-polygon.php";

    const siteCall = await axios.get(
        `${baseUrl}?kmlcoordinates=${kmlString}&rn=${rn}`
    );

    if (siteCall && siteCall.data) {
        const locsArray = parseXmlToLocs(siteCall.data);

        return {
            success: true,
            message: "Success",
            payload: "hey :):)"
        };
    }
    return {
        success: false,
        message: "Server Error: fmtctfmt",
        payload: null
    };
};

const parseXmlToLocs = async res => {
    // parseString(res, (err, parsedRes) => {
    //     if (err) return null;

    //     console.log(parsedRes);

    //     return parsedRes;
    // });

    const oi = await parseString(res);

    console.log(oi.onend());

    return "bye";

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
