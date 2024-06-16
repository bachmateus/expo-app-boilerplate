import axios, { CreateAxiosDefaults } from "axios";

const defaultBaseUrl = 'https://api.com.br';

const ApiClient = (createAxiosDefaults: CreateAxiosDefaults) => {
  const baseURL = createAxiosDefaults.baseURL ? createAxiosDefaults.baseURL : defaultBaseUrl;
  return axios.create({ baseURL, timeout: 10000 });
}

export default ApiClient;