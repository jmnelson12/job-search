const {
    BASE_URLS,
    combineJobsArr,
    getHtml,
    trimString,
    getUniqueJobs
} = require("./utils");
const cheerio = require("cheerio");
const axios = require("axios");

async function getLocData(zip) {
    return await axios.get(
        `https://www.glassdoor.com/findPopularLocationAjax.htm?term=${zip}`
    );
}
function parseHtmlToJobs(html) {}

//https://www.glassdoor.com/Job/jobs.htm?clickSource=searchBtn&typedKeyword=Programmer&sc.keyword=Programmer&locT=C&locId=1138697
// https://www.glassdoor.com/findPopularLocationAjax.htm?term=27706&maxLocationsToReturn=10
module.exports = {
    fetchGlassdoorJobs: async ({ query, zipcodes, radius }) => {
        const _zipPromises = await zipcodes.map(_zip => {
            return getLocData(_zip);
        });

        const _zipData = await Promise.all(_zipPromises.map(_zips => _zips));

        console.log(_zipData);
        return "oi";
    }
};
