import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const TYPE_BILL_BASE_URL = `${BASE_URL}/typebills`;

class TypeBillService {

    createTypeBill = (typeBill) => {
        return axios.post(TYPE_BILL_BASE_URL, typeBill);
    };


    getTypeBill = (typeBillId) => {
        return axios.get(`${TYPE_BILL_BASE_URL}/${typeBillId}`);
    };

    updateTypeBill = async (typeBillId, body) => {
        const response = await axios.put(`${TYPE_BILL_BASE_URL}/${typeBillId}`, body);
        return response.data;
    };

    deleteTypeBill = async (typeBillId) => {
        const response = await axios.delete(`${TYPE_BILL_BASE_URL}/${typeBillId}`);
        return response.data;
    };

    allTypeBills = async (params) => {
        let url = `${TYPE_BILL_BASE_URL}`;
        
        if(params && params.search){
            url = `${TYPE_BILL_BASE_URL}?page=${params.page+1}`;
        }
       
       if(params && params.search!==null){
           let keys = Object.keys(params.search);
           url = `${TYPE_BILL_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
       }    

       return await axios.get(url);

    
    }

    exportTypeBills= async (params) => {

        let url = `${TYPE_BILL_BASE_URL}/export`;
        // if(params.search!==null){
        //     let keys = Object.keys(params.search);
        //     url = `${TYPE_BILL_BASE_URL}/export?${keys[0]}=${params.search.name}`;
        // }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

export default new TypeBillService();