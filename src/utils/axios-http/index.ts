import { RequestOptions, ResultParams } from './types'
import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import { ResultEnum, RequestTypeEnum, ContentTypeEnum } from './http-enum'
import { createStorage } from '../Storage'
import { cloneDeep, startsWith } from 'lodash'
import { CookieKeyEnum } from '@/config/const-enum'
import { checkStatus } from './check-status'

// 环境变量
const isDev = process.env.NODE_ENV === 'development'
const Storage = createStorage({ storage: localStorage })
const handleError = (err: AxiosError) => {
  const _code = err.code ? parseInt(err.code) : 500
  // 开发环境打印错误信息
  if (isDev) {
    console.error(`===status:${_code};===errorMessageText:${err.message}`)
  }
  checkStatus(_code, err.message)
}

class VAxios {
  private readonly options: RequestOptions

  private instance: AxiosInstance | undefined

  constructor (options: RequestOptions) {
    this.options = options
  }

  /**
   * axios的请求主体
   * @param configs
   * @param options
   */
  request<T = any> (configs: AxiosRequestConfig, options?: RequestOptions): Promise<AxiosResponse<ResultParams>> {
    this.instance = axios.create()
    // 默认配置
    this.instance.defaults.headers['Content-Type'] = ContentTypeEnum.JSON
    this.instance.defaults.method = RequestTypeEnum.GET
    const _conf: AxiosRequestConfig = cloneDeep(configs)
    const _opts: RequestOptions = Object.assign({}, this.options, options)
    // 格式化接口地址
    _conf.url = startsWith(_conf.url, 'http') ? _conf.url : `${location.origin}/${_conf.url}`
    const {
      isShowErrorMessage,
      errorMessageText,
      isTransformRequestResult,
      isShowServerErrorMessage,
      isTimeout,
      timeoutNumber,
      ignoreToken
    } = _opts
    // 是否需要设置超时时长
    if (isTimeout) {
      this.instance.defaults.timeout = timeoutNumber
    }
    // request拦截器
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      const { headers } = config
      // 是否忽略 token 校验
      if (!ignoreToken) {
        headers.Authorization = Storage.getCookie(CookieKeyEnum.AuthToken) || ''
      }
      return config
    }, undefined)
    // response拦截器
    this.instance.interceptors.response.use((res: AxiosResponse<ResultParams>) => {
      const {
        data,
        config
      } = res
      if (data.code === ResultEnum.SUCCESS) {
        // 是否需要格式化接口出参
        if (isTransformRequestResult) {
          return Promise.resolve(data.data)
        } else {
          return Promise.resolve(data)
        }
      } else {
        // 是否统一处理业务异常
        if (isShowServerErrorMessage) {
          handleError({
            name: '',
            message: errorMessageText || data.msg,
            code: data.code.toString(),
            config: config,
            response: res,
            isAxiosError: false,
            toJSON: () => {
              return {}
            }
          })
        }
        return Promise.reject(res)
      }
    }, (err: AxiosError) => {
      // 是否统一处理http接口请求异常
      if (isShowErrorMessage) {
        handleError({
          ...err,
          message: errorMessageText || (err.response as AxiosResponse).statusText,
          code: err.response?.status.toString()
        })
      }
      return Promise.reject(err.response)
    })
    console.log('_conf:', _conf)
    // 接口请求
    return this.instance.request<T, AxiosResponse<ResultParams>>(_conf)
  }
}

/**
 * 请求类接口实现
 */
const Http = new VAxios({
  formatDate: false,
  joinParamsToUrl: false,
  isTransformRequestResult: true,
  isParseToJson: true,
  isShowErrorMessage: true,
  errorMessageText: '',
  isShowServerErrorMessage: true,
  serverErrorMessage: '',
  isTimeout: true,
  timeoutNumber: 5000,
  ignoreToken: false
})
export default Http
