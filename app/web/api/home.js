import { get, post } from '../util/fetch'

/**
 * @获取用户信息
 * @params { uid  }
 */
export const getUser = async (params) => {return await get('/api/v1/user', params)}

/**
 * @获取所有文章
 * @params {  }
 */
export const getAllTopic = async (params) => {return await get('/api/v1/getAllTopicList', params)}