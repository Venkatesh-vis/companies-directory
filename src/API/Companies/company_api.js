import { AXIOS, makeServerRequest } from "../../Requests/makeRequest.js";

export const getCompanies = (successFunction, failureFunction) => {
    const url = 'http://localhost:4000/companies';
    makeServerRequest(url, AXIOS.GET, {}, successFunction, failureFunction);
};