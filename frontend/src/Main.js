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
                    <div className="instructions">
                        <h2>Instructions:</h2>
                        <ul>
                            <li>
                                Resize page (zoom in and out) to view map. Weird
                                Leaflet map bug. Couldn't find fix
                            </li>
                            <li>
                                Select area using top right (pentagon) button
                            </li>
                            <li>Search</li>
                        </ul>
                    </div>
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
