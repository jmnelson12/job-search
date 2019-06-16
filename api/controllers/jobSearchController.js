const Glassdoor = require("../../lib/glassdoor");
const GoogleJobs = require("../../lib/googleJobs");
const Indeed = require("../../lib/indeed");
const Linkedin = require("../../lib/linkedin");
const ZipRecruiter = require("../../lib/zipRecruiter");

const getGlassdoorJobs = async function(req, res) {};
const getGoogleJobs = async function(req, res) {};
const getIndeedJobs = async function(req, res) {
    try {
        const { query, zipcodes, radius } = req.query;
        let zipArray = zipcodes.split(",").map(zipStr => parseInt(zipStr));
        if (zipArray.length === 0) throw "FAILURE";

        if (zipArray.length > 30) {
            zipArray = zipArray.slice(29);
        }

        const jobs = await Indeed.fetchIndeedJobs({
            query,
            zipcodes: zipArray,
            radius
        });
        return res.send({
            success: true,
            message: "Success",
            company: "Indeed",
            payload: jobs
        });
    } catch (e) {
        console.error(e);
        return res.send({
            success: false,
            messaage: "Error Fetching Indeed Jobs. Please try again."
        });
    }
};
const getLinkedinJobs = async function(req, res) {
    try {
        const { query, zipcodes } = req.query;
        let zipArray = zipcodes.split(",").map(zipStr => parseInt(zipStr));
        if (zipArray.length === 0) throw "FAILURE";

        if (zipArray.length > 30) {
            zipArray = zipArray.slice(29);
        }

        const jobs = await Linkedin.fetchLinkedinJobs({
            query,
            zipcodes: zipArray
        });
        return res.send({
            success: true,
            message: "Success",
            company: "Linkedin",
            payload: jobs
        });
    } catch (e) {
        console.error(e);
        return res.send({
            success: false,
            messaage: "Error Fetching Indeed Jobs. Please try again."
        });
    }
};
const getZipRecruiterJobs = async function(req, res) {};
const getAllJobs = async function(req, res) {
    try {
        const [
            glassdoorJobs,
            googleJobs,
            indeedJobs,
            linkedinJobs,
            zipRecruiterJobs
        ] = await Promise.all([
            getGlassdoorJobs(req, res),
            getGoogleJobs(req, res),
            getIndeedJobs(req, res),
            getLinkedinJobs(req, res),
            getZipRecruiterJobs(req, res)
        ]);

        return res.send({
            success: true,
            payload: {
                glassdoorJobs,
                googleJobs,
                indeedJobs,
                linkedinJobs,
                zipRecruiterJobs
            }
        });
    } catch (e) {
        return res.send({
            success: false,
            message: "Error fetching all jobs"
        });
    }
};

module.exports = {
    getGlassdoorJobs: getGlassdoorJobs,
    getGoogleJobs: getGoogleJobs,
    getIndeedJobs: getIndeedJobs,
    getLinkedinJobs: getLinkedinJobs,
    getZipRecruiterJobs: getZipRecruiterJobs,
    getAllJobs: getAllJobs
};
