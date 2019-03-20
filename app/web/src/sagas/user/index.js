import { takeEvery, put, call, take } from 'redux-saga/effects'
import * as $ from '../../../api/user';

import * as actions from '../../actions/user';

export const getUserInfoApi = async (params) => {
  const res = await $.getUser(params);
  return res.data;
}

export const getUserInfoFlow = function* () {
  const request = yield take(actions.REQ_USER_INFO_PARAM); // 接口所需的获取参数
  const userInfo = yield call(getUserInfoApi, request.params);
  yield put(actions.setUserInfo(userInfo))
}
