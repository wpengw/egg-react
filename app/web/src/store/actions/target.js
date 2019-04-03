import {createAction, createRequestTypes, FAILURE, REQUEST, SUCCESS} from './index';

export const GET_TARGET_LIST = createRequestTypes('GET_TARGET_LIST');

// 获取所有标签
export const getTargetList = {
  request: (params) => createAction(GET_TARGET_LIST[REQUEST], params),
  success: (response) => createAction(GET_TARGET_LIST[SUCCESS], {response}),
  failure: (response) => createAction(GET_TARGET_LIST[FAILURE],  {response})
};
