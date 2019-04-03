// import apiReducer from './api';
import {combineReducers} from 'redux';
// import videosReducer from './videos'
// import channelsReducer from './channels';
// import commentsReducer from './comments';
import userReducer from './user';
import topicReducer from './topic';
import targetReducer from './target';

export default combineReducers({
  user: userReducer,
  topic: topicReducer,
  target: targetReducer
});