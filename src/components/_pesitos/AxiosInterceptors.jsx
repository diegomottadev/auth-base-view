import React, { useEffect } from 'react';
import Axios from 'axios';
import useToken from '../../hooks/useToken';

export default function AxiosInterceptors() {
  const { token, deleteToken } = useToken();

  useEffect(() => {
    const axiosInterceptor = Axios.interceptors.request.use(function(config){
      if (token){
        config.headers.Authorization = `bearer ${token}`;
      }
      return config;
    });

    const axiosErrorInterceptor = Axios.interceptors.response.use(
      function (response){
        return response;
      },
      function(error){
        if (error.response.status === 401){
          deleteToken();
          window.location = '/login';
        } else {
          return Promise.reject(error);
        }
      }
    );

    return () => {
      Axios.interceptors.request.eject(axiosInterceptor);
      Axios.interceptors.response.eject(axiosErrorInterceptor);
    };
  }, [token, deleteToken]);

  return null;
}
