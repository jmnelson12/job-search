const {
    BASE_JOB_SITE_DATA,
    flattenArray,
    getHtml,
    trimString,
    getUniqueJobs,
    insertPlusSigns
} = require("./utils");
const cheerio = require("cheerio");

function parseHtml(html) {
    const $ = cheerio.load(html);
    const jobs = [];

    $(".jobs-search__results-list li.result-card.job-result-card").each(
        (i, el) => {
            const _this = $(el);

            const { href } = $("a.result-card__full-card-link", _this).attr();
            const title =
                $(".result-card__title.job-result-card__title", _this).text() ||
                "";
            let company =
                $(
                    "a.result-card__subtitle-link.job-result-card__subtitle-link",
                    _this
                ).text() || "";
            const location =
                $(".job-result-card__location", _this).text() || "";

            if (company) {
                company = trimString(company, "\n", "");
            }

            jobs.push({ href, title, company, location });
        }
    );

    return jobs;
}

module.exports = {
    fetchLinkedinJobs: async ({ query, zipcodes }) => {
        const q = insertPlusSigns(query) || "";
        let promises = [];

        if (zipcodes.length === 1) {
            const html = await getHtml(
                `${
                    BASE_JOB_SITE_DATA.linkedin.url
                }/jobs/search?keywords=${q}&location=${
                    zipcodes[0]
                }&redirect=false&position=1&pageNum=0`
            );
            const leJobs = await parseHtml(html);
            return getUniqueJobs(leJobs);
        }

        for (let i = 0, len = zipcodes.length; i < len; i++) {
            promises.push(
                await getHtml(
                    `${
                        BASE_JOB_SITE_DATA.linkedin.url
                    }/jobs/search?keywords=${q}&location=${
                        zipcodes[i]
                    }&redirect=false&position=1&pageNum=0`
                )
            );
        }

        const allJobs = await Promise.all(
            promises.map(_html => parseHtml(_html))
        );
        const combinedJobsArr = await flattenArray(allJobs);
        return getUniqueJobs(combinedJobsArr);
    }
};
