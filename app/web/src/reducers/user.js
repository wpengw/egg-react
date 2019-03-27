import { 
  RES_USER_INFO, 
  RES_USER_LOGIN,
  RES_LOGIN_OUT
} from '../actions/user'

const initState = {
  infoDetail: {},
  loginInfo: {
    username: '',
    id: ''
  },
}

const getCookie = (c_name) => {
  if (document.cookie.length>0){
    let c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1){ 
      c_start = c_start + c_name.length+1 
      let c_end = document.cookie.indexOf(',', c_start)
      if (c_end ==- 1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
  return ''
}

if (getCookie('token')) {
  initState.loginInfo.username = localStorage.getItem('username');
  initState.loginInfo.id = localStorage.getItem('id');
}

export const userInfo = (state = initState, action) => {
  switch (action.type) {
  case RES_USER_LOGIN:
    return {
      ...state,
      loginInfo: action.loginInfo
    }
  case RES_LOGIN_OUT: 
    return {
      ...state,
      loginInfo: {
        username: '',
        id: ''
      }
    }
  case RES_USER_INFO:
    return {
      ...state,
      infoDetail: action.userInfo
    }
  // case RES_USER_INFO:
  //   return action.userInfo;
  default:
    return state
  }
}