import { BrowserHistory, createBrowserHistory } from "history";
import React, { useEffect, useLayoutEffect } from "react";

/**
 * 手动实现history 的监听
 * @returns
 */
const useHistoryChange = () => {
  const historyRef = React.useRef<BrowserHistory>(
    createBrowserHistory({ window })
  );

  const history = historyRef.current;

  const [historyState, setHistoryState] = React.useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(
    () =>
      history?.listen((route: any) => {
        // const { pathname } = route;
        // // 回到首页清除缓存
        // if (KEEP_ALIVE_ROUTER.includes(pathname)) {
        //   drop("/selectPlan");
        // }
        // 获取变更history 丢入router
        setHistoryState(route);
      }),
    [history]
  );
  return {
    history,
    historyState,
    setHistoryState,
  };
};

/**
 * 路由初始化
 */
const useRouteInit = (history: BrowserHistory) => {
  // 在组件加载完毕后触发
  useEffect(() => {
    // 可以手动在此预加载指定的模块：
    //Features.preload(); // 预加载Features页面
    //Test.preload(); // 预加载Test页面
    // 也可以直接预加载所有的异步模块
    // Loadable.preloadAll();
  }, []);
};

export { useRouteInit, useHistoryChange };
