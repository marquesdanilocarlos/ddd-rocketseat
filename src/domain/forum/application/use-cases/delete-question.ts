import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import { NotFoundError, UnauthorizedError } from '@/core/errors'

type DeleteQuestionInput = {
  authorId: string
  questionId: string
}

export default class DeleteQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ authorId, questionId }: DeleteQuestionInput): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new NotFoundError(
        `A pergunta com o id: ${questionId} não foi encontrada`,
      )
    }

    if (authorId !== question.authorId.value) {
      throw new UnauthorizedError(
        'Não é permitido deleter a pergunta de um usuário diferente',
      )
    }

    await this.questionsRepository.delete(question)
  }
}
