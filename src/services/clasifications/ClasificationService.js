import { BASE_URL } from "../../helpers/BaseUrl"
import axios from 'axios';

const CLASIFICATION_API_BASE_URL = `${BASE_URL}/clasifications`;

class ClasificationService {

    createClasification = (clasification) => {
        return axios.post(CLASIFICATION_API_BASE_URL, clasification);
    };


    getClasification = (clasificationId) => {
        return axios.get(`${CLASIFICATION_API_BASE_URL}/${clasificationId}`);
    };

    updateClasification = async (clasificationId, body) => {
        const response = await axios.put(`${CLASIFICATION_API_BASE_URL}/${clasificationId}`, body);
        return response.data;
    };

    deleteClasification = async (clasificationId) => {
        const response = await axios.delete(`${CLASIFICATION_API_BASE_URL}/${clasificationId}`);
        return response.data;
    };

    allClasifications = async (params) => {

        let url = `${CLASIFICATION_API_BASE_URL}`;
        
        if(params && params.search){
            url = `${CLASIFICATION_API_BASE_URL}?page=${params.page+1}`;
        }
       
       if(params && params.search!==null){
           let keys = Object.keys(params.search);
           url = `${CLASIFICATION_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
       }    

       return await axios.get(url);
    }

    exportCategories = async (params) => {

        let url = `${CLASIFICATION_API_BASE_URL}/export`;
        // if(params.search!==null){
        //     let keys = Object.keys(params.search);
        //     url = `${CLASIFICATION_API_BASE_URL}/export?${keys[0]}=${params.search.name}`;
        // }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

export default new ClasificationService();