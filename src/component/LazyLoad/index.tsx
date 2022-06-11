import Loadable from "@loadable/component";
import Loading from "@/component/Loading"; // loading动画，用于动态加载模块进行中时显示
import React from "react";

export default (loader: () => Promise<any>) => {
  return Loadable(loader, {
    fallback: <Loading />,
  });
};
