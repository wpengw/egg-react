import * as topicActions from '../actions/topic';
import { REQUEST } from '../actions';
import { fork, take } from 'redux-saga/effects';
// import * as api from '../api/youtube-api';
import * as api from '../../../api/topic';
import { fetchEntity } from './index';


export const getTopicListApi = function* (params) {
  const request = yield api.getAllTopic(params);
  yield fetchEntity(request, topicActions.getTopicList);
}

export const getTopicDetailApi = function* (params) {
  const request = yield api.getTopicDetailById(params);
  yield fetchEntity(request, topicActions.getTopicDetail);
}

export const postCreateTopicApi = function* (params) {
  const request = yield api.postCreateTopic(params);
  yield fetchEntity(request, topicActions.postCreateTopic);
}

export const postLikeTopicApi = function* (params) {
  const request = yield api.postLikeTopic(params);
  yield fetchEntity(request, topicActions.postLikeTopic);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export const getTopicListFlow = function* () {
  while (true) {
    const params = yield take(topicActions.GET_TOPIC_LIST[REQUEST]);
    delete params.type;
    yield fork(getTopicListApi, params);
  }
}

export const getTopicDetailFlow = function* () {
  while (true) {
    const params = yield take(topicActions.GET_TOPIC_DETAIL[REQUEST]);
    delete params.type;
    yield fork(getTopicDetailApi, params);
  }
}

export const postCreateTopicFlow = function* () {
  while (true) {
    const params = yield take(topicActions.POST_CREATE_TOPIC[REQUEST]);
    delete params.type;
    yield fork(postCreateTopicApi, params);
  }
}

export const postLikeTopicFlow = function* () {
  while (true) {
    const params = yield take(topicActions.POST_LIKE_TOPIC[REQUEST]);
    delete params.type;
    yield fork(postLikeTopicApi, params);
  }
}

