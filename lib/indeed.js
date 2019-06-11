const {
    BASE_URLS,
    combineJobsArr,
    getHtml,
    trimString,
    getUniqueJobs
} = require("./utils");
const cheerio = require("cheerio");

function parseHtmlToJobs(html) {
    const $ = cheerio.load(html);
    const jobs = [];

    $(".row.result").each((i, el) => {
        const _this = $(el);

        // don't show sponsored jobs - TODO: Change later so it can be optional
        const sponsored = $(".sponsoredGray", _this).text() || "";
        if (sponsored && sponsored === "Sponsored") return true;

        // Retrieve information
        const { title, href } = $(".title a", _this).attr();
        const location = $(".location", _this).text() || "";
        let company = $(".company a", _this).text() || "";
        let salary = $(".salarySnippet .salary", _this).text() || "";

        // trim info
        if (company) {
            company = trimString(company, "\n", "");
        }
        if (salary) {
            salary = trimString(salary, "\n", "");
        }

        jobs.push({
            title,
            href,
            company,
            location,
            salary
        });
    });

    return { jobs };
}

module.exports = {
    fetchIndeedJobs: async ({ query, zipcodes, radius }) => {
        const q = query || "";
        const r = radius || 5;
        let promises = [];

        if (zipcodes.length === 1) {
            let html = await getHtml(
                `${BASE_URLS.indeed}/jobs?q=${q}&l=${zipcodes[0]}&radius=${r}`
            );
            return await parseHtmlToJobs(html);
        }

        for (let i = 0, len = zipcodes.length; i < len; i++) {
            let zip = zipcodes[i];
            promises.push(
                await getHtml(
                    `${BASE_URLS.indeed}/jobs?q=${q}&l=${zip}&radius=${r}`
                )
            );
        }

        const allJobs = await Promise.all(
            promises.map(_html => parseHtmlToJobs(_html))
        );
        const combinedJobsArr = await combineJobsArr(allJobs);
        return getUniqueJobs(combinedJobsArr);
    }
};
