// import apiReducer from './api';
import {combineReducers} from 'redux';
// import videosReducer from './videos'
// import channelsReducer from './channels';
// import commentsReducer from './comments';
import userReducer from './user';

export default combineReducers({
  user: userReducer
//   api: apiReducer,
//   videos: videosReducer,
//   channels: channelsReducer,
//   comments: commentsReducer,
//   search: searchReducer
});