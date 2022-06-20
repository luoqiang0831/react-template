import React, { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import useRootStore from "@/store/global"
import { useNavigate } from "react-router-dom"
import { Radio, Button, SearchBar, Toast } from "antd-mobile"
import { SearchBarRef } from "antd-mobile/es/components/search-bar"

// 推荐使用方式
const Home = () => {
  const { t, i18n } = useTranslation()
  const { userInfo } = useRootStore()
  const searchRef = useRef<SearchBarRef>(null)
  const navigate = useNavigate()

  // 获取url链接信息 可以使用useLocation

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <div style={{ padding: 10 }}>
      <p onClick={() => navigate(`/testAsync`)}>点击测试页</p>
      <Button
        onClick={() => {
          useRootStore.setState({ userInfo: { name: "测试", id: 10000 } })
        }}
      >
        更新用户信息
      </Button>

      <p>用户名:{userInfo?.name}</p>
      <p>用户id:{userInfo?.id}</p>
      <SearchBar
        ref={searchRef}
        placeholder="请输入内容"
        showCancelButton
        onSearch={(val) => {
          Toast.show(`你搜索了：${val}`)
        }}
        onFocus={() => {
          Toast.show("获得焦点")
        }}
        onBlur={() => {
          Toast.show("失去焦点")
        }}
        onClear={() => {
          Toast.show("清空内容")
        }}
        onCancel={() => {
          Toast.show("取消搜索")
        }}
      />
    </div>
  )
}

export default Home
