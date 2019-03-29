import {createAction, createRequestTypes, FAILURE, REQUEST, SUCCESS} from './index';

export const GET_TOPIC_LIST = createRequestTypes('GET_TOPIC_LIST');
export const GET_TOPIC_DETAIL = createRequestTypes('GET_TOPIC_DETAIL');
export const POST_CREATE_TOPIC = createRequestTypes('POST_CREATE_TOPIC');

// 获取文章列表
export const getTopicList = {
  request: (params) => createAction(GET_TOPIC_LIST[REQUEST], params),
  success: (response) => createAction(GET_TOPIC_LIST[SUCCESS], {response}),
  failure: (response) => createAction(GET_TOPIC_LIST[FAILURE],  {response})
};

// 获取文章详情
export const getTopicDetail = {
  request: (params) => createAction(GET_TOPIC_DETAIL[REQUEST], params),
  success: (response) => createAction(GET_TOPIC_DETAIL[SUCCESS], {response}),
  failure: (response) => createAction(GET_TOPIC_DETAIL[FAILURE],  {response})
};

// 新建文章
export const postCreateTopic = {
  request: (params) => createAction(POST_CREATE_TOPIC[REQUEST], params),
  success: (response) => createAction(POST_CREATE_TOPIC[SUCCESS], {response}),
  failure: (response) => createAction(POST_CREATE_TOPIC[FAILURE],  {response})
};
