import React from "react";

const JobResults = ({ state }) => {
    const { isLoading, jobsPayload } = state;

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
                                        <div className="site-info-wrapper">
                                            <div className="logo-wrapper">
                                                <a
                                                    href={
                                                        jobsPayload.indeed
                                                            .siteData.url
                                                    }>
                                                    <img
                                                        src={
                                                            jobsPayload.indeed
                                                                .siteData.icon
                                                        }
                                                        alt="indeed"
                                                        className="logo"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="job-listings-wrapper">
                                            <div className="total-site-jobs">
                                                <p className="site-jobs-found">
                                                    {
                                                        jobsPayload.indeed
                                                            .jobCount
                                                    }
                                                </p>
                                                <ul className="job-listings">
                                                    {jobsPayload.indeed.jobListings.map(
                                                        (job, key) => (
                                                            <li
                                                                className="listing"
                                                                key={key}>
                                                                <div className="listing-titile-wrapper">
                                                                    <h4 className="listing-title">
                                                                        {
                                                                            job.title
                                                                        }
                                                                    </h4>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {jobsPayload.linkedinJobs.jobCount !== 0 && (
                                    <div className="linkedin-wrapper">
                                        <div className="site-info-wrapper">
                                            <div className="logo-wrapper">
                                                <a
                                                    href={
                                                        jobsPayload.linkedinJobs
                                                            .siteData.url
                                                    }>
                                                    <img
                                                        src={
                                                            jobsPayload
                                                                .linkedinJobs
                                                                .siteData.icon
                                                        }
                                                        alt="indeed"
                                                        className="logo"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="job-listings-wrapper">
                                            <div className="total-site-jobs">
                                                <p className="site-jobs-found">
                                                    {
                                                        jobsPayload.linkedinJobs
                                                            .jobCount
                                                    }
                                                </p>
                                                <ul className="job-listings">
                                                    {jobsPayload.linkedinJobs.jobListings.map(
                                                        (job, key) => (
                                                            <li
                                                                className="listing"
                                                                key={key}>
                                                                <div className="listing-titile-wrapper">
                                                                    <h4 className="listing-title">
                                                                        {
                                                                            job.title
                                                                        }
                                                                    </h4>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {jobsPayload.glassdoor.jobCount !== 0 && (
                                    <div className="glassdoor-wrapper">
                                        <div className="site-info-wrapper">
                                            <div className="logo-wrapper">
                                                <a
                                                    href={
                                                        jobsPayload.glassdoor
                                                            .siteData.url
                                                    }>
                                                    <img
                                                        src={
                                                            jobsPayload
                                                                .glassdoor
                                                                .siteData.icon
                                                        }
                                                        alt="indeed"
                                                        className="logo"
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="job-listings-wrapper">
                                            <div className="total-site-jobs">
                                                <p className="site-jobs-found">
                                                    {
                                                        jobsPayload.glassdoor
                                                            .jobCount
                                                    }
                                                </p>
                                                <ul className="job-listings">
                                                    {jobsPayload.glassdoor.jobListings.map(
                                                        (job, key) => (
                                                            <li
                                                                className="listing"
                                                                key={key}>
                                                                <div className="listing-titile-wrapper">
                                                                    <h4 className="listing-title">
                                                                        {
                                                                            job.title
                                                                        }
                                                                    </h4>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
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
