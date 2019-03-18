import { take, put, call, fork, select, all } from 'redux-saga/effects'
import * as $ from '../../../api/home';

import * as actions from '../../actions'
import { func } from 'prop-types';

export const getUserInfoApi = async () => {
  const res = await $.getUser({uid: 1});
  return res.data;
}

export const getTopicApi = async () => {
  const res = await $.getAllTopic();
  return res.data;
}

export const getUserInfo = function* () {
  const userInfo = yield call(getUserInfoApi)
  yield put(actions.getUserInfo(userInfo))
}

export const getTopicList = function* () {
  const topicList = yield call(getTopicApi)
  yield put(actions.getTopicListAction(topicList));
}
