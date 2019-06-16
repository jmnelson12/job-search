/**
 * jobs/search?keywords=Programmer&location=57006&redirect=false&position=1&pageNum=0
 */
const {
    BASE_URLS,
    combineJobsArr,
    getHtml,
    trimString,
    getUniqueJobs
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
    // putting in brackets for a reason
    // using these brackets to easier combine list of all jobs
    return { jobs };
}

module.exports = {
    fetchLinkedinJobs: async ({ query, zipcodes }) => {
        const q = query || "";
        let promises = [];

        if (zipcodes.length === 1) {
            const html = await getHtml(
                `${BASE_URLS.linkedin}/jobs/search?keywords=${q}&location=${
                    zipcodes[0]
                }&redirect=false&position=1&pageNum=0`
            );
            const leJobs = await parseHtml(html);
            return getUniqueJobs(leJobs);
        }

        for (let i = 0, len = zipcodes.length; i < len; i++) {
            let zip = zipcodes[i];
            promises.push(
                await getHtml(
                    `${
                        BASE_URLS.linkedin
                    }/jobs/search?keywords=${q}&location=${zip}&redirect=false&position=1&pageNum=0`
                )
            );
        }

        const allJobs = await Promise.all(
            promises.map(_html => parseHtml(_html))
        );
        const combinedJobsArr = await combineJobsArr(allJobs);
        return getUniqueJobs(combinedJobsArr);
    }
};
