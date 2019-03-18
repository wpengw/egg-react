import axios from 'axios'

/**
 * get请求
 * @param {string} url 接口地址
 * @param {object} parameters //参数
 */
export const get = (url, parameters) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      timeout: 10000,
      params: parameters
    }).then(res => {
      resolve(res.data);
    //   responseStatus(res, resolve, reject);
    }).catch(err => {
      reject(err);
    //   errorResponseStatus(err, resolve, reject);
    })
  })
}
