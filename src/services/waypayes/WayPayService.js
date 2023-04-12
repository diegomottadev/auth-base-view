import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const WAY_PAY_API_BASE_URL = `${BASE_URL}/waypayes`;

class WayPayService {

    createWayPay = (waypay) => {
        return axios.post(WAY_PAY_API_BASE_URL, waypay);
    };


    getWayPay = (waypayId) => {
        return axios.get(`${WAY_PAY_API_BASE_URL}/${waypayId}`);
    };

    updateWayPay = async (waypayId, body) => {
        const response = await axios.put(`${WAY_PAY_API_BASE_URL}/${waypayId}`, body);
        return response.data;
    };

    allWayPayes = async (params) => {
        console.log(params.search)
        let url = `${WAY_PAY_API_BASE_URL}?page=${params.page+1}`;
        if(params.search!==null){
            let keys = Object.keys(params.search);
            url = `${WAY_PAY_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
        }
        return await axios.get(url);
    }

    exportWayPayes = async (params) => {

        let url = `${WAY_PAY_API_BASE_URL}/export`;
        // if(params.search!==null){
        //     let keys = Object.keys(params.search);
        //     url = `${WAY_PAY_API_BASE_URL}/export?${keys[0]}=${params.search.name}`;
        // }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

export default new WayPayService();