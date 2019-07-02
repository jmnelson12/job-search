import React, { useState, useEffect } from "react";

const JobResults = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <div className="job-results-wrapper">
            {isLoading ? (
                <div className="internal-loader">Loading...</div>
            ) : (
                <>
                    <h1>Job Results</h1>
                </>
            )}
        </div>
    );
};

export default JobResults;
