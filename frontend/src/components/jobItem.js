import React from "react";

const JobItem = ({ jobData }) => {
    return (
        <div className="jobs-wrapper">
            <div className="site-info-wrapper">
                <div className="logo-wrapper">
                    <a href={jobData.siteData.url}>
                        <img
                            src={jobData.siteData.icon}
                            alt="indeed"
                            className="logo"
                        />
                    </a>
                </div>
            </div>
            <div className="job-listings-wrapper">
                <div className="total-site-jobs">
                    <p className="site-jobs-found">Individual Site Results: {jobData.jobCount}</p>
                    <ul className="job-listings">
                        {jobData.jobListings.map((job, key) => (
                            <li className="listing" key={key}>
                                <div className="listing-titile-wrapper">
                                    <a
                                        href={job.href}
                                        rel="noopener noreferrer"
                                        target="_blank">
                                        <h4 className="listing-title">
                                            {job.title}
                                        </h4>
                                    </a>
                                    {job.company && (
                                        <p className="job-company">
                                            {job.company}
                                        </p>
                                    )}
                                    {job.location && (
                                        <p className="job-location">
                                            {job.location}
                                        </p>
                                    )}
                                    {job.salary && (
                                        <p className="job-salary">
                                            {job.salary}
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default JobItem;
