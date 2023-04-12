import { BASE_URL } from "../../helpers/BaseUrl"
import Axios from 'axios';

// // "Authorization": localStorage.getItem("token") 
// export const login = async( credentials) => {
//   return fetch(`${backendUrl}/auth/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
//   })
//     .then((data) => data.json()).then(data=> data.token)
// }
export const login = async (email, password) => {
    return await Axios.post(`${BASE_URL}/auth/login`, {
        email,
        password
    }); //data.usuario, data.token
}

export const me = async () => {
    return await Axios.post(`${BASE_URL}/auth/me`); //data.usuario, data.token
}