import axios from 'axios';
import {BACKEND} from '../configs/config';

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

export function getPlateTypes() {
    return axios.get(`${BACKEND}/api/getBarcode/picklist`)
        .then(resp => {return resp;})
        .catch(error => console.error(`Unable to load plate type picklist: ${error}`));
};

// export function exportExcel(barcodeList) {
//     return axios.get(`${BACKEND}/api/exportExcel/columns=${barcodeList}`)
//                 .then(resp => {return parseResp(resp); })
//                 .catch(error => {
//                     // TODO - Replace if building frontend & backend
//                     console.error('Unable to export to excel: ' + error.message);
//                     // throw new Error('Unable to generate barcodes: ' + error.message);
//                 });
// };