import React, { useState } from "react";
import Consumer from "../utils/context";
import "../styles/jobs.css";

const JobSearch = React.lazy(() => import("./jobSearch"));
const JobResults = React.lazy(() => import("./jobResults"));

const Jobs = () => {
    const [query, setQuery] = useState("");
    const [radius, setRadius] = useState("5");
    const handleQueryInputChange = e => {
        setQuery(e.target.value);
    };
    const handleRadiusChange = e => {
        setRadius(e.target.value);
    };
    const handleSubmit = (e, ctx) => {
        console.log(
            "submitted",
            { query, radius, locData: ctx.locationData },
            ctx
        );
    };

    return (
        <div className="jobs-wrapper">
            <h1>Jobs</h1>
            <hr />
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
                            <JobResults />
                        </>
                    );
                }}
            </Consumer>
        </div>
    );
};

export default Jobs;
