export interface LoginType {
  data: LoginDataType;
  changeLoading: (val: boolean) => void;
  toHome: () => void;
}

export interface LoginDataType {
  username: string;
  password: string;
  captcha: string;
}

