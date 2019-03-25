import { take, put, call, fork, select, all } from 'redux-saga/effects'
import { getUserInfoFlow, setLoginOutFlow, setUserLoginFlow } from './user';
import { getTopicDetailFlow, getTopicListFlow } from './topic';


export default function* root() {
  yield all([
    fork(setUserLoginFlow),
    fork(getUserInfoFlow),
    fork(setLoginOutFlow),
    fork(getTopicListFlow),
    fork(getTopicDetailFlow)
  ])
  // yield fork(startup)
  // yield fork(nextRedditChange)
  // yield fork(invalidateReddit)
  // yield fork(getUserInfo)
}