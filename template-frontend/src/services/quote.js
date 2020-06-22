import axios from 'axios';
import {BACKEND, LOGIN_SERVICE} from '../configs/config';

const parseResp = (resp) => {
    const data = resp.data || {};
    const contents = data.data || {};

    return contents;
};

export function getQuote() {
    return axios.get(`${BACKEND}/api/quote`)
                .then(parseResp)
                .catch(error => {
                    checkForAuthorizationError(error);
                    // TODO - Replace if building frontend & backend
                    console.error('Unable to get Get Quotes: ' + error.message);
                    // throw new Error('Unable to get Get Quotes: ' + error.message);
                });
}

export function getQOD() {
    return axios.get(`${BACKEND}/api/quote/qod`)
        .then(parseResp)
        .catch(error => {
            checkForAuthorizationError(error);
            // TODO - Replace if building frontend & backend
            console.error('Unable to get Get Quotes: ' + error.message);
            // throw new Error('Unable to get Get Quotes: ' + error.message);
        });
}


/**
 * Checks whether the authorization status
 * @param error
 */
const checkForAuthorizationError = (error) => {
    const resp = error.response || {};
    const status = resp.status;
    if(status === 401){
        // Automatically redirect client to the login page
        window.location.href = LOGIN_SERVICE;
    }
};
