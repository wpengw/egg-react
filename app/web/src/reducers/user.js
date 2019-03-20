import { RES_USER_INFO } from '../actions/user'

const initState = {
  userInfo: {}
}

export const userInfo = (state = initState, action) => {
  switch (action.type) {
  case RES_USER_INFO:
    return action.userInfo;
  default:
    return state
  }
}