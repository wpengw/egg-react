import { get, post } from '../util/fetch'

/**
 * @获取topic_detail
 * @params { uid  }
 */
export const getTopicDetailById = async (params) => {return await get('/api/v1/getTopicDetailById', params)};

/**
 * @获取所有文章
 * @params {  }
 */
export const getAllTopic = async (params) => {return await get('/api/v1/getAllTopicList', params)}
