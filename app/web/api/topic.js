import { get, post } from '../util/fetch'

/**
 * @获取topic_detail
 * @params { uid  }
 */
export const getTopicDetailById = async (params) => {return await get('/api/v1/getTopicDetailById', params)};

/**
 * @获取所有topic
 * @params {  }
 */
export const getAllTopic = async (params) => {return await get('/api/v1/getAllTopicList', params)}

/**
 * @新建topic
 * @params { authorId, authorName, title, type, targets, content }
 */
export const postCreateTopic = async (params) => {return await post('/api/v1/postCreateTopic', params)}

/**
 * @点赞
 * @params { id }
 */
export const postLikeTopic = async (params) => {return await post('/api/v1/postLikeTopic', params)}
