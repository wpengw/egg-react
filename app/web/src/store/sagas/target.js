import * as targetActions from '../actions/target';
import { REQUEST } from '../actions';
import { fork, take } from 'redux-saga/effects';
import * as api from '../../../api/target';
import { fetchEntity } from './index';


export const getTargetListApi = function* (params) {
  const request = yield api.getAllTarget(params);
  yield fetchEntity(request, targetActions.getTargetList);
}

/******************************************************************************/
/******************************* WATCHERS *************************************/
/******************************************************************************/

export const getTargetListFlow = function* () {
  while (true) {
    const params = yield take(targetActions.GET_TARGET_LIST[REQUEST]);
    delete params.type;
    yield fork(getTargetListApi, params);
  }
}
