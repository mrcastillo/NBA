import axios from "axios";

export const getReport = async (callback) => {
    const mastercardReportHTTPRequest = await axios.get("http://localhost:8080/report");
    return callback(mastercardReportHTTPRequest);
}