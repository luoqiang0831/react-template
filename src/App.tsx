/*
 * 根页
 * 这里单独分一层是为了热更新能正常监听store的变化
 * 而把Routers放在了另外一个文件里，这样Routers中的内容就能使用connect挂载到redux上了
 * */

/** 所需的各种插件 **/
import React, { StrictMode } from "react";
import Routers from "./routers";
import { UseRequestProvider } from "@ahooksjs/use-request";
import { requestMethod } from "@/utils/request";
import "./i18n";

export default function RootContainer(): JSX.Element {
  return (
    <StrictMode>
      <UseRequestProvider value={{ requestMethod }}>
        <Routers />
      </UseRequestProvider>
    </StrictMode>
  );
}
