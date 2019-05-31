import axios from "axios";

const locationApi = (() => {
    /**
     * @param {string} kmlString
     */
    const getZipCodes = async kmlString => {
        console.log(kmlString);

        try {
            const CancelToken = axios.CancelToken;
            let cancelRequest;

            const test = await axios.get("/api/getZipCodes", {
                params: {
                    kmlString
                },
                cancelToken: new CancelToken(function executor(c) {
                    cancelRequest = c;
                })
            });
        } catch (e) {}
    };

    return {
        getZipCodes
    };
})();

export { locationApi };
