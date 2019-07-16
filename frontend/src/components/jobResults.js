import React from "react";
const JobItem = React.lazy(() => import("./jobItem"));

const JobResults = ({ state }) => {
    const { isLoading, jobsPayload } = state;

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
                                <JobItem jobData={jobsPayload.indeed} />
                                <JobItem jobData={jobsPayload.linkedinJobs} />
                                <JobItem jobData={jobsPayload.glassdoor} />
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default JobResults;
