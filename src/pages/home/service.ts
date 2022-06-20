// 接口
export const test = (params: any) => ({
  url: "/api/list",
  method: "post",
  data: params,
})

export const test1 = "/api/userInfo"

export const test2 = {
  url: "/front/hotel/list",
  method: "post",
}

export const test3 = (userId: string) => `/api/userInfo/${userId}`
