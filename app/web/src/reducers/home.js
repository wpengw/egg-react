import { combineReducers } from 'redux'
import { GET_USER_INFO, GET_TOPIC_LIST } from '../actions'

const initState = {
    // topicList: [],
}

export const homeInfo = (state = initState, action) => {
  // console.log(action);
  switch (action.type) {
    // case GET_USER_INFO:
    //   return {
    //     ...state,
    //     userInfo: action.userInfo
    //   }
    case GET_TOPIC_LIST:
      return {
        ...state,
        topicList: action.topicList
      }
    default:
      return state
  }
}