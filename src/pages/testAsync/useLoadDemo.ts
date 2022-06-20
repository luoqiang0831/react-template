import React, { useEffect, useState } from "react"
import { sleep } from "antd-mobile/es/utils/sleep"
import useRequest from "@ahooksjs/use-request"

interface ILoadState {
  pageNum: number
  pageSize: number
  records: Array<string>
  hasMore: boolean
}

let count = 0

async function mockRequest(pageNum = 1, pageSize = 10) {
  if (count >= 5) {
    return []
  }
  await sleep(2000)
  count++
  return {
    pageNum,
    pageSize,
    list: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q"],
  }
}

const useLoadDemo = () => {
  const [state, setState] = useState<ILoadState>({
    pageNum: 1,
    pageSize: 10,
    records: [],
    hasMore: true,
  })

  const { loading, run } = useRequest<Pick<ILoadState, "pageNum" | "pageSize"> & { list: Array<string> }>(mockRequest, {
    manual: true,
  })

  // 修改加载页码
  const handlePageChange = async (pageNum: number) => {
    console.log("handlePageChange")
    const { list = [] } = await run(pageNum)
    setState((state) => ({
      ...state,
      pageNum,
      records: [...state.records, ...list],
      hasMore: list.length > 0 ? true : false,
    }))
  }

  return {
    loading,
    state,
    records: state.records || [],
    setState,
    run,
    handlePageChange,
    hasMore: state.hasMore,
  }
}

export default useLoadDemo
