const axios = require("axios");

module.exports = {
    BASE_JOB_SITE_DATA: {
        glassdoor: {
            url: "https://www.glassdoor.com",
            title: "Glassdoor",
            icon: "/Images/glassdoor-icon.png"
        },
        indeed: {
            url: "https://www.indeed.com",
            title: "Indeed",
            icon: "/Images/indeed-icon.png"
        },
        linkedin: {
            url: "https://www.linkedin.com",
            title: "Linkedin",
            icon: "/Images/linkedin-icon.png"
        }
    },
    sliceArray: (arr, start, end) => {
        return arr.slice(start, end);
    },
    getZipIntArrayFromString: str => {
        return str.split(",").map(zipStr => parseInt(zipStr));
    },
    getHtml: async url => {
        const { data: html } = await axios.get(url);
        return html;
    },
    insertPlusSigns: str => {
        return str.split(" ").join("+");
    },
    trimString: (str, rule, replace) => {
        return str.replace(rule, replace).trim();
    },
    flattenArray: arr => {
        return [].concat.apply([], arr);
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
