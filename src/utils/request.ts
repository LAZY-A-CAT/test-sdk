import axios from "axios";
// import { LoginOut } from "@/store/reducer/UserInfoSlice";

import type { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { message as Message } from "antd";

const service: AxiosInstance = axios.create({
  // baseURL: baseURL(), // 所有请求的公共地址部分
  baseURL: process.env.REACT_APP_DEVLOPMENT_BASE_UL, // 所有请求的公共地址部分
  timeout: 30000,
  // headers: { 'Content-Type': 'application/json' ,'x-access-token':localStorage.getItem('token')},
  headers: {
    Accept: "application/json",
    "X-Requested-with": "XMLHTTPRequest",
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 请求拦截
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")!;
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error: AxiosError) => {
    Message.open({
      type: "error",
      content: error.message,
    });
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: any) => {
    const { code, msg } = response.data;
    if (code !== 0 && msg && msg.length) {
      Message.open({
        type: "error",
        content: msg,
      });
    }
    return response;
  },
  (error: AxiosError) => {
    // 处理http网络错误；
    let message = "";
    const status = error.response?.status;
    switch (status) {
      case 401:
        message = "token 失效，请重新登录";
        // localStorage.removeItem("token");
        localStorage.clear();
        window.location.href = "/login";
        // 这里可以触发退出的 action
        break;
      case 403:
        message = "拒绝访问";
        break;
      case 404:
        message = "请求地址错误";
        break;
      case 500:
        message = "服务器故障";
        break;
      case 600:
        message = "token 已过期请重新登录";
        localStorage.clear();
        window.location.href = "/login";
        break;
      case 601:
        message = "没有权限";
        // localStorage.removeItem("token");
        // window.location.href = "/login";

        break;
      default:
        message = "网络连接故障";
    }
    if (status !== 404 && message.length) {
      Message.open({
        type: "error",
        content: message,
      });
    }

    return error.response;
    // return error;
    // return Promise.reject(error);
  }
);

export const request = {
  get<T = any>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.get(url, { params: { ...params }, ...config });
  },

  post<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.post(url, data, { ...config });
  },

  put<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.put(url, data, config);
  },
  patch<T = any>(
    url: string,
    data?: object,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return service.patch(url, data, config);
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, { ...config });
  },
};
