/** 路由页 - 真正意义上的根组件，已挂载到redux上，可获取store中的内容 **/

/** 所需的各种插件 **/
import React, { memo } from "react";
import { Route, Routes, Router, RouteProps } from "react-router-dom";
import LoadableComp from "@/component/LazyLoad";
import routes from "./router";
import onAuth from "./auth";
import { LoadableComponent } from "@loadable/component";
import Home from "@/pages/home";
import { useRouteInit, useHistoryChange } from "./useRouter";

export type TRouteProps = RouteProps & {
  routes?: RouteProps[];
  keepAlive?: boolean;
  component: React.ComponentType<any> & LoadableComponent<any>;
};

// 包裹路由
const RouteWithRoutes = (route: TRouteProps, key: string | number) => {
  const T_Route = (
    <Route
      key={key}
      path={route.path as string}
      element={onAuth(route.component, { routes: route.routes })}
    >
      {
        // 如果有子路由
        Array.isArray(route.children) &&
          route.children.length > 0 &&
          route.children.map((childRoute: TRouteProps, index: number) =>
            RouteWithRoutes(childRoute, index)
          )
      }
    </Route>
  );

  return T_Route;
};

/**
 * 404页面
 */
const NotFound = LoadableComp(
  () => import(/* webpackChunkName:'notfound' */ "@/pages/notfound")
);

// const TestAsync = LoadableComp(
//   () => import(/* webpackChunkName:'testAsync' */ "@/pages/testAsync")
// );

// const CompTest = LoadableComp(
//   () => import(/* webpackChunkName:'test' */ "@/pages/test")
// );
// const LoadAllComp = () => {
//   Loadable.preloadAll();
//   // routes.forEach(route => route.component.preload());
// };

/** 组件 **/
function RootRouterContainer() {
  const { history, historyState } = useHistoryChange();
  useRouteInit(history);

  return (
    <Router
      basename={"/"} // FIXME: 页面二级路径记得修改 checkEnv() === "local" ? "/" : "/health2"
      location={historyState?.location}
      navigator={history}
      navigationType={historyState?.action}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        {
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore */
          routes?.map((route: TRouteProps, index) =>
            RouteWithRoutes(route, index)
          )
        }
        {/* <Route
                  path="/test"
                  render={props => onAuth(TestAsync, props)}
                /> */}
        {/* <Route
                  path="/compTest"
                  render={(props) => onAuth(CompTest, props)}
                /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default memo(RootRouterContainer);
