import { takeEvery, put, call, take } from 'redux-saga/effects'
import {
  getUser,
  postLoginOut
} from '../../../api/user';

import {
  REQ_USER_INFO_PARAM,
  REQ_USER_LOGIN_PARAM,
  REQ_LOGIN_OUT_PARAM,
  setUserInfo,
  setLoginInfo,
  setLoginOut
} from '../../actions/user';

// 登录
export const getUserLoginApi = async (params) => {
  const res = await getUser(params);
  return res.data;
}
export const setUserLoginFlow = function* () {
  const request = yield take(REQ_USER_LOGIN_PARAM); // 接口所需的获取参数
  const loginInfo = yield call(getUserLoginApi, request);
  yield put(setLoginInfo(loginInfo))
}

// 退出
export const postLoginOutApi = async (params) => {
  const res = await postLoginOut(params);
  return res.data;
}
export const setLoginOutFlow = function* () {
  const request = yield take(REQ_LOGIN_OUT_PARAM); // 接口所需的获取参数
  const outInfo = yield call(postLoginOutApi, request);
  yield put(setLoginOut(outInfo))
}


// 获取用户信息
export const getUserInfoApi = async (params) => {
  console.log(params);
  const res = await getUser(params);
  return res.data;
}
export const getUserInfoFlow = function* () {
  const request = yield take(REQ_USER_INFO_PARAM); // 接口所需的获取参数
  const userInfo = yield call(getUserInfoApi, request.params);
  yield put(setUserInfo(userInfo))
}
