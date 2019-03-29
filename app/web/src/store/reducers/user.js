import { GET_USET_DETAIL, POST_LOGIN, POST_LOGIN_OUT, POST_REGISTER } from '../actions/user';
import {REQUEST, SUCCESS, FAILURE} from '../actions';

const initState = {
  userDetail: {},
  loginInfo: {},
  msg: ''
}

const getCookie = (c_name) => {
  if (document.cookie.length>0){
    let c_start = document.cookie.indexOf(c_name + '=');
    if (c_start != -1){ 
      c_start = c_start + c_name.length+1 
      let c_end = document.cookie.indexOf(',', c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start,c_end))
    }
  }
  return ''
}

if (getCookie('token')) {
  initState.loginInfo.username = localStorage.getItem('username');
  initState.loginInfo.id = localStorage.getItem('id');
}

export default function (state = initState, action) {
  switch (action.type) {
    case POST_REGISTER[SUCCESS]:
      return reduceSuccess(state, action.response);
    case POST_REGISTER[FAILURE]:
      return reduceFailure(state, action.response);
    case GET_USET_DETAIL[SUCCESS]:
      return reduceSuccess(state, 'userDetail', action.response);
    case POST_LOGIN[SUCCESS]:
      return reducePostLogin(state, action.response);
    case POST_LOGIN[FAILURE]:
      return reduceFailure(state, action.response);
    case POST_LOGIN_OUT[SUCCESS]:
      return reducePostLoginOut(state, action.response);
    default:
      return state;
  }
}

function reduceFailure(state, res) {
  return {
    ...state,
    msg: res
  }
}

function reduceSuccess(state, key, res) {
  return {
    ...state,
    [key]: res,
    msg: ''
  }
}

function reducePostLogin(state, res) {
  localStorage.setItem('username', res.username);
  localStorage.setItem('id', res.id);
  return reduceSuccess(state, 'loginInfo', res);
}

function reducePostLoginOut(state, res) {
  localStorage.clear();
  return reduceSuccess(state, 'loginInfo', {});
}


/*
  Selectors
 */
// export const getSearchResults = (state) => state.search.results;
// export const getSearchNextPageToken = (state) => state.search.nextPageToken;
