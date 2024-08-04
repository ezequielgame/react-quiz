export class ReactQuizError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ReactQuizError'
  }
}
