import RequestManager from "../../requestManager.js";

export async function getTests() {
    const requestManager = new RequestManager('http://localhost:3000');
    return await requestManager.sendRequest(
        `/test/list`,
        'GET'
    );
}