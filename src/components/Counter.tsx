import { useCounter } from '@/contexts/counter'
import type { Component } from 'solid-js'

const Counter: Component = () => {
  const [count, { start, stop, setCount, reset }] = useCounter()

  return (
    <div class="grid gap-4 border-t-2 border-black py-4 dark:border-white">
      {count()}
      <div class="flex flex-wrap gap-4">
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={start}
        >
          Start
        </button>
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={stop}
        >
          Stop
        </button>
      </div>
      <div class="flex flex-wrap gap-4">
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setCount(count() + 1)}
        >
          Increment
        </button>
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setCount(count() - 1)}
        >
          Decrement
        </button>
        <button
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <form
        class="flex flex-wrap gap-4"
        onSubmit={(e) => {
          e.preventDefault()
          const target = e.currentTarget
          const count = target.count.value
          setCount(Number(count))
        }}
      >
        <input
          type="number"
          name="count"
          class="w-full max-w-[300px] rounded border border-black px-4 py-2"
          value="0"
          required
        />
        <button
          type="submit"
          class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Set
        </button>
      </form>
    </div>
  )
}

export default Counter
