import jwtDecode from 'jwt-decode';
import { useState } from 'react';

function checkIfTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000 - 10;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return false;
  }
}

export default function useToken() {
  const getToken = () => localStorage.getItem('token') || null;

  const [token, setToken] = useState(getToken());

  const isExpired = token ? checkIfTokenExpired(token) : true;

  const saveToken = (userToken) => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const deleteToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return {
    setToken: saveToken,
    deleteToken,
    token,
    isExpired,
  };
}
