
import axios from 'axios';
import { BASE_URL } from '../../../helpers/BaseUrl';

const PERMISSION_API_BASE_URL = `${BASE_URL}/permissions`;

class PermissionService {


    getPermmision = (permmisionId) => {
        return axios.get(`${PERMISSION_API_BASE_URL}/${permmisionId}`);
    };

    allPermmisions = async (params) => {

        let url = `${PERMISSION_API_BASE_URL}`

       return await axios.get(url);
    }

}

const permissionServiceInstance = new PermissionService(); // Creamos una instancia de PermissionService y la asignamos a una variable

export { permissionServiceInstance };  // Exportamos la variable que contiene la instancia de PermissionService