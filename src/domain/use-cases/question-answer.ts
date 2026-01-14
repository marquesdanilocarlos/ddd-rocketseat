import Answer from '@/domain/entities/answer'

type QuestionAnswerInput = {
  instructorId: string
  questionId: string
  content: string
}

type QuestionAnswerOutput = {
  answer: Answer
}

export default class QuestionAnswer {
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
