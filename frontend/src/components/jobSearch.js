import React from "react";

const JobSearch = ({
    query,
    radius,
    handleQueryInputChange,
    handleRadiusChange,
    handleSubmit
}) => {
    return (
        <div className="job-search-wrapper">
            <div className="input-group">
                <input
                    type="text"
                    id="txtJobSearch"
                    placeholder={"Search Jobs..."}
                    value={query}
                    onChange={handleQueryInputChange}
                />
            </div>
            <div className="input-group">
                <select
                    onChange={handleRadiusChange}
                    name="selRadius"
                    id="selRadius"
                    defaultValue={radius}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                </select>
            </div>
            <div className="input-group">
                <input type="button" value="Search" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default JobSearch;
