const {
    BASE_URLS,
    flattenArray,
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
        const a = $(".title a", _this);
        const href = BASE_URLS.indeed + $(a).attr("href");
        const { title } = $(a).attr();
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

    return jobs;
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
            const leJobs = await parseHtmlToJobs(html);
            return getUniqueJobs(leJobs);
        }

        for (let i = 0, len = zipcodes.length; i < len; i++) {
            promises.push(
                await getHtml(
                    `${BASE_URLS.indeed}/jobs?q=${q}&l=${
                        zipcodes[i]
                    }&radius=${r}`
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
