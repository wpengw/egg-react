import { combineReducers } from 'redux'
// import { homeInfo } from './home'
import { userInfo } from './user'
import { topic } from './topic'


const rootReducer = combineReducers({
  // postsByReddit,
  // selectedReddit,
  // homeInfo,
  userInfo,
  topic
})

export default rootReducer