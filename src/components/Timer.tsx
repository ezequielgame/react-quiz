import { Dispatch, useEffect } from 'react'

interface TimerProps {
  seconds: number
  dispatch: Dispatch<Action>
}

function Timer({ seconds, dispatch }: TimerProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [dispatch])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="timer">
      {minutes.toString().padStart(2, '0') +
        ':' +
        secs.toString().padStart(2, '0')}
    </div>
  )
}

export default Timer
