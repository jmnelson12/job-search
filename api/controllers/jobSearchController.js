const Glassdoor = require("../../lib/glassdoor");
const GoogleJobs = require("../../lib/googleJobs");
const Indeed = require("../../lib/indeed");
const Linkedin = require("../../lib/linkedin");
const ZipRecruiter = require("../../lib/zipRecruiter");

module.exports = {
    getAllJobs: async (req, res) => {
        const [
            glassdoorJobs,
            googleJobs,
            indeedJobs,
            linkedinJobs,
            zipRecruiterJobs
        ] = await Promise.all([
            getGlassdoorJobs,
            getGoogleJobs,
            getIndeedJobs,
            getLinkedinJobs,
            getZipRecruiterJobs
        ]);
    },
    getGlassdoorJobs: async (req, res) => {},
    getGoogleJobs: async (req, res) => {},
    getIndeedJobs: async (req, res) => {
        const { query, zipcode, radius } = req.query;
        Indeed.fetchIndeedJobs({ query, zipcode, radius });

        return res.send({ success: true });
    },
    getLinkedinJobs: async (req, res) => {},
    getZipRecruiterJobs: async (req, res) => {}
};
