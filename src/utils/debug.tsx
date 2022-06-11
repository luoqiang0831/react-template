//连续点击10次
export const longClick = (element: Element, fn: () => void) => {
  let timer: NodeJS.Timer;
  const waitTime = 260; // 该时间间隔内点击才算连续点击（单位：ms）
  let lastTime = new Date().getTime(); // 上次点击时间
  let count = 0; // 连续点击次数
  // 获取对象
  element.addEventListener("click", () => {
    const currentTime = new Date().getTime();
    // 计算两次相连的点击时间间隔
    count = currentTime - lastTime < waitTime ? count + 1 : 1;
    console.log(currentTime - lastTime, waitTime, count);
    lastTime = new Date().getTime();
    clearTimeout(timer);
    timer = setTimeout(function () {
      clearTimeout(timer);
      // 处理点击事件
      if (count > 6) {
        // 连续点击五次或者五次以上的点击事件
        // console.log("点击超过4次了");
        fn && fn();
      }
    }, waitTime + 10);
  });
};
/**
 * 添加调试事件
 */
export const addDebugEvent = (element: Element | undefined) => {
  const target = element || document.getElementsByClassName(".nar-bar-wrap")[0];
  if (!target) {
    console.warn("vConsole 未注册成功！");
    return;
  }
  // 绑定
  longClick(target, () => {
    const $vConsole = document.getElementById("__vConsole__");
    const vConsole = document.createElement("script");
    vConsole.setAttribute(
      "src",
      "https://unpkg.com/vconsole/dist/vconsole.min.js"
    );
    vConsole.setAttribute("id", "__vConsole__");
    vConsole.setAttribute("async", "true");
    vConsole.addEventListener("load", () => {
      new window.VConsole();
      console.warn("vConsole 注册成功！");
    });
    if (!$vConsole) {
      document.head.appendChild(vConsole);
    }
  });
};
