import axios from 'axios';
import { responseLogger, requestLogger, errorLogger } from 'axios-logger';

export const spoonacularClient = axios.create();
export const dicodingClient = axios.create();

axios.defaults.timeout = 10000;
axios.defaults.validateStatus = () => true;

const responseInterceptors = (res) => {
  const { status, data } = res;
  if (status.response?.status < 200 && status.response?.status >= 300) {
    throw Error(data?.message || 'Ooops something went wrong!');
  }
  return process.env.NODE_ENV === 'development' ? responseLogger(res) : res;
};

const responseInterceptorsError = (error) => {
  if (error.response?.status < 200 && error.response?.status >= 300) {
    throw Error(error.response.data?.message || 'Ooops something went wrong!');
  }
  return process.env.NODE_ENV === 'development' ? errorLogger(error) : error;
};

const requestInterceptorsError = (error) => (process.env.NODE_ENV === 'development' ? errorLogger(error) : error);

spoonacularClient.defaults.baseURL = process.env.SPOONACULAR_BASE_URL;
spoonacularClient.interceptors.request.use((req) => {
  req.params = {
    apiKey: `${process.env.API_KEY}`,
  };
  return process.env.NODE_ENV === 'development' ? requestLogger(req) : req;
}, requestInterceptorsError);
spoonacularClient.interceptors.response.use(responseInterceptors, responseInterceptorsError);

dicodingClient.defaults.baseURL = process.env.DICODING_BASE_URL;
dicodingClient.interceptors.request.use((req) => (process.env.NODE_ENV === 'development' ? requestLogger(req) : req), requestInterceptorsError);
dicodingClient.interceptors.response.use(responseInterceptors, responseInterceptorsError);

export default {};
