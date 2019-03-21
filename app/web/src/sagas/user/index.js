import { takeEvery, put, call, take } from 'redux-saga/effects'
import {
  getUser
} from '../../../api/user';

import {
  REQ_USER_INFO_PARAM
} from '../../actions/user';

// 获取用户信息
export const getUserInfoApi = async (params) => {
  const res = await getUser(params);
  return res.data;
}
export const getUserInfoFlow = function* () {
  const request = yield take(REQ_USER_INFO_PARAM); // 接口所需的获取参数
  const userInfo = yield call(getUserInfoApi, request.params);
  yield put(actions.setUserInfo(userInfo))
}
