/**
 * @jest-environment jsdom
 */

import React, { useCallback } from "react"
import { renderHook, act } from "@testing-library/react-hooks"
import useToggle from "../useToggle"

const callToggle = (hook: any) => {
  act(() => {
    hook.result.current[1].toggle()
  })
}

describe("用例 useToggle", () => {
  it("should be defined", () => {
    expect(useToggle).toBeDefined()
  })

  it("test on init", async () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBeFalsy()
  })

  it("test on methods", async () => {
    const { result } = renderHook(() => useToggle("Hello"))
    expect(result.current[0]).toEqual("Hello")
    act(() => {
      result.current[1].toggle()
    })
    expect(result.current[0]).toBeFalsy()
    act(() => {
      result.current[1].setLeft()
    })
    expect(result.current[0]).toEqual("Hello")
    act(() => {
      result.current[1].setRight()
    })
    expect(result.current[0]).toBeFalsy()
  })

  it("test on optional", () => {
    const hook = renderHook(() => useToggle("Hello", "World"))
    callToggle(hook)
    expect(hook.result.current[0]).toEqual("World")
    act(() => {
      hook.result.current[1].set("World")
    })
    expect(hook.result.current[0]).toEqual("World")
    callToggle(hook)
    expect(hook.result.current[0]).toEqual("Hello")
  })
})

// test("验证 useThrottle", () => {
//   const {result} = renderHook(() => useToggle())

//   act(() => {
//     toggle()
//   })

//   expect(state).toBe(true)
// })
