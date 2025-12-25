import api from "@/api";
// 登录
export const ToLogin = (data:any, changeLoading:any, toHome:any ) => {
  changeLoading(true);
  api.user.Login(data).then((res) => {
    console.log("登录", res);
    changeLoading(false);
    if (res?.data?.code === 0) {
      const loginInfo: any = res?.data?.data || null;
      if (loginInfo) {
        localStorage.setItem("userInfo", JSON.stringify(loginInfo));
        localStorage.setItem("token", loginInfo?.crm_token);
      }
      toHome();
    }
  });
};
