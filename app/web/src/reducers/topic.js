import { 
  RES_TOPIC_DETAIL, 
  SET_TOPIC_LIST 
} from '../actions/topic'

const initState = {
  topicDetail: {},
  topicList: []
}

export const topic = (state = initState, action) => {
  // console.log(action);
  switch (action.type) {
    // case GET_USER_INFO:
    //   return {
    //     ...state,
    //     userInfo: action.userInfo
    //   }
    case RES_TOPIC_DETAIL:
      return {
        ...state,
        topicDetail: action.topicDetail
      }
    case SET_TOPIC_LIST:
      return {
        ...state,
        topicList: action.topicList
      }
    default:
      return state
  }
}

// export const userInfo = (state = initState, action) => {
//   switch (action.type) {
//   case RES_TOPIC_DETAIL:
//     return action.userInfo;
//   default:
//     return state
//   }
// }