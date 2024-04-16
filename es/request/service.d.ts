import { AxiosInstance } from 'axios';
import { ConfigType, setType } from '../types/request';
declare class Service {
    instance: AxiosInstance;
    messageState: boolean;
    responseType: string;
    pendingRequest: setType;
    constructor(config: ConfigType);
    generateReqKey(config: ConfigType): string;
    addPendingRequest(config: ConfigType): void;
    removePendingRequest(config: ConfigType): void;
    interceptors(): void;
    interceptorsRequest(): void;
    interceptorsResponse(): void;
    request<T>(config: ConfigType): Promise<T>;
    setMessageTip(code: any): void;
    get<T>(config: ConfigType): Promise<T>;
    delete<T>(config: ConfigType): Promise<T>;
    patch<T>(config: ConfigType): Promise<T>;
    post<T>(config: ConfigType): Promise<T | any>;
}
export default Service;
