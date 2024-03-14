import axios from 'axios';
import {BACKEND} from '../configs/config';
import { NODE_API_ROOT } from '../configs/config';

const parseResp = (resp) => {
    const data = resp.data || [];

    return data;
};

export function getBarcode(plateType, numOfBarcodes) {
    return axios.get(`${BACKEND}/api/getBarcode/plateBarcode?plateType=${plateType}&numOfBarcodes=${numOfBarcodes}`)
                .then(resp => {return parseResp(resp); })
                .catch(error => {
                    // TODO - Replace if building frontend & backend
                    console.error(`Unable to generate barcodes: ${error}`);
                    // throw new Error('Unable to generate barcodes: ' + error.message);
                });
};
export const getPicklist = (name) => {
    const url = `${NODE_API_ROOT}/picklist?picklist=${name}`;
    return axios
        .get(url)
        .then((resp) => {
            return resp;
        })
        .catch((error) => {
            throw error;
        })
        .then((resp) => {
            return resp;
        });
};