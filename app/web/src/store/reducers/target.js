import { GET_TARGET_LIST } from '../actions/target';
import {REQUEST, SUCCESS, FAILURE} from '../actions';

const initState = {
  targetList: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case GET_TARGET_LIST[SUCCESS]:
      return reduceSuccess(state, action.response, 'targetList');
    case GET_TARGET_LIST[FAILURE]:
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

/*
  Selectors
 */
// export const getSearchResults = (state) => state.search.results;
// export const getSearchNextPageToken = (state) => state.search.nextPageToken;
