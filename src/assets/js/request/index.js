import { request, CancelToken } from './axios'
// import config from '@/config'
const {
  VUE_APP_API
} = process.env;

const config = {
  baseUrl: VUE_APP_API
}
console.log(process.env)
/**
 * get请求
 * @param url
 * @param params
 * @param options
 */
function get(url, params, options = {}) {
//   const origin = options.target && $apiServer[options.target] ? $apiServer[options.target] : ''

  options['method'] = 'GET'
  url = config['baseUrl'] + url

  return request(url, params, options)
}

/**
 * post请求
 * @param url
 * @param params
 * @param options
 */
function post(url, params, options = {}) {
//   const origin = options.target && $apiServer[options.target] ? $apiServer[options.target] : ''
  options['method'] = 'POST'
  options['action'] = options['action'] || 'json'
  url = config['baseUrl'] + url

  return request(url, params, options)
}

export { get, post, CancelToken }
