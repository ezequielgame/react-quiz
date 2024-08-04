import Error from '@/components/Error'
import FinishScreen from '@/components/FinishScreen'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Loader from '@/components/Loader'
import Main from '@/components/Main'
import NextButton from '@/components/NextButton'
import Progress from '@/components/Progress'
import Question from '@/components/Question'
import StartScreen from '@/components/StartScreen'
import Timer from '@/components/Timer'
import { ReactQuizError } from '@/lib/ReactQuizError'
import { useEffect, useReducer } from 'react'

const initialState: ReactQuizState = {
  questions: [],
  status: 'loading',
  currentQuestion: 0,
  answer: undefined,
  points: 0,
  highscore: 0,
  seconds: null,
}

const SECS_PER_QUESTION = 30

const reducer = (state: ReactQuizState, action: Action): ReactQuizState => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.questions!, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'startQuiz':
      return {
        ...state,
        status: 'active',
        seconds: state.questions.length * SECS_PER_QUESTION,
      }
    case 'newAnswer': {
      const question = state.questions.at(state.currentQuestion)
      const correct = action.answer === question?.correctOption
      const newPoints = correct ? state.points + question!.points : state.points
      return { ...state, answer: action.answer, points: newPoints }
    }
    case 'nextQuestion':
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: undefined,
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      }
    case 'restart':
      return {
        ...initialState,
        highscore: state.highscore,
        questions: state.questions,
        status: 'ready',
        seconds: state.questions.length * SECS_PER_QUESTION,
      }
    case 'tick':
      return {
        ...state,
        seconds: state.seconds! - 1,
        status: state.seconds === 0 ? 'finished' : state.status,
      }
    default:
      throw new ReactQuizError('Invalid action type')
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    questions,
    status,
    currentQuestion,
    answer,
    points,
    highscore,
    seconds,
  } = state

  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, current) => {
    return prev + current.points
  }, 0)

  useEffect(() => {
    if (status === 'loading')
      fetch('http://localhost:8000/questions')
        .then((response) => response.json())
        .then((data) => dispatch({ type: 'dataReceived', questions: data }))
        .catch(() => dispatch({ type: 'dataFailed' }))
  }, [status])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={currentQuestion}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[currentQuestion]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} seconds={seconds!} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                currentQuestion={currentQuestion}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App
