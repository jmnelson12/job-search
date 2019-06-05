import React, { createContext, useState } from "react";
const { Provider, Consumer } = createContext();

const ConfigProvider = ({ children }) => {
    // const [isCallingToLocs, setIsCallingToLocs]
    const [locationData, setLocationData] = useState([]);
    /**
     * globalMessage types:
     * 	- info
     *  - danger
     *  - success
     */
    const [globalMessage, setGlobalMessage] = useState({
        type: "info",
        message: ""
    });

    return (
        <Provider
            value={{
                locationData,
                setLocationData,
                globalMessage,
                setGlobalMessage
            }}>
            {children}
        </Provider>
    );
};

export { ConfigProvider };
export default Consumer;
