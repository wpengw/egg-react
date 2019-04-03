import {all, call, put, fork} from 'redux-saga/effects';
// import {watchMostPopularVideos, watchMostPopularVideosBy
import { getUserDetail, postLogin, postLoginOut, postRegister } from './user';
import { getTopicListFlow, getTopicDetailFlow, postCreateTopicFlow } from './topic';
import { getTargetListFlow } from './target';

export default function* () {
  yield all([
    fork(postRegister),
    fork(postLogin),
    fork(postLoginOut),
    fork(getUserDetail),
    fork(getTopicListFlow),
    fork(getTopicDetailFlow),
    fork(postCreateTopicFlow),
    fork(getTargetListFlow)
  ]);
}

/*
* entity must have a success, request and failure method
* request is a function that returns a promise when called
* */
export const fetchEntity = function* (request, entity, ...args) {
  try {
    // const response = yield call(request);
    // we directly return the result object and throw away the headers and the status text here
    // if status and headers are needed, then instead of returning response.result, we have to return just response.
    if (request.code === 0) {
      yield put(entity.success(request.data, ...args));
    } else {
      yield put(entity.failure(request.msg));
    }
  } catch (error) {
    console.log('error', error);
    yield put(entity.failure(error));
  }
}

export const ignoreErrors = function(fn, ...args) {
  return () => {
    const ignoreErrorCallback = (response) => response;
    return fn(...args).then(ignoreErrorCallback, ignoreErrorCallback);
  };
}
