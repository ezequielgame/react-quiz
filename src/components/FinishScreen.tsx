import { Dispatch } from 'react'

interface FinishScreenProps {
  points: number
  maxPoints: number
  highscore: number
  dispatch: Dispatch<Action>
}

function FinishScreen({
  points,
  maxPoints,
  highscore,
  dispatch,
}: FinishScreenProps) {
  const percentage = Math.ceil((points / maxPoints) * 100)

  let emoji

  if (percentage === 100) {
    emoji = '🥇'
  } else if (percentage >= 80) {
    emoji = '🎉'
  } else if (percentage >= 50) {
    emoji = '🙃'
  } else if (percentage > 0) {
    emoji = '🤨'
  } else {
    emoji = '🤦‍♂️'
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPoints} ({percentage}%)
      </p>
      <p className="highscore">Highscore: {highscore} points</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </>
  )
}

export default FinishScreen
