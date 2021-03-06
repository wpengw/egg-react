import * as userActions from '../actions/user';
import { REQUEST } from '../actions';
import { fork, take } from 'redux-saga/effects';
// import * as api from '../api/youtube-api';
import * as api from '../../../api/user';
import { fetchEntity } from './index';


export const postRegisterApi = function* (params) {
  const request = yield api.postRegister(params);
  yield fetchEntity(request, userActions.postRegister);
}

export const postLoginApi = function* (params) {
  const request = yield api.postLogin(params);
  yield fetchEntity(request, userActions.postLogin);
}

export const postLoginOutApi = function* (params) {
  const request = yield api.postLoginOut(params);
  yield fetchEntity(request, userActions.postLoginOut);
}

export const getUserDetailApi = function* (params) {
// export const getUserLoginApi = async (params) => {
  // const request = api.buildSearchRequest.bind(null, searchQuery, nextPageToken, amount);
  const request = yield api.getUser(params);
  yield fetchEntity(request, userActions.getUserDetail);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/
export const postRegister = function* () {
  while (true) {
    const params = yield take(userActions.POST_REGISTER[REQUEST]);
    delete params.type;
    yield fork(postRegisterApi, params);
  }
}

export const postLogin = function* () {
  while (true) {
    const params = yield take(userActions.POST_LOGIN[REQUEST]);
    delete params.type;
    yield fork(postLoginApi, params);
  }
}

export const postLoginOut = function* () {
  while (true) {
    const params = yield take(userActions.POST_LOGIN_OUT[REQUEST]);
    delete params.type;
    yield fork(postLoginOutApi, params);
  }
}

export const getUserDetail = function* () {
  while (true) {
    const params = yield take(userActions.GET_USET_DETAIL[REQUEST]);
    delete params.type;
    yield fork(getUserDetailApi, params);
  }
}
