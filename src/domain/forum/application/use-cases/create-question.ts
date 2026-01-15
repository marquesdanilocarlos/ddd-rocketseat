import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import Question from '@/domain/forum/enterprise/entities/question'
import UniqueEntityId from '@/core/entities/unique-entity-id'

export type CreateQuestionInput = {
  authorId: string
  title: string
  content: string
}

type CreateQuestionOutput = {
  question: Question
}

export default class CreateQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute(input: CreateQuestionInput): Promise<CreateQuestionOutput> {
    const { authorId, title, content } = input
    const question: Question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    })
    await this.questionsRepository.create(question)

    return { question }
  }
}
