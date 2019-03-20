import { get, post } from '../util/fetch'

/**
 * @获取用户信息
 * @params { uid  }
 */
export const getUser = async (params) => {return await get('/api/v1/user', params)}
