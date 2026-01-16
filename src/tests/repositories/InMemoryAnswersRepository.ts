import AnswersRepository from '@/domain/forum/application/repositories/answers-repository'
import Answer from '@/domain/forum/enterprise/entities/answer'
import UniqueEntityId from '@/core/entities/unique-entity-id'

export default class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []
  async findById(id: UniqueEntityId): Promise<Answer | null> {
    const answer = this.answers.find((question) => question.id === id) ?? null
    return Promise.resolve(answer)
  }

  async create(answer: Answer): Promise<Answer> {
    this.answers.push(answer)
    return Promise.resolve(answer)
  }

  async delete(id: UniqueEntityId): Promise<void> {
    const answerIndex = this.answers.findIndex((answer) => answer.id === id)

    if (answerIndex === -1) {
      return
    }

    this.answers.splice(answerIndex, 1)
    return Promise.resolve()
  }
}
