/**
 * 自己封装的异步请求函数
 * 所有http请求都将经过这里
 * **/
import React from "react"
import { extend, ResponseError } from "umi-request"
import { SERVER_GATEWAY } from "./constants"
import { isObject, isFunction } from "@/utils/tools"
import { Toast } from "antd-mobile"
// import axios from "axios";

interface Result {
  code: string | number
  data: unknown
  message?: string
  msg?: string
  success: boolean
}

// interface RequestParams {
//   url: string;
//   options: RequestOptionsInit;
// }
// 也可以使用request 中间件 request.use()

const codeMessage: { [key: number]: string } = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
}

// url白名单，返回不做统一拦截
const urlWhiteList = [
  "/mallapi/location/citylist",
  "/mallapi/location/changecity",
  "/mallapi/mallunion/getLogo",
  "/mallUnion/unionMallConfig/findUsableList", // 获取汉堡包接口
  "/api/health/order/orderSubmit", // 提交订单
]
// 排除网关
const GATEWAY_PATH = [
  "mallapi/mallunion/getLogo",
  "mallapi/location/changecity", //设置历史城市
]
// HTTP状态码
const errorHandler = (error: ResponseError) => {
  const { response } = error
  const errortext = codeMessage[response.status] || response.statusText
  const { status, url } = response

  console.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext,
  })
}

// 可以针对于中间件进行拦截response
// request.interceptors.response.use(async response => {
//   // 克隆响应对象做解析处理
//   // 这里的res就是我们请求到的数据
//   const res = await response.clone().json();
//   const { code, message } = res;
//   if (code !== 0) {
//     console.log('error', res);
//     notification.error({
//       message: '请求错误',
//       description: `${code}: ${message}`,
//     });
//     // 在处理结果时判断res是否有值即可
//     return;
//   }
//   return res;
// });

// 导出请求
// eslint-disable-next-line
export const requestMethod = async (params: any): Promise<any> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const navigate = useNavigate();
  let url = params
  // 对象情况下 并且有url的情况下
  if (isObject(params) && params.url) {
    url = params.url
    params = {
      // TODO: 添加通用参数
      ...params,
    }
  }
  // data为object时， 兼容不同的传参形式
  if (params?.data && isObject(params?.data)) {
    params.data = {
      // 接口入参通用添加字段的地方
      ...params.data,
    }
  }

  // 方法情况下
  if (isFunction(params)) {
    url = params()
  }
  // 添加中间件
  const CustomRequest = extend({
    errorHandler, // 默认错误处理
    // 判断是否写入域名 或者 排除上面的网关地址
    prefix:
      url.substr(0, 6).indexOf("http") === -1 && GATEWAY_PATH.every((i) => url.indexOf(i) === -1) ? SERVER_GATEWAY : "", // 判断是否直接使用http域名 不经过serverUrl
    // 默认请求头
    headers: {
      // Authorization: getToken() ? `Bearer ${getToken()}` : null, // 携带token
    } as Record<string, string>,
    credentials: "include", // 默认请求是否带上cookie
  })

  const result = await CustomRequest(url, params)

  // 白名单内的url直接返回，异常自行捕捉
  if (urlWhiteList.includes(url.split("?")[0])) {
    return Promise.resolve(result)
  }

  const { success = false, message, code, msg } = (result as unknown as Result) || {}

  // 内部服务错误 具体错误的code和后端约定
  if (code !== "0000") {
    // 如果预览模式则跳过
    Toast.show({
      content: message || msg,
    })
    return Promise.reject({ msg: `接口请求错误： ${url}` })
  }
  return Promise.resolve(result)
}
