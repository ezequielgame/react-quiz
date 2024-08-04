import { Dispatch } from 'react'

interface StartScreenProps {
  numQuestions: number
  dispatch: Dispatch<Action>
}

const StartScreen = ({ numQuestions, dispatch }: StartScreenProps) => {
  return (
    <div className="start">
      <h3>Welcome to the React Quiz!</h3>
      <h4>{numQuestions} questions to test your React knowledge!</h4>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'startQuiz' })}
      >
        Let's start
      </button>
    </div>
  )
}

export default StartScreen
