import { GET_USET_DETAIL, POST_LOGIN, POST_LOGIN_OUT } from '../actions/user';
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
  console.log('action', action, GET_USET_DETAIL[SUCCESS]);
  switch (action.type) {
    case GET_USET_DETAIL[SUCCESS]:
        return {
          ...state,
          msg: '',
          userDetail: action.response || {}
        };
    case POST_LOGIN[SUCCESS]:
        return reducePostLogin(state, action.response);
    case POST_LOGIN_OUT[SUCCESS]:
        return reducePostLoginOut(state, action.response);
    case POST_LOGIN[FAILURE]:
      return reduceFailure(state, action.response)
    // case POST_LOGIN[FAILURE]:
    //   return reduceFailure(state, action.response)
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

function reduceSearchForVideos(response, searchQuery, prevState) {
  let searchResults = response.items.map(item => ({...item, id: item.id.videoId}));
  if (prevState.query === searchQuery) {
    const prevResults = prevState.results || [];
    searchResults = prevResults.concat(searchResults);
  }
  return {
    totalResults: response.pageInfo.totalResults,
    nextPageToken: response.nextPageToken,
    query: searchQuery,
    results: searchResults
  };
}

/*
  Selectors
 */
// export const getSearchResults = (state) => state.search.results;
// export const getSearchNextPageToken = (state) => state.search.nextPageToken;
