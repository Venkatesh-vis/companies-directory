import axios from 'axios';

export const AXIOS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
}


export const makeServerRequest = (requestURL, requestMethod, requestBody, successCallBackFunction, failureCallBackFunction) => {
    const requestConfiguration = {
        method: requestMethod,
        url: requestURL,
        data: requestBody,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };
    axios(requestConfiguration)
        .then(
            function (serverResponse) {
                successCallBackFunction(serverResponse.data, serverResponse.status)
            }
        )
        .catch(function (err) {
            console.log(err)
            failureCallBackFunction(err.response)
        })
};
