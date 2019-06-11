const axios = require("axios");

module.exports = {
    BASE_URLS: {
        glassdoor: "",
        googleJobs: "",
        indeed: "https://www.indeed.com/",
        linkedin: "",
        zipRecruiter: ""
    },
    getHtml: async url => {
        const { data: html } = await axios.get(url);
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
