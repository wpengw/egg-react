export const REQ_USER_LOGIN_PARAM = 'REQ_USER_LOGIN_PARAM';
export const RES_USER_LOGIN = 'RES_USER_LOGIN';
export const REQ_USER_INFO_PARAM = 'REQ_USER_INFO_PARAM';
export const RES_USER_INFO = 'RES_USER_INFO';
export const REQ_LOGIN_OUT_PARAM = 'REQ_LOGIN_OUT_PARAM';
export const RES_LOGIN_OUT = 'RES_LOGIN_OUT';

//登录
export const sendLoginRequest = (params) => {
  return { type: REQ_USER_LOGIN_PARAM, params}
}
export const setLoginInfo = (loginInfo) => {
  return {type: RES_USER_LOGIN, loginInfo}
}

// 退出
export const sendLoginOut = (params) => {
  return { type: REQ_LOGIN_OUT_PARAM, params }
}
export const setLoginOut = (outInfo) => {
  return { type: RES_LOGIN_OUT, outInfo }
}


// 获取用户信息
export const sendUserRequest = (params) => {
  return {type: REQ_USER_INFO_PARAM, params}
}
export const setUserInfo = (userInfo) => {
  return {type: RES_USER_INFO, userInfo}
}
