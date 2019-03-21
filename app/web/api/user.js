import { get, post } from '../util/fetch'

/**
 * @获取用户信息
 * @params { id  }
 */
export const getUser = async (params) => {return await get('/api/v1/getUser', params)};

/**
 * @用户注册
 * @params { name, email, pwd  }
 */
export const postRegister = async (params) => {return await post('/api/v1/postRegister', params)};

