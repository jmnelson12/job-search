import React, { useState, useEffect } from "react";
import Consumer from "../utils/context";
import { jobSearchApi } from "../utils/api";
import "../styles/jobs.css";

const JobSearch = React.lazy(() => import("./jobSearch"));
const JobResults = React.lazy(() => import("./jobResults"));

const Jobs = () => {
    const [query, setQuery] = useState("Full Stack Developer");
    const [radius, setRadius] = useState("5");
    const [isLoading, setIsLoading] = useState(true);
    const [jobsPayload, setJobsPayload] = useState(null);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleQueryInputChange = e => {
        setQuery(e.target.value);
    };
    const handleRadiusChange = e => {
        setRadius(e.target.value);
    };
    const handleSubmit = (e, ctx) => {
        setIsLoading(true);
        jobSearchApi
            .getAllJobs(query, ctx.locationData.allZips, radius, ctx)
            .then(res => {
                const { data } = res;

                if (res.statusText === "OK" && data.success) {
                    setJobsPayload(data.payload);
                } else {
                    // set global error
                    setJobsPayload(null);
                }
                setIsLoading(false);
            });
    };

    return (
        <div className="jobs-wrapper">
            <Consumer>
                {ctx => {
                    return (
                        <>
                            <JobSearch
                                values={{ query, radius }}
                                handleQueryInputChange={handleQueryInputChange}
                                handleRadiusChange={handleRadiusChange}
                                handleSubmit={e => {
                                    handleSubmit(e, ctx);
                                }}
                            />
                            <JobResults
                                jobsPayload={jobsPayload}
                                isLoading={isLoading}
                            />
                        </>
                    );
                }}
            </Consumer>
        </div>
    );
};

export default Jobs;
