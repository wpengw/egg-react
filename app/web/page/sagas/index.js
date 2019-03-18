import { take, put, call, fork, select, all } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch'
import { getUserInfo, getTopicList } from './home';

import * as actions from '../actions'
import { selectedRedditSelector, postsByRedditSelector } from '../reducers/selectors'

export const fetchPostsApi = (reddit) => {
  return [{key: 1}, {key: 2}]
  // return fetch(`https://www.reddit.com/r/${reddit}.json`)
  //   .then(response => response.json())
  //   .then(json => json.data.children.map(child => child.data))
}

export const fetchPosts = function* (reddit) {
  yield put(actions.requestPosts(reddit))
  const posts = yield call(fetchPostsApi, reddit)
  yield put(actions.receivePosts(reddit, posts))
}

export const invalidateReddit = function* () {
  while (true) {
    const { reddit } = yield take(actions.INVALIDATE_REDDIT)
    yield call(fetchPosts, reddit)
  }
}

export const nextRedditChange = function* () {
  while (true) {
    const prevReddit = yield select(selectedRedditSelector)
    yield take(actions.SELECT_REDDIT)

    const newReddit = yield select(selectedRedditSelector)
    const postsByReddit = yield select(postsByRedditSelector)
    if (prevReddit !== newReddit && !postsByReddit[newReddit]) yield fork(fetchPosts, newReddit)
  }
}

export const startup = function* () {
  const selectedReddit = yield select(selectedRedditSelector)
  yield fork(fetchPosts, selectedReddit)
}

export default function* root() {
  yield all([
    fork(getUserInfo),
    fork(getTopicList)
  ])
  // yield fork(startup)
  // yield fork(nextRedditChange)
  // yield fork(invalidateReddit)
  // yield fork(getUserInfo)
}