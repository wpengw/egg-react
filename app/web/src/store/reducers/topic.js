import { GET_TOPIC_LIST, GET_TOPIC_DETAIL, POST_CREATE_TOPIC, POST_LIKE_TOPIC } from '../actions/topic';
import {REQUEST, SUCCESS, FAILURE} from '../actions';

const initState = {
  topicList: [],
  detail: {},
  created: '',
  like: {},
  msg: ''
}

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TOPIC_LIST[SUCCESS]:
      return reduceSuccess(state, action.response, 'topicList');
    case GET_TOPIC_LIST[FAILURE]:
      return reduceFailure(state, action.response);
    case GET_TOPIC_DETAIL[SUCCESS]:
      return reduceSuccess(state, action.response, 'detail');
    case GET_TOPIC_DETAIL[FAILURE]:
      return reduceFailure(state, action.response);
    case POST_CREATE_TOPIC[SUCCESS]:
      return reduceSuccess(state, action.response, 'created');
    case POST_CREATE_TOPIC[FAILURE]:
      return reduceFailure(state, action.response);
    case POST_LIKE_TOPIC[SUCCESS]:
      return reduceSuccess(state, action.response, 'like');
    case POST_LIKE_TOPIC[FAILURE]:
      return reduceFailure(state, action.response);
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

function reduceSuccess(state, res, key = null) {
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
