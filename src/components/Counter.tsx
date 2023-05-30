import { createEffect, createSignal, type Component } from 'solid-js'

type Props = {
  initialCount?: number
}

const Counter: Component<Props> = (props) => {
  const [count, setCount] = createSignal(props.initialCount || 0)

  const interval = setInterval(() => {
    setCount(count() + 1)
  }, 1000)

  createEffect(() => {
    if (count() >= 10) clearInterval(interval)
  })

  return (
    <div class="grid min-w-[60px] place-content-center gap-4 justify-self-start rounded border-2 p-4">
      {count()}
    </div>
  )
}

export default Counter
