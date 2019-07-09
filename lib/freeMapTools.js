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
        const locsArray = await parseXmlToLocs(siteCall.data);
        return {
            success: true,
            message: "Success",
            payload: locsArray
        };
    }
    return {
        success: false,
        message: "Server Error: fmtctfmt",
        payload: null
    };
};

const parseXmlToLocs = async res => {
    let combinedOutput = [];
    let allZips = [];
    await parseString(res, (err, parsedRes) => {
        if (err) return combinedOutput;
        const postcodeList = parsedRes.postcodes.postcode || [];

        for (let i = 0, len = postcodeList.length; i < len; i++) {
            const tempData = postcodeList[i]["$"];
            const zipcode = tempData.pc;
            const { city, state, lat, lng } = tempData;

            allZips.push(zipcode);
            combinedOutput.push({
                zipcode,
                city,
                state,
                cityState: `${city}, ${state}`,
                cityStateZip: `${city}, ${state} ${zipcode}`,
                lat,
                lng
            });
        }
    });
    return { allZips, locData: combinedOutput };
};

module.exports = {
    callToFreeMapTools
};
