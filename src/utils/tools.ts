/** 这个文件中封装了一些常用的工具函数 **/
import Cookies from "js-cookie"

// 手机号校验
export const mobileReg = /^1[0-9]{10}$/

// 正数校验
export const positiveNumberReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/

// 数字校验
export const numberReg = /^(([0-9])|([1-9]([0-9]+)))$/

/**
    保留N位小数
    @param {Number|String} str 待处理数字
    @param {Number} x 保留几位小数点
    @return {Number|String} 处理成功返回字符串，处理失败返回原值
  */
export const pointX = (str: string | number, x = 0) => {
  if (!str && str !== 0) {
    return str
  }
  const temp = Number(str)
  if (temp === 0) {
    return temp.toFixed(x)
  }
  return temp ? temp.toFixed(x) : str
}

/**
   去掉字符串两端空格
    @param {String} str 待处理字符串
    @return {String} 处理后的字符串
*/
export const trim = (str: string): string => {
  const reg = /^\s*|\s*$/g
  return str.replace(reg, "")
}

export const getRootDom = (id: string): Element => {
  let dom
  if ((dom = document.getElementById(id))) {
    return dom
  } else {
    const $el = document.createElement("div")
    $el.setAttribute("id", id)
    document.body.appendChild($el)
    return $el
  }
}

/**
 * 获取url上的参数 fromQs().a
 * @param url
 * @returns
 */
export const fromQs = (url: string = window.location.href): any => {
  if (!url.split("?")[1]) {
    return {}
  }
  const tmp1 = decodeURI(url.split("?")[1])
  const tmp2 = tmp1.split("&")
  let obj = {}
  tmp2.forEach((v) => {
    obj = { ...obj, [v.split("=")[0]]: v.split("=")[1] }
  })
  return obj
}

/**
 *
 * @param arr 传入数据
 * @returns 返回布尔值
 */
export const isEmpty = (arr: Array<any> = []): boolean => {
  return Array.isArray(arr) && arr.length === 0
}
/**
 * 判断是否是对象
 * @param obj
 * @returns
 */
export const isObject = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Object]"
}
/**
 * 判断是否是方法
 * @param obj
 * @returns
 */
export const isFunction = (obj: any) => {
  return Object.prototype.toString.call(obj) === "[object Function]"
}
/**
 * 获取浏览器定位信息
 * @returns
 */
export const getBrowserLocation = (): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const local = navigator.geolocation
    if (!local || !local.getCurrentPosition) {
      return reject({
        msg: "浏览器不支持",
      })
    }

    // 成功获取经纬度
    const locationSuccess = (position: { coords: { latitude: number; longitude: number } }) => {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      resolve({ latitude, longitude })
    }

    const locationError = (error: any) => {
      reject(error)
    }

    navigator.geolocation.getCurrentPosition(locationSuccess, locationError)
  })
}

/**
 *
 * @param _url 传入的url
 * @param queryObj 需要拼接的query条件
 * @returns 返回以问号拼接的结果 https://m.dongfangfuli.com/mallapi/location/citylist?timestamp=1622623571703
 */
export const toQs = (_url: string, queryObj: any): string => {
  const tmpUrl = _url.split("?")[0]
  const tmpSearchs = fromQs(_url)
  const keys = Object.keys({ ...tmpSearchs, ...queryObj })
  const tmpStr = keys?.map((v) => [v] + "=" + queryObj[v])
  return tmpUrl + "?" + tmpStr.join("&")
}

/*
 * @param sign 1或-1
 * @returns 随机数模仿的一个唯一值，常用语前端自行产生id、key等场景
 */
export const genFakeId = (sign = 1): number => sign * ~~(Math.random() * 100000000)

/**
 *
 * @returns UUID
 */
export const UUID = (): string => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
}

/**
 * 获取url参数
 * @param variable
 * @returns
 */
export function getQueryVariable(variable: string) {
  const query = window.location.search.substring(1)
  const vars = query.split("&")
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=")
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return null
}

/**
 * 获取工会union 两种方式 一种是二级域名获取 另一种是参数获取
 */
export function getUnionVal() {
  let currentUnionValue
  const union = getQueryVariable("union")
  const { hostname, pathname } = window.location
  if (union) {
    // URI带union参数的判断是工会链接
    return union
  }
  if (/^corp/.test(pathname) && pathname.match(/union\/\w+/g)) {
    // 测试环境http://corp.m.test03.com/union/lifangfang02/user/login
    const val = pathname.match(/union\/\w+/g)
    currentUnionValue = val && val.length > 0 ? val[0].split("/")[1] : ""
  } else {
    // console.warn("else");
    // if (
    //   (process.env === "dev" && /^(?:union)/.test(hostname)) ||
    //   /^(?:w{3})\.((?!stage)[A-Za-z1-9]{1}(\w|-)+\.)(stage\.)?(\w+\.)(?=com)/.test(
    //     hostname
    //   )
    // ) {
    //   currentUnionValue = hostname.split(".")[1];
    // } else {
    //   currentUnionValue = "";
    // }
    const unionCookie = Cookies.get("union")
    if (unionCookie) {
      currentUnionValue = unionCookie
    }
    return currentUnionValue
  }
}

// 节流 第一种：用定时器去处理时间间隔
export function throttle(fn: () => void, delay: number) {
  let valid = true
  return function () {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay)
  }
}

// 抖动
function debounceFun<T>(time: number): any {
  let timer: any = null
  return function (fn: () => void) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function () {
      fn && fn()
    }, time)
  }
}

export const debounce: any = debounceFun<() => void>(300)

export function isIOS(): boolean {
  const u = navigator.userAgent
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1 //android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
  return isiOS
}

/**
 * @description: 获取小数点后面的渲染
 * @param {price} price //价格
 * @return {decimal} //小数点以后的字符串
 */
export const handlePrice = (price: number | string) => {
  const str = String(price)
  const strList = str.split(".")
  return {
    frontNo: strList[0],
    decimal: strList.length > 1 ? `.${strList[1]}` : ".00",
  }
}
