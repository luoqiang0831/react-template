/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, fireEvent, screen } from "@testing-library/react"
import Loading from "../index"

test("验证 NavBar 组件", () => {
  const Text = "测试加载内容"
  const app = document.createElement("app")

  const { container } = render(<Loading>{Text}</Loading>, {
    container: document.body.appendChild(app),
    // legacyRoot: true // 模式选择
  })

  // query* functions will return the element or null if it cannot be found
  // get* functions will return the element or throw an error if it cannot be found
  // expect(screen.getByRole("serivce")).toBeNull();
  expect(container.getElementsByClassName("loading")).not.toEqual([])

  // the queries can accept a regex to make your selectors more resilient to content tweaks and changes.
  // fireEvent.click(screen.getByLabelText(/show/i));

  // .toBeInTheDocument() is an assertion that comes from jest-dom
  // otherwise you could use .toBeDefined()
  // expect(screen.getByText(testMessage)).toBeInTheDocument();
})
