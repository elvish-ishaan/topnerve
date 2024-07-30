// src/api/apiConnector.ts
import axios, { AxiosRequestConfig, Method } from 'axios';
import { BACKEND_DOMAIN } from './backendConstructs';

interface ApiResponse<T> {
  data: T;
}

export const apiConnector = async <T>(
  method: Method,
  url: string,
  data: any = null,
  headers: Record<string, string> = {}
): Promise<ApiResponse<T>> => {
  try {
    const config: AxiosRequestConfig = {
      method: method,
      url: BACKEND_DOMAIN + url,
      data: data,
      headers: headers,
    };

    const response = await axios.request<T>(config);
    return { data: response.data };
  } catch (error) {
    // Handle error accordingly
    console.error('API call failed:', error);
    //@ts-ignore
    throw error?.response?.data?.message
  }
};

export default apiConnector;
