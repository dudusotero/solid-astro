import { atom } from 'nanostores'
import { useStore } from '@nanostores/solid'
import type { Accessor } from 'solid-js'

type ContextState = number

type ContextActions = {
  setCount: (count: number) => void
  start: () => void
  stop: () => void
  reset: () => void
}

const defaultState: ContextState = 0

const state = atom<ContextState>(defaultState)

let interval: NodeJS.Timer | null = null

const actions: ContextActions = {
  setCount: (count: number) => state.set(count),
  start: () => {
    if (interval) return
    interval = setInterval(() => {
      actions.setCount(state.get() + 1)
    }, 1000)
  },
  stop: () => {
    if (!interval) return
    clearInterval(interval)
    interval = null
  },
  reset: () => {
    if (interval) {
      actions.stop()
      actions.setCount(0)
      actions.start()
    } else {
      actions.setCount(0)
    }
  },
}

actions.start()

export const useCounter: () => [
  state: Accessor<ContextState>,
  actions: ContextActions
] = () => [useStore(state), actions]
