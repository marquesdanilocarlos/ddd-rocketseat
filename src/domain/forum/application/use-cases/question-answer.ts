import Answer from '@/domain/forum/enterprise/entities/answer'
import AnswersRepository from '@/domain/forum/application/repositories/answers-repository'
import UniqueEntityId from '@/core/entities/unique-entity-id'

type QuestionAnswerInput = {
  instructorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
}

type QuestionAnswerOutput = {
  answer: Answer
}

export default class QuestionAnswer {
  constructor(private answersRepository: AnswersRepository) {}

  async execute(input: QuestionAnswerInput): Promise<QuestionAnswerOutput> {
    const { instructorId, questionId, content } = input

    const answer: Answer = Answer.create({
      authorId: instructorId,
      questionId,
      content,
    })

    await this.answersRepository.create(answer)

    return {
      answer,
    }
  }
}
