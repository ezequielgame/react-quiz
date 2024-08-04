import { Dispatch } from 'react'

interface NextButtonProps {
  dispatch: Dispatch<Action>
  answer: Answer
  currentQuestion: number
  numQuestions: number
}

const NextButton = ({
  dispatch,
  answer,
  currentQuestion,
  numQuestions,
}: NextButtonProps) => {
  if (answer === undefined) return null

  if (currentQuestion < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    )
  }

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: 'finish' })}
    >
      Finish
    </button>
  )
}

export default NextButton
