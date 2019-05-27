import React, { createContext, useState } from "react";
const { Provider, Consumer } = createContext();

const ConfigProvider = ({ children }) => {
	return <Provider value={{}}>{children}</Provider>;
};

export { ConfigProvider };
export default Consumer;
