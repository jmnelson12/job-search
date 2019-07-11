import React, { useState, useEffect } from "react";
import Consumer from "../utils/context";
import { jobSearchApi } from "../utils/api";
import "../styles/jobs.css";

const JobSearch = React.lazy(() => import("./jobSearch"));
const JobResults = React.lazy(() => import("./jobResults"));

const Jobs = () => {
    const [query, setQuery] = useState("Full Stack Developer");
    const [radius, setRadius] = useState("5");
    const [jobResultsState, setJobResultsState] = useState({
        isLoading: true,
        jobsPayload: null
    });

    useEffect(() => {
        setJobResultsState({
            isLoading: false,
            jobsPayload: null
        });
    }, []);

    const handleQueryInputChange = e => {
        setQuery(e.target.value);
    };
    const handleRadiusChange = e => {
        setRadius(e.target.value);
    };
    const handleSubmit = (e, ctx) => {
        setJobResultsState({
            isLoading: true,
            jobsPayload: null
        });
        jobSearchApi
            .getAllJobs(query, ctx.locationData.allZips, radius, ctx)
            .then(res => {
                const { data } = res;

                if (res.statusText === "OK" && data.success) {
                    setJobResultsState({
                        isLoading: false,
                        jobsPayload: data.payload
                    });
                } else {
                    // set global error
                    setJobResultsState({
                        isLoading: false,
                        jobsPayload: null
                    });
                }
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
                            <JobResults state={jobResultsState} />
                        </>
                    );
                }}
            </Consumer>
        </div>
    );
};

export default Jobs;
