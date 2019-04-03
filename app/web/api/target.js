import { get, post } from '../util/fetch'

/**
 * @获取所有标签
 * @params { uid  }
 */
export const getAllTarget = async (params) => {return await get('/api/v1/getAllTarget', params)};
