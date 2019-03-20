import { take, put, call, fork, select, all } from 'redux-saga/effects'
import * as $ from '../../../api/home';

import * as actions from '../../actions'

// export const getTopicApi = async () => {
//   const res = await $.getAllTopic();
//   return res.data;
// }

// export const getTopicList = function* () {
//   const topicList = yield call(getTopicApi)
//   yield put(actions.getTopicListAction(topicList));
// }
