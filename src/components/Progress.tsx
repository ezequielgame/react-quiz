interface ProgressProps {
  index: number
  numQuestions: number
  points: number
  maxPoints: number
  answer: Answer
}

function Progress({
  index,
  numQuestions,
  points,
  maxPoints,
  answer,
}: ProgressProps) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== undefined)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        {points} / {maxPoints}
      </p>
    </header>
  )
}

export default Progress
