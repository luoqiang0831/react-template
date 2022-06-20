import create from "zustand"

export type UserInfo = {
  id: number
  name: string
}

export type RootState = {
  userInfo: UserInfo | undefined // 用户信息
}

export type TUnionConfig = {
  h5ShopLogo: string
  h5UserCenter: string
  h5HomeIndex: string
  h5ShoppingCart: string
}

export type RootHandleState = {
  updateState: (obj: Partial<RootState>) => void
}

const useRootStore = create<RootState & RootHandleState>((set, get) => ({
  userInfo: undefined, // 用户信息
  updateState: (obj) => set((state) => ({ ...state, ...obj })),
}))

export default useRootStore
