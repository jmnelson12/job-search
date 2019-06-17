const axios = require("axios");

module.exports = {
    BASE_URLS: {
        glassdoor: "https://www.glassdoor.com",
        googleJobs: "",
        indeed: "https://www.indeed.com",
        linkedin: "https://www.linkedin.com"
    },
    getHtml: async url => {
        const { data: html } = await axios.get(
            "https://www.glassdoor.com/Job/jobs.htm?clickSource=searchBtn&typedKeyword=Programmer&sc.keyword=Programmer&locT=C&locId=1138697"
        );
        return html;
    },
    trimString: (str, rule, replace) => {
        return str.replace(rule, replace).trim();
    },
    combineJobsArr: arr => {
        return [].concat.apply([], arr.map(({ jobs }) => jobs));
    },
    getUniqueJobs: arr => {
        return arr.reduce((acc, cur) => {
            const fccidStr =
                cur.href
                    .split("fccid")
                    .pop()
                    .split("&")
                    .shift()
                    .replace(/=/g, "") || "unlucky";
            const x = acc.find(
                job =>
                    (job.title === cur.title && job.company === cur.company) ||
                    job.href.indexOf(fccidStr) !== -1
            );
            if (!x) {
                return acc.concat([cur]);
            } else {
                return acc;
            }
        }, []);
    }
};
