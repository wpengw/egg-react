import { take, put, call, fork, select, all } from 'redux-saga/effects'
import { getUserInfoFlow } from './user';
import { getTopicDetailFlow, getTopicListFlow } from './topic';


export default function* root() {
  yield all([
    fork(getUserInfoFlow),
    fork(getTopicListFlow),
    fork(getTopicDetailFlow)
  ])
  // yield fork(startup)
  // yield fork(nextRedditChange)
  // yield fork(invalidateReddit)
  // yield fork(getUserInfo)
}