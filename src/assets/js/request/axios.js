import axios from 'axios'
import Qs from 'qs'
import { Message, MessageBox } from 'element-ui';
import { getHeader } from './getHeader'
import store from '@src/store'
// const {
//   VUE_APP_APPID: APPID,
//   VUE_APP_REDIRECT_URL: REDIRECTURL
// } = process.env
function requestError(code, message) {
  const statusCode = (String(code).replace(/[^0-9]+/g, '')) - 0
  if (message) {
    return message
  }
  switch (statusCode) {
    case 400:
      return 'Bad Request (错误的请求)'
    case 401:
      return 'Unauthorized (请求要求身份验证)'
    case 403:
      return 'Forbidden (服务器拒绝请求)'
    case 404:
      return 'NOT Found (服务器找不到请求的资源)'
    case 405:
      return 'Bad Request (禁用请求中指定的方法)'
    case 406:
      return 'Not Acceptable (无法使用请求的内容特性响应请求的网页)'
    case 407:
      return 'Proxy Authentication Required (需要代理授权)'
    case 408:
      return 'Request Timed-Out (服务器等候请求时发生超时)'
    case 409:
      return 'Conflict (服务器在完成请求时发生冲突。服务器必须在响应中包含有关冲突的信息)'
    case 410:
      return 'Gone (请求的资源已被永久删除)'
    case 411:
      return 'Length Required (服务器不接受不含有效内容长度标头字段的请求)'
    case 412:
      return 'Precondition Failed (未满足前提条件)'
    case 413:
      return 'Request Entity Too Large (请求实体过大)'
    case 414:
      return 'Request, URI Too Large (请求的 URI 过长)'
    case 415:
      return 'Unsupported Media Type (不支持的媒体类型)'
    case 429:
      return '您的操作过于频繁,请稍后重试'
    case 500:
      return 'Internal Server Error (服务器内部错误)'
    case 501:
      return 'Not Implemented (尚未实施)'
    case 502:
      return 'Bad Gateway (错误网关)'
    case 503:
      return 'Server Unavailable (服务不可用)'
    case 504:
      return 'Gateway Timed-Out (网关超时)'
    case 505:
      return 'HTTP Version not supported (HTTP 版本不受支持)'
    default:
      return message
  }
}

const CancelToken = axios.CancelToken
const reqConfig = {
  baseURL: '/', // process.env.baseURL || process.env.apiUrl || ""
  timeout: 40 * 1000 // Timeout
}

const Axios = axios.create(reqConfig)
/**
 * 取消请求
 *
 * 使用方法：
 * import { getRequest, postRequest, CancelToken } from '@/assets/js/axios/index'
 *
 * function test () {
      let source1 = CancelToken.source();

      getRequest('/web-assess/security/gtDictionary/queryGtDictionaryPage', {
        cityId: '3bf5263a-0811-479a-94b2-0c8dc197fdaa',
        currentPage: 1,
        pageSize: 20
      }, {
        cancelToken: source1.token
      }).then(res => {
        console.log(res)
      }).catch(res => {
        console.log(res)
      })

      setTimeout(() => {
        source1.cancel('Operation canceled by the user.')
      }, 100)

  }

  test()
 */
// const source = CancelToken.source();

Axios.interceptors.request.use((config) => {
  const userConfig = config.userConfig.options;
  if(userConfig.headers) {
    config.headers = { ...userConfig.headers }
  } 

  config.headers = { ...getHeader() }
  
  return config
})


Axios.interceptors.response.use(
  (res) => {
    const data = res.data
    const userConfig = res.config.userConfig
    
    if (data.code === '200' || data.code === 1) {
      return data
    } else if(data.code === '-1') {
      MessageBox.confirm(data.message, '提示', {
          confirmButtonText: '确定',
          showClose: false,
          closeOnClickModal: false,
          showCancelButton: true
      }).then(() => {
        store.dispatch('logout')
      })
      
      return Promise.reject(data)
    } else {
      if(userConfig.showError) {
        Message.error(data.message || data.description || '参数错误')
      }
      
      return Promise.reject(data)
    }
  },
  (error) => {
    const response = error.response
    if (error.message.includes('timeout')) {
      // 判断请求异常信息中是否含有超时timeout字符串
      Message.error(requestError(504, '响应超时') || '服务器异常')
    } else {
      Message.error(response ? requestError(error.response.status) : '网络异常！')
    }
    return Promise.reject(error)
  }
)

/**
 * 请求封装
 * @param url
 * @param params
 * @param options
 */
function request(url, params, options) {
  const method = options.method || 'GET'
  const action =
    options.action === 'json'
      ? 'application/json;charset=UTF-8'
      : 'application/x-www-form-urlencoded'
  // const timeout = options.timeout || 15000
  const cancelToken = options.cancelToken

  const config = {
    userConfig: {
      showError: options.showError === false ? false : true,
      showLoading: options.showLoading,
      options
    },
    url,
    method,
    headers: {
      'Content-Type': action
    },
    paramsSerializer(data) {
      let arrKey = ''
      for (const k in data) {
        if (Object.prototype.toString.call(data[k] === '[object Array]')) {
          arrKey = k
        }
      }
      return Qs.stringify(data, {
        arrayFormat: arrKey
      })
    },
    cancelToken
  }

  // if(config.userConfig.showLoading) {
  //   alert.loading({
  //     message: config.userConfig.loadingTips,
  //     forbidClick: true,
  //   });
  // }

  config[method === 'GET' ? 'params' : 'data'] = params
  return Axios(config)
}



export { request, CancelToken }
