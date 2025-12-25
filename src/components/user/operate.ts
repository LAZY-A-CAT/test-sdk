// 获取用户列表
export const getUserList = () => {};

// 电话号码的赛选
export const isStrictPhoneNumber = (phone: any) => {
  return /^\+?[\d\s\-\(\)]{10,15}$/.test(phone);
};
