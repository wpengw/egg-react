export const REQ_USER_INFO_PARAM = 'REQ_USER_INFO_PARAM'
export const RES_USER_INFO = 'RES_USER_INFO'

// 获取用户信息
export const sendUserRequest = (params) => {
  return {type: REQ_USER_INFO_PARAM, params}
}
export const setUserInfo = (userInfo) => {
  return {type: RES_USER_INFO, userInfo}
}
