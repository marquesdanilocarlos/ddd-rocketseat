import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import UniqueEntityId from '@/core/entities/unique-entity-id'

type DeleteQuestionInput = {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
}

export default class DeleteQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ authorId, questionId }: DeleteQuestionInput): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error(`A pergunta com o id: ${questionId} não foi encontrada`)
    }

    if (authorId !== question.authorId) {
      throw new Error(
        'Não é permitido deleter a pergunta de um usuário diferente',
      )
    }

    await this.questionsRepository.delete(questionId)
  }
}
