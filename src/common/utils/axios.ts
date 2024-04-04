import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/src/common';

const baseUrl = 'http://localhost:3000/api';

const config: AxiosRequestConfig = {
  withCredentials: true,
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
};

export class Api {
  static createInstance() {
    return axios.create(config);
  }

  static async get<T>(
    restApi: string,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().get<ApiResponse<T>>(
      restApi,
      config
    );
  }

  static async post<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().post<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async postWithFile<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().post<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  static async patch<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().patch<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async put<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().put<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async delete<T>(
    restApi: string,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().delete<ApiResponse<T>>(
      restApi,
      config
    );
  }
}
