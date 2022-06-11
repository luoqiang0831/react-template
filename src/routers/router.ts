/*
 * @LastEditTime: 2022-03-02 23:09:01
 * @Description:
 */
import LazyLoad from "@/component/LazyLoad";

export default [
  {
    path: "/home",
    component: LazyLoad(
      () => import(/* webpackChunkName:'home' */ "@/pages/home")
    ),
  },
  {
    path: "/testAsync", // 测试下拉加载
    component: LazyLoad(() => import("@/pages/testAsync")),
  },
];
