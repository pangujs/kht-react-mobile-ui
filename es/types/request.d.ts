import { AxiosRequestConfig } from 'axios';
export interface ConfigType extends AxiosRequestConfig {
    headers?: object | any;
    loadingState?: boolean;
    messageState?: boolean;
    responseType?: string | any;
    method?: string | any;
    baseURL?: string;
    url?: string;
    data?: object | any;
    params?: object | any;
    cancelToken?: string | any;
}
export interface setType {
    has?: void | any;
    get?: void | any;
    set?: void | any;
    delete?: void | any;
}
export interface response {
    config?: object | any;
}
export interface responseData {
    data?: object | any;
}
export interface data {
    response?: object | any;
    code: number;
    success: boolean;
    message?: string;
}
