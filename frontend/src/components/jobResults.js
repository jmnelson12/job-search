import React from "react";

const JobResults = ({ jobsPayload, isLoading }) => {
    if (jobsPayload) {
        console.log(jobsPayload);
    }
    return (
        <div className="job-results-wrapper">
            {isLoading ? (
                <div className="internal-loader">Loading...</div>
            ) : (
                <>
                    {jobsPayload && (
                        <>
                            <h4>Job Results</h4>
                            <p>total results: {jobsPayload.totalResults}</p>
                            <hr />
                            <div className="results-wrapper">
                                {jobsPayload.indeed.jobCount !== 0 && (
                                    <div className="indeed-wrapper">
                                        <div className="logo-wrapper">
                                            <a href="https://google.com">
                                                <img
                                                    src={""}
                                                    alt=""
                                                    className="logo"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                )}
                                {jobsPayload.linkedinJobs.jobCount !== 0 && (
                                    <div className="linkedin-wrapper" />
                                )}
                                {jobsPayload.glassdoor.jobCount !== 0 && (
                                    <div className="glassdoor-wrapper" />
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default JobResults;
