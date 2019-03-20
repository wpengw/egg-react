export const REQ_TOPIC_DETAIL_PARAM = 'REQ_TOPIC_DETAIL_PARAM';
export const RES_TOPIC_DETAIL = 'RES_TOPIC_DETAIL';
export const REQ_TOPIC_LIST_PARAM = 'REQ_TOPIC_LIST_PARAM';
export const SET_TOPIC_LIST = 'SET_TOPIC_LIST';


/**
 * 查询topic详情
 * @param  {object} params
 * @param  {id} params.id  topic_id
 */
export const sendTopicDetailRequest = (params) => {
  return {type: REQ_TOPIC_DETAIL_PARAM, params}
}
export const seTTopicDetail = (topicDetail) => {
  return {type: RES_TOPIC_DETAIL, topicDetail}
}

/**
 * 根据标签查询topic
 * @param  {object} params
 * @param  {  } 
 */
export const sendTopicListRequest = (params) => {
  return {type: REQ_TOPIC_LIST_PARAM, params}
}
export const setTopicList = (topicList) => {
  return { type: SET_TOPIC_LIST, topicList }
}
