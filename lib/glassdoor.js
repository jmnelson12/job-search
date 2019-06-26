const {
    BASE_JOB_SITE_DATA,
    flattenArray,
    getHtml,
    trimString,
    getUniqueJobs,
    insertPlusSigns
} = require("./utils");
const cheerio = require("cheerio");
const axios = require("axios");

async function getLocData(zip) {
    return await axios.get(
        `https://www.glassdoor.com/findPopularLocationAjax.htm?term=${zip}`
    );
}
function filterZipData(zipsArr) {
    return flattenArray(
        zipsArr.map(locObj => {
            const { data } = locObj;
            return data.filter(obj => {
                return obj.countryName.indexOf("United States") !== -1;
            });
        })
    );
}
function parseHtmlToJobs(html) {
    const $ = cheerio.load(html);
    const jobs = [];

    $("#JobResults ul.jlGrid li.jl").each((i, el) => {
        const _this = $(el);

        const a = $("a.jobLink", _this);
        const href = BASE_JOB_SITE_DATA.glassdoor.url + $(a).attr("href");
        const title = $(a).text() || "";
        let company = $(".jobEmpolyerName", _this).text() || "";
        const location = $(".empLoc span.loc", _this).text() || "";

        if (company) {
            company = trimString(company, "\n", "");
        }

        jobs.push({ href, title, company, location });
    });

    return jobs;
}

module.exports = {
    fetchGlassdoorJobs: async ({ query, zipcodes, radius }) => {
        const q = insertPlusSigns(query) || "";
        const r = radius || 5;
        const _zipPromises = await zipcodes.map(_zip => {
            return getLocData(_zip);
        });
        let promises = [];

        const _zipData = await Promise.all(_zipPromises.map(_zips => _zips));
        const zipCodeArr = filterZipData(_zipData);

        for (let i = 0, len = zipCodeArr.length; i < len; i++) {
            promises.push(
                await getHtml(
                    `${
                        BASE_JOB_SITE_DATA.glassdoor.url
                    }/Job/jobs.htm?clickSource=searchBtn&typedKeyword=${q}&radius=${r}&sc.keyword=${1}&locT=C&locId=${
                        zipCodeArr[i].realId
                    }`
                )
            );
        }

        const allJobs = await Promise.all(
            promises.map(_html => parseHtmlToJobs(_html))
        );
        const combinedJobsArr = await flattenArray(allJobs);
        return getUniqueJobs(combinedJobsArr);
    }
};
