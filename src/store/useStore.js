import create from 'zustand'

export const useStore = create((set) => ({
  mode: 'buyer',
  points: 279,
  userData: {
    nickname: 'junns',
    id: '1',
  },
  setMode: (mode) => {
    set((state) => ({ ...state, mode: mode }))
  },
  setPoints: (point) => {
    set((state) => ({ ...state, points: point }))
  },
  setUserData: (user) => {
    set((state) => ({ ...state, userData: { ...state.userData, ...user } }))
  },
}))
