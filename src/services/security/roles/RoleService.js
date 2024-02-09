
import axios from 'axios';
import { BASE_URL } from '../../../helpers/BaseUrl';

const ROLE_API_BASE_URL = `${BASE_URL}/roles`;

class RoleService {

    createRole = (role) => {
        return axios.post(ROLE_API_BASE_URL, role);
    };


    getRole = (roleId) => {
        return axios.get(`${ROLE_API_BASE_URL}/${roleId}`);
    };

    updateRole = async (roleId, body) => {
        const response = await axios.put(`${ROLE_API_BASE_URL}/${roleId}`, body);
        return response.data;
    };

    updateRolePermissions = async (roleId, body) => {
        const response = await axios.put(`${ROLE_API_BASE_URL}/${roleId}/permissions`, body);
        return response.data;
    };

    deleteRole = async (roleId) => {
        const response = await axios.delete(`${ROLE_API_BASE_URL}/${roleId}`);
        return response.data;
    };

    allRoles = async (params) => {

        let url = `${ROLE_API_BASE_URL}`
        
        if(params && params.page){
            url = `${ROLE_API_BASE_URL}?page=${params.page+1}`;
        }


        if(params && params.search){
            url = `${ROLE_API_BASE_URL}?page=${params.page+1}`;
        }
       
       if(params && params.search!==null){
           let keys = Object.keys(params.search);
           url = `${ROLE_API_BASE_URL}?page=${1}&${keys[0]}=${params.search.name}`;
       }

       return await axios.get(url);
    }

    exportRoles= async (params) => {
        console.log(params)
        let url = `${ROLE_API_BASE_URL}/export`;
        if(params!==null){
            let keys = Object.keys(params);
            url = `${ROLE_API_BASE_URL}/export?${keys[0]}=${params.name}`;
        }
        const response = await axios.get(url, { responseType: 'blob' });
        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
        const urlObject= URL.createObjectURL(blob);
        return urlObject;

      }
}

const roleServiceInstance = new RoleService(); // Creamos una instancia de RoleService y la asignamos a una variable

export { roleServiceInstance };  // Exportamos la variable que contiene la instancia de RoleService