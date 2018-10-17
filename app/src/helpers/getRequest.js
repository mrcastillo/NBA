import axios from "axios";

export const getPostData = (postData) => {
    
    //console.log(JSON.stringify(postData.rotation.text));
    console.log(postData.timeframe.inputText);

    /*
    const rotation = postData.rotation.text;
    const status = postData.status;
    const timeframe = postData.timeframe.text;
    const description = postData.description.text;
    const resource = postData.resource.text;
    const rfc = postData.rfc.text;
    const ipsoft_ticket = postData.ipsoft_ticket.text;

    const result = axios.post("http://localhost:8080/addTableTest", {
        rotation: rotation,
        status: status,
        timeframe: timeframe,
        description: description,
        resource: resource,
        rfc: rfc,
        ipsoft_ticket: ipsoft_ticket
    });

    return result;
    */
}