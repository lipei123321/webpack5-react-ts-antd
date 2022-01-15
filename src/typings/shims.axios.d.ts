/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    basePath?: string;
  }
  interface AxiosInstance {
    // eslint-disable-next-line no-undef
    (config: AxiosRequestConfig): Promise<any>;
  }
}
