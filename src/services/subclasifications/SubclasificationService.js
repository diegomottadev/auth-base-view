import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const SUBCLASIFICATION_API_BASE_URL = `${BASE_URL}/subclasifications`;

class SubclasificationService {

    createSubclasification = (subclasification) => {
        return axios.post(SUBCLASIFICATION_API_BASE_URL, subclasification);
    };


    getSubclasification = (subclasificationId) => {
        return axios.get(`${SUBCLASIFICATION_API_BASE_URL}/${subclasificationId}`);
    };

    updateSubclasification = async (subclasificationId, body) => {
        const response = await axios.put(`${SUBCLASIFICATION_API_BASE_URL}/${subclasificationId}`, body);
        return response.data;
    };

    deleteSubclasification = async (subclasificationId) => {
        const response = await axios.delete(`${SUBCLASIFICATION_API_BASE_URL}/${subclasificationId}`);
        return response.data;
    };

    allSubclasifications = async (params) => {


        let url = `${SUBCLASIFICATION_API_BASE_URL}`;

        
        if(params && params.clasification_id !== null){
            url = `${SUBCLASIFICATION_API_BASE_URL}?clasification_id=${params.clasification_id}`;
        }

        if(params && params.page !== null && params.page !== undefined){
            url = `${SUBCLASIFICATION_API_BASE_URL}?page=${params.page+1}&pageSize=${10}`;
        }
    
        if(params && params.search!==null && params.search!==undefined){
            let keys = Object.keys(params.search);
            url = `${SUBCLASIFICATION_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
        }    
        return await axios.get(url);
        
    }

    exportCategories = async (params) => {

        let url = `${SUBCLASIFICATION_API_BASE_URL}/export`;
        // if(params.search!==null){
        //     let keys = Object.keys(params.search);
        //     url = `${SUBCLASIFICATION_API_BASE_URL}/export?${keys[0]}=${params.search.name}`;
        // }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

export default new SubclasificationService();