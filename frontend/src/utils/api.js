import axios from "axios";

const locationApi = (() => {
    /**
     * @param {string} kmlString
     */
    const getZipCodes = async kmlString => {
        try {
            const CancelToken = axios.CancelToken;
            let cancelRequest;

            return await axios.get("/api/getZipCodes", {
                params: {
                    kmlString
                },
                cancelToken: new CancelToken(function executor(c) {
                    cancelRequest = c;
                })
            });
        } catch (e) {
            // global error
        }
    };

    return {
        getZipCodes
    };
})();

export { locationApi };
