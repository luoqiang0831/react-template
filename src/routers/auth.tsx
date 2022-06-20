import React, { ComponentType } from "react"
import { LoadableComponent } from "@loadable/component"

/** 简单权限控制 **/
export default function onAuth(Comp: ComponentType<any> & LoadableComponent<any>, props: any) {
  // 例子：如果没有登录，直接跳转至login页
  // if (sessionStorage.getItem('userInfo')) {
  //   return <Component {...props} />;
  // } else {
  //   return <Redirect to='/login' />;
  // }
  return <Comp {...props} />
}
