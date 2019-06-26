const Glassdoor = require("../../lib/glassdoor");
const Indeed = require("../../lib/indeed");
const Linkedin = require("../../lib/linkedin");
const {
    BASE_JOB_SITE_DATA,
    sliceArray,
    getZipIntArrayFromString
} = require("../../lib/utils");

const getGlassdoorJobs = async function(req, res) {
    try {
        const { query, zipcodes, radius } = req.query;
        let zipArray = getZipIntArrayFromString(zipcodes);
        if (zipArray.length === 0) throw "FAILURE";

        if (zipArray.length > 30) {
            zipArray = sliceArray(zipArray, 0, 29);
        }

        const jobs = await Glassdoor.fetchGlassdoorJobs({
            query,
            zipcodes: zipArray,
            radius
        });

        return res.send({
            success: true,
            message: "Success",
            company: "Glassdoor",
            payload: jobs
        });
    } catch (e) {
        console.error(e);
        return res.send({
            success: false,
            messaage: "Error Fetching Glassdoor Jobs. Please try again."
        });
    }
};
const getIndeedJobs = async function(req, res) {
    try {
        const { query, zipcodes, radius } = req.query;
        let zipArray = getZipIntArrayFromString(zipcodes);
        if (zipArray.length === 0) throw "FAILURE";

        if (zipArray.length > 30) {
            zipArray = sliceArray(zipArray, 0, 29);
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
        let zipArray = getZipIntArrayFromString(zipcodes);
        if (zipArray.length === 0) throw "FAILURE";

        if (zipArray.length > 30) {
            zipArray = sliceArray(zipArray, 0, 29);
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
            messaage: "Error Fetching Linkedin Jobs. Please try again."
        });
    }
};
const getAllJobs = async function(req, res) {
    try {
        const { query, zipcodes, radius } = req.query;

        let zipArray = getZipIntArrayFromString(zipcodes);
        if (zipArray.length === 0) throw "FAILURE";

        if (zipArray.length > 30) {
            zipArray = sliceArray(zipArray, 0, 29);
        }

        const [glassdoorJobs, indeedJobs, linkedinJobs] = await Promise.all([
            await Glassdoor.fetchGlassdoorJobs({
                query,
                zipcodes: zipArray,
                radius
            }),
            await Indeed.fetchIndeedJobs({
                query,
                zipcodes: zipArray,
                radius
            }),
            await Linkedin.fetchLinkedinJobs({
                query,
                zipcodes: zipArray
            })
        ]);

        const glassdoorJobLength = glassdoorJobs.length;
        const indeedJobLength = indeedJobs.length;
        const linkedinJobLength = linkedinJobs.length;

        return res.send({
            success: true,
            payload: {
                totalResults:
                    glassdoorJobLength + indeedJobLength + linkedinJobLength,
                query,
                zipArray,
                zipcodesSeached: zipArray.length,
                radius,
                glassdoor: {
                    jobCount: glassdoorJobLength,
                    siteData: BASE_JOB_SITE_DATA.glassdoor,
                    jobListings: glassdoorJobs
                },
                indeed: {
                    jobCount: indeedJobLength,
                    siteData: BASE_JOB_SITE_DATA.indeed,
                    jobListings: indeedJobs
                },
                linkedinJobs: {
                    jobCount: linkedinJobLength,
                    siteData: BASE_JOB_SITE_DATA.linkedin,
                    jobListings: linkedinJobs
                }
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
    getIndeedJobs: getIndeedJobs,
    getLinkedinJobs: getLinkedinJobs,
    getAllJobs: getAllJobs
};
