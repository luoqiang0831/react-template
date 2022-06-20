/*
 * @LastEditTime: 2022-03-02 16:20:01
 * @Description:
 */
/** Loading组件 用于按需加载时过渡显示等 **/
import React from "react"
import "./index.less"
import ImgLoading from "../../assets/group.png"
import { useTranslation } from "react-i18next"

export type loadingStatus = {
  // error?: string;
  // timedOut?: string;
  // pastDelay?: string;
  isLoading?: boolean
  pastDelay?: boolean
  timedOut?: boolean
  error?: any
  retry?: () => void
}

export default function LoadingComponent(): JSX.Element {
  const { t, i18n } = useTranslation()
  function makeType(p: loadingStatus) {
    let msg
    if (p.error) {
      msg = t("加载出错，请刷新页面")
    } else if (p.timedOut) {
      msg = t("加载超时")
    } else if (p.pastDelay) {
      msg = t("加载中…")
    } else {
      msg = t("加载中…")
    }
    return msg
  }

  return (
    <div className="loading">
      <div className="loading-wrap">
        <img className="loading-img" src={ImgLoading} />
        <div className="loading-tips">加载中…</div>
      </div>
    </div>
  )
}
