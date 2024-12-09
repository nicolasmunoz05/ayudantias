import axios from 'axios';
import { useParams } from 'react-router-dom';


// Crear una instancia de Axios con una base URL (si la tienes)
const instance = axios.create({
  baseURL: 'http://localhost:8000', // Reemplaza con tu URL base
});

// Interceptor para agregar el token JWT en las solicitudes
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;