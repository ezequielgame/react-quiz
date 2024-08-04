interface Question {
  question: string
  options: string[]
  correctOption: number
  points: number
  id: string
}

type Answer = number | undefined

interface ReactQuizState {
  questions: Question[]
  status: 'loading' | 'error' | 'ready' | 'active' | 'finished'
  currentQuestion: number,
  answer: Answer
  points: number
  highscore: number
  seconds: number | null
}

interface Action {
  type: 'dataReceived' | 'dataFailed' | 'startQuiz' | 'newAnswer' | 'nextQuestion' | 'finish' | 'restart' | 'tick'
  questions?: Question[]
  answer?: number
  payload?: string
}
