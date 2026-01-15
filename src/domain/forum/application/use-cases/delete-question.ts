import QuestionsRepository from '@/domain/forum/application/repositories/questions-repository'
import UniqueEntityId from '@/core/entities/unique-entity-id'

type DeleteQuestionInput = {
  questionId: UniqueEntityId
}

export default class DeleteQuestion {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({ questionId }: DeleteQuestionInput): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error(`A pergunta com o id: ${questionId} não foi encontrada`)
    }

    await this.questionsRepository.delete(questionId)
  }
}
