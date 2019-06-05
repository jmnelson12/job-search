import axios from "axios";

const locationApi = (() => {
    /**
     * @param {string} kmlString
     */
    const getLocationInfo = async (kmlString, ctx) => {
        try {
            const CancelToken = axios.CancelToken;
            let cancelRequest;

            return await axios.get("/api/getLocationInfo", {
                params: {
                    kmlString
                },
                cancelToken: new CancelToken(function executor(c) {
                    cancelRequest = c;
                })
            });
        } catch (e) {
            // global error
            console.error(e);
            ctx.setGlobalMessage({
                type: "danger",
                message:
                    "Error Grabbing Zip Codes. Please refresh the page and try again. Sorry for the inconvenience."
            });
        }
    };

    return {
        getLocationInfo
    };
})();

export { locationApi };
