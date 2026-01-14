import Answer from '@/domain/entities/answer'
import AnswersRepository from '@/domain/repositories/answers-repository'

type QuestionAnswerInput = {
  instructorId: string
  questionId: string
  content: string
}

type QuestionAnswerOutput = {
  answer: Answer
}

export default class QuestionAnswer {
  constructor(private answersRepository: AnswersRepository) {}

  execute({
    instructorId,
    questionId,
    content,
  }: QuestionAnswerInput): QuestionAnswerOutput {
    const answer = new Answer({ content, authorId: instructorId, questionId })

    return {
      answer,
    }
  }
}
