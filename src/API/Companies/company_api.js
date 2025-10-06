import { AXIOS, makeServerRequest } from "../../Requests/makeRequest.js";

export const getCompanies = (successFunction, failureFunction) => {
    makeServerRequest( AXIOS.GET, {}, successFunction, failureFunction);
};