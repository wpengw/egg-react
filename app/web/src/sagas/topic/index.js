import { takeEvery, put, call, take } from 'redux-saga/effects'
import {
  getTopicDetailById,
  getAllTopic
} from '../../../api/topic';
import {
  REQ_TOPIC_DETAIL_PARAM,
  seTTopicDetail,
  REQ_TOPIC_LIST_PARAM,
  setTopicList
} from '../../actions/topic';

/**
 * 获取topic详情
 * @param { id } params 
 */
export const getTopicDetailApi = async (params) => {
  const res = await getTopicDetailById(params);
  return res.data;
}
export const getTopicDetailFlow = function* () {
  const request = yield take(REQ_TOPIC_DETAIL_PARAM);
  const topicDetail = yield call(getTopicDetailApi, request.params);
  yield put(seTTopicDetail(topicDetail))
}

/**
 * 获取topic_list
 * @param { null } params 
 */
export const getTopicListApi = async (params) => {
  const res = await getAllTopic(params);
  return res.data;
}
export const getTopicListFlow = function* () {
  const request = yield take(REQ_TOPIC_LIST_PARAM);
  const topicList = yield call(getTopicListApi, request.params);
  yield put(setTopicList(topicList));
}

