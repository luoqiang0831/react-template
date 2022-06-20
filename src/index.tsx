/** APP入口 **/
// import "core-js/stable";
import "regenerator-runtime/runtime"
import React from "react"
import { createRoot } from "react-dom/client"
import Root from "./App"
import Rem from "./utils/rem"
/** 公共样式 **/
import "./styles/normal.css"
import "./styles/common.less"
import "./styles/global.less"

Rem()

createRoot(document.getElementById("app-root") as Element).render(<Root />)

// HMR
if (module.hot) {
  module.hot.accept()
}

// serviceWorker 卸载
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.getRegistrations()
//       .then(function(registrations) {
//    for(let registration of registrations) {
//                 //安装在网页的service worker不止一个，找到我们的那个并删除
//                if(registration && registration.scope === 'https://m.dongfangfuli.com/'){
//                    registration.unregister();
//                }
//            }
//        });
// }
