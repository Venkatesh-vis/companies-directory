import {data as LOCAL_DATA} from "../constants.js";

export const AXIOS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
}


export const makeServerRequest = (requestMethod, requestBody, successCallBackFunction, failureCallBackFunction) => {
    setTimeout(() => {
        try {
            const responseData = { companies: LOCAL_DATA.companies };
            successCallBackFunction(responseData, 200);
        } catch (err) {
            console.log(err);
            failureCallBackFunction({
                data: null,
                status: 500,
                statusText: 'Internal Server Error'
            });
        }
    }, 100);
};
