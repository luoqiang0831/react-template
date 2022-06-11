export const loadWxSdk = () => {
  return new Promise((reslove, reject) => {
    let script = document.createElement("script");
    const flag = "__wxsdk__";
    if (document.getElementById(`${flag}`) !== null) {
      script = document.getElementById(`${flag}`) as HTMLScriptElement;
    } else {
      script.type = "text/javascript";
      script.id = `${flag}`;
      script.async = true;
      script.src = "https://res.wx.qq.com/open/js/jweixin-1.3.2.js";
    }

    script.addEventListener("load", function () {
      console.log("wx sdk 加载完成");
      reslove({
        status: true,
      });
    });

    script.addEventListener("error", function (error) {
      reject({
        status: false,
        msg: error,
      });
    });
    if (document.getElementById(`${flag}`) === null) {
      document.head.appendChild(script);
    }
  });
};

/**
 * 判断是否在小程序中
 * @returns
 */
export const isMinProgram = (): Promise<boolean> => {
  return new Promise((reslove, reject) => {
    if (/MicroMessenger/i.test(navigator.userAgent)) {
      //ios的ua中无miniProgram，很坑爹,但都有MicroMessenger（表示是微信浏览器）
      loadWxSdk().then((res) => {
        window.wx.miniProgram?.getEnv((res: any) => {
          if (res.miniprogram) {
            reslove(true);
          } else {
            reslove(false);
          }
        });
        // 兜底操作
        setTimeout(() => {
          reslove(false);
        }, 500);
      });
    } else {
      reslove(false);
    }
  });
};
