import Options from '@/components/Options'
import { Dispatch } from 'react'

interface QuestionProps {
  question: Question
  dispatch: Dispatch<Action>
  answer: Answer
}

const Question = ({ question, dispatch, answer }: QuestionProps) => {
  return (
    <div>
      <h3>Question</h3>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Question
