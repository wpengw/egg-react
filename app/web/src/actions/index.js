export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_REDDIT = 'SELECT_REDDIT'
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT'
export const GET_USER_INFO = 'GET_USER_INFO'
export const GET_TOPIC_LIST = 'GET_TOPIC_LIST'

export const getUserInfo = (userInfo) => {
  return {
    type: GET_USER_INFO,
    userInfo 
  }
}

export const getTopicListAction = (topicList) => {
  return {
    type: GET_TOPIC_LIST,
    topicList 
  }
}







export const selectReddit = (reddit) => {
  return {
    type: SELECT_REDDIT,
    reddit
  }
}

export const invalidateReddit = (reddit) => {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  }
}

export const requestPosts = (reddit) => {
  return {
    type: REQUEST_POSTS,
    reddit
  }
}

export const receivePosts = (reddit, posts) => {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts,
    receivedAt: new Date().setMilliseconds(0)
  }
}