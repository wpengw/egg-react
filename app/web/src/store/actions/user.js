import {createAction, createRequestTypes, FAILURE, REQUEST, SUCCESS} from './index';

export const POST_LOGIN = createRequestTypes('POST_LOGIN');
export const POST_LOGIN_OUT = createRequestTypes('POST_LOGIN_OUT');
export const GET_USET_DETAIL = createRequestTypes('GET_USET_DETAIL');

// 登录
export const postLogin = {
  request: (params) => createAction(POST_LOGIN[REQUEST], params),
  success: (response) => createAction(POST_LOGIN[SUCCESS], {response}),
  failure: (response) => createAction(POST_LOGIN[FAILURE],  {response})
};

// 退出
export const postLoginOut = {
  request: (params) => createAction(POST_LOGIN_OUT[REQUEST], params),
  success: (response) => createAction(POST_LOGIN_OUT[SUCCESS], {response}),
  failure: (response) => createAction(POST_LOGIN_OUT[FAILURE],  {response})
};

// 获取用户详情
export const getUserDetail = {
  request: (params) => createAction(GET_USET_DETAIL[REQUEST], params),
  success: (response) => createAction(GET_USET_DETAIL[SUCCESS], {response}),
  failure: (response) => createAction(GET_USET_DETAIL[FAILURE],  {response})
};