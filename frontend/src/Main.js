import React, { useState, useEffect } from "react";
import { ConfigProvider } from "./utils/context";
import "./styles/Main.css";
const LeafletMap = React.lazy(() => import("./components/leafletMap"));
const Jobs = React.lazy(() => import("./components/jobs"));

const Main = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <div className="Main">
            {isLoading ? (
                <div className="global-loader">Loading...</div>
            ) : (
                <>
                    <ConfigProvider>
                        <LeafletMap />
                        <Jobs />
                    </ConfigProvider>
                </>
            )}
        </div>
    );
};

export default Main;
