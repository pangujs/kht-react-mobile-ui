import Service from './service';
var axiosConfig = {
  baseURL: '/admin',
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache'
  }
};
export var publicApi = new Service(Object.assign(axiosConfig, {
  baseURL: "/api/v1",
  timeout: 60000
}));