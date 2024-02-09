
import axios from 'axios';
import { BASE_URL } from '../../../helpers/BaseUrl';

const USER_API_BASE_URL = `${BASE_URL}/users`;

class UserService {

    createUser = (user) => {
        return axios.post(USER_API_BASE_URL, user);
    };


    getUser = (userId) => {
        return axios.get(`${USER_API_BASE_URL}/${userId}`);
    };

    updateUser = async (userId, body) => {
        const response = await axios.put(`${USER_API_BASE_URL}/${userId}`, body);
        return response.data;
    };

    deleteUser = async (userId) => {
        const response = await axios.delete(`${USER_API_BASE_URL}/${userId}`);
        return response.data;
    };

    allUsers = async (params) => {
        let url = `${USER_API_BASE_URL}?page=${params.page+1}`
        
        if(params && params.search){
            url = `${USER_API_BASE_URL}?page=${params.page+1}`;
        }
       
       if(params && params.search!==null){
           let keys = Object.keys(params.search);
           url = `${USER_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
       }
       console.log(url)
       return await axios.get(url);
    }

    exportUsers= async (params) => {

        let url = `${USER_API_BASE_URL}/export`;
        if(params!==null){
            let keys = Object.keys(params);
            url = `${USER_API_BASE_URL}/export?${keys[0]}=${params.name}`;
        }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

const userServiceInstance = new UserService(); // Creamos una instancia de UserService y la asignamos a una variable

export { userServiceInstance };  // Exportamos la variable que contiene la instancia de UserService