import { atom } from 'nanostores'
import { useStore } from '@nanostores/solid'
import type { CartItem } from '@/types'
import type { Accessor } from 'solid-js'

type ContextState = {
  readonly items: CartItem[]
  readonly size: number
  readonly total: number
}

type ContextActions = {
  clear: () => void
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
}

const defaultState: ContextState = {
  items: [],
  size: 0,
  total: 0,
}

const state = atom<ContextState>(defaultState)

const actions: ContextActions = {
  clear: () => state.set(defaultState),
  addItem: (item: CartItem) => {
    if (state.get().items.find((i) => i.id === item.id)) {
      return actions.increaseQuantity(item.id)
    }
    state.set({
      items: [...state.get().items, item],
      size: state.get().size + 1,
      total: state.get().total + item.price,
    })
  },
  removeItem: (id: number) => {
    const item = state.get().items.find((i) => i.id === id)
    state.set({
      items: state.get().items.filter((i) => i.id !== id),
      size: state.get().size - (item?.quantity ?? 0),
      total: state.get().total - (item?.quantity ?? 0) * (item?.price ?? 0),
    })
  },
  increaseQuantity: (id: number) => {
    const item = state.get().items.find((i) => i.id === id)
    state.set({
      items: state
        .get()
        .items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      size: state.get().size + 1,
      total: state.get().total + (item?.price ?? 0),
    })
  },
  decreaseQuantity: (id: number) => {
    const item = state.get().items.find((i) => i.id === id)
    if (item?.quantity === 1) {
      return actions.removeItem(id)
    }
    state.set({
      items: state
        .get()
        .items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      size: state.get().size - 1,
      total: state.get().total - (item?.price ?? 0),
    })
  },
}

export const useCart: () => [
  state: Accessor<ContextState>,
  actions: ContextActions
] = () => [useStore(state), actions]
