import { Dispatch } from 'react'

interface OptionsProps {
  question: Question
  dispatch: Dispatch<Action>
  answer: Answer
}

const Options = ({ question, dispatch, answer }: OptionsProps) => {
  return (
    <div>
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              answer !== undefined
                ? index === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            disabled={answer !== undefined}
            onClick={() => {
              dispatch({ type: 'newAnswer', answer: index })
            }}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export default Options
