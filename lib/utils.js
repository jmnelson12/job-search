const axios = require("axios");

module.exports = {
    BASE_URLS: {
        glassdoor: "",
        googleJobs: "",
        indeed: "https://www.indeed.com/jobs",
        linkedin: "",
        zipRecruiter: ""
    },
    getHtml: async url => {
        const { data: html } = await axios.get(url);
        return html;
    }
};
