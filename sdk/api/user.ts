import { request } from "@/utils/request";
import { LoginDataType } from "@/utils/type";

// 登录
export const Login = (data: LoginDataType) => {
  return request.post<any>("/login", data);
};

// 验证码
export const GetCaptcha = () => {
  return request.get<any>("/captcha");
};

// 用户列表
export const GetUserList = (data:any)=>{
  return request.get<any>("/users",data);
}