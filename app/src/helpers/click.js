import axios from "axios";

export const ClickMe = async (callback) => {
    const mastercardReportHTTPRequest = await axios.get("https://ipcenter.ipsoft.com/IPcal/viewDay.htm?allCalendars=true&date=2018-05-16&clientClientName=MasterCard&sortOption=End%20Date&selectedDisplayEventType=All%20Types&_dc=1526606767394");
    return callback(mastercardReportHTTPRequest);
}